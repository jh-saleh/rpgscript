import * as fs from 'fs';
import { Entities, Variable, almostFightSection, attack, counter, criticalHit, dodge, enter, fightSection, heal, healFor, isNumber, lose, special, variable } from './tokens';
import { EntitiesError, FightError, FormatEnum } from './Errors';

const getEntities = (instructions: string[], line: number): Record<string, Variable> => {
    if (instructions[0] !== "Entities") {
        throw Error(EntitiesError.EntitiesSectionMissing);
    }
    instructions.shift();
    let entities: Record<string, Variable> = {};
    let analyzing = true;
    while (analyzing) {
        line++;
        const instr: string | undefined = instructions.shift();
        if (instr === undefined) {
            return entities;
        }
        if (fightSection.test(instr)) {
            return entities;
        } else {
            if (almostFightSection.test(instr)) {
                throw Error(FormatEnum(FightError.FightSectionSyntax, line.toString(), instr));
            }
        }
        if (!variable.test(instr)) {
            throw Error(FormatEnum(EntitiesError.WrongVaribleSyntax, line.toString()));
        }
        const entitySection: string[] = instr.split(":");
        const entityData: string = entitySection[1].split(" ")[1];
        if (entities.hasOwnProperty(entitySection[0])) {
            throw Error(FormatEnum(EntitiesError.DuplicatedVariable, line.toString(), instr));
        }
        entities[entitySection[0]] = {
            type: entityData.slice(entityData.length - 2, entityData.length) === Entities.hp ? "number" : "string",
            value: Number(entityData.slice(0, entityData.length - 2)),
            enteredCombat: false
        };
    }
    return entities;
}

const fight = (entries: Record<string, Variable>, instructions: string[], consoleLogs: (string | number)[], line: number) => {
    while (instructions.length > 0) {
        line++;
        const instr: string | undefined = instructions.shift();
        if (instr === undefined) {
            break;
        }
        const variables = extractVariableFromInstruction(instr, entries, line);
        let didVariablesEnterCombat = false;
        if (enter.regExp.test(instr)) {
            for (let variable of variables) {
                entries[variable].enteredCombat = true;
            }
            didVariablesEnterCombat = true;
        }
        if (!didVariablesEnterCombat) {
            const areTheVariablesNotProtected = variables
                .filter((value) => !isNumber.test(value))
                .map((value) => entries[value].enteredCombat)
                .reduce((previousValue, currentValue) => currentValue && previousValue);
            if (areTheVariablesNotProtected) {
                if (attack.regExp.test(instr)) {
                    entries[variables[1]].value -= entries[variables[0]].value;
                } else if (lose.regExp.test(instr)) {
                    entries[variables[0]].value -= Number(variables[1]);
                } else if (heal.regExp.test(instr)) {
                    entries[variables[1]].value += entries[variables[0]].value;
                } else if (healFor.regExp.test(instr)) {

                } else if (criticalHit.regExp.test(instr)) {
                    entries[variables[1]].value /= entries[variables[0]].value;
                } else if (dodge.regExp.test(instr)) {
                    entries[variables[1]].value *= entries[variables[0]].value;
                } else if (counter.regExp.test(instr)) {
                    const entity = variables[0];
                    consoleLogs.push(entries[entity].type === "string" ? String.fromCharCode(entries[entity].value) : entries[entity].value);
                } else {
                    throw Error(FormatEnum(FightError.Syntax, line.toString(), instr));
                }
            } else {
                throw Error(FightError.ProtectedEntity);
            }
        }
    }
}

const findNbArgumentsForInstruction = (instr: string, line: number): number => {
    if (enter.regExp.test(instr)) {
        return enter.nbArguments;
    } else if (attack.regExp.test(instr)) {
        return attack.nbArguments;
    } else if (lose.regExp.test(instr)) {
        return lose.nbArguments;
    } else if (heal.regExp.test(instr)) {
        return heal.nbArguments;
    } else if (healFor.regExp.test(instr)) {
        return healFor.nbArguments;
    } else if (criticalHit.regExp.test(instr)) {
        return criticalHit.nbArguments;
    } else if (dodge.regExp.test(instr)) {
        return dodge.nbArguments;
    } else if (counter.regExp.test(instr)) {
        return counter.nbArguments;
    } else {
        throw Error(FormatEnum(FightError.Syntax, line.toString(), instr));
    }
}

const extractVariableFromInstruction = (instr: string, variable: Record<string, Variable>, line: number): string[] => {
    const reg = new RegExp("(" + Object.keys(variable).reduce((previousValue, currentValue) => previousValue + "|" + currentValue) + "|[1-9][0-9]*)", "g");
    const nbArguments = findNbArgumentsForInstruction(instr, line);
    const variablesExtracted = instr.match(reg)?.map((value) => value) ?? [];
    if (variablesExtracted.length < nbArguments || (nbArguments === -1 && variablesExtracted.length < 1)) {
        throw Error(FormatEnum(FightError.UnknownVariable, line.toString()));
    }
    return variablesExtracted;
}

interface InterpreterOutput {
    consoleLogs: (string | number)[];
    instructions: string[];
    entities: Record<string, Variable>;
}

export const interprete = (path?: string, data?: string[]): InterpreterOutput => {
    let line = -1;
    let file: string = "";
    let instructions: string[] = [];
    if (path !== undefined) {
        const pathSplit = path.split(".");
        if (pathSplit[pathSplit.length - 1] !== "rpg") {
            throw Error("Wrong extension file.");
        }
        file = fs.readFileSync(path).toString();
        instructions = file.split('\n').filter(instr => !special.includes(instr));
    } else if (data !== undefined) {
        instructions = data;
    } else {
        throw Error("A path or data is required.");
    }
    const consoleLogs: (string | number)[] = [];
    const entities = getEntities(instructions, line);
    fight(entities, instructions, consoleLogs, line);

    //console.log("entities", entities);
    //console.log("consoleLogs", consoleLogs);
    return { consoleLogs, entities, instructions };
}