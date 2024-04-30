import * as fs from 'fs';
import { Entities, Variable, almostFightSection, attack, counter, criticalHit, dodge, enter, fightSection, heal, healFor, isNumber, lose, special, variable } from './tokens';
import { EntitiesError, FightError, FormatEnum } from './Errors';

interface InterpreterOutput {
    logs: (string | number)[];
    instructions: string[];
    entries: Record<string, Variable>;
}

export class Interpreter {
    pc: number = 0;
    rc: number = 0;
    instructions: string[] = [];
    entries: Record<string, Variable> = {};
    logs: (string | number)[] = [];

    constructor() {
        this.pc = 0;
        this.rc = 0;
        this.instructions = [];
        this.entries = {};
        this.logs = [];
    }

    reset() {
        this.pc = 0;
        this.rc = 0;
        this.instructions = [];
        this.entries = {};
        this.logs = [];
    }

    extractVariables(): void {
        if (this.instructions[this.pc] !== "Entities") {
            throw Error(EntitiesError.EntitiesSectionMissing);
        }
        let entries: Record<string, Variable> = {};
        let analyzing = true;
        while (analyzing) {
            this.pc++;
            const instr: string = this.instructions[this.pc];
            if (fightSection.test(instr)) {
                this.entries = entries;
                analyzing = false;
                break;
            } else {
                if (almostFightSection.test(instr)) {
                    throw Error(FormatEnum(FightError.FightSectionSyntax, this.pc.toString(), instr));
                }
            }
            if (!variable.test(instr)) {
                throw Error(FormatEnum(EntitiesError.WrongVaribleSyntax, this.pc.toString()));
            }
            const entitySection: string[] = instr.split(":");
            const entityData: string = entitySection[1].split(" ")[1];
            if (entries.hasOwnProperty(entitySection[0])) {
                throw Error(FormatEnum(EntitiesError.DuplicatedVariable, this.pc.toString(), instr));
            }
            entries[entitySection[0]] = {
                type: entityData.slice(entityData.length - 2, entityData.length) === Entities.hp ? "number" : "string",
                value: Number(entityData.slice(0, entityData.length - 2)),
                enteredCombat: false
            };
        }
        this.entries = entries;
    }

    analyze() {
        let interpreting = true;
        while (interpreting) {
            this.pc++;
            const instr: string | undefined = this.instructions[this.pc];
            if (instr === undefined) {
                break;
            }
            const variables = this.extractVariableFromInstruction(instr);
            let didVariablesEnterCombat = false;
            if (enter.regExp.test(instr)) {
                for (let variable of variables) {
                    this.entries[variable].enteredCombat = true;
                }
                didVariablesEnterCombat = true;
            }
            if (!didVariablesEnterCombat) {
                const areTheVariablesNotProtected = variables
                    .filter((value) => !isNumber.test(value))
                    .map((value) => this.entries[value].enteredCombat)
                    .reduce((previousValue, currentValue) => currentValue && previousValue);
                if (areTheVariablesNotProtected) {
                    if (attack.regExp.test(instr)) {
                        this.entries[variables[1]].value -= this.entries[variables[0]].value;
                    } else if (lose.regExp.test(instr)) {
                        this.entries[variables[0]].value -= Number(variables[1]);
                    } else if (heal.regExp.test(instr)) {
                        this.entries[variables[1]].value += this.entries[variables[0]].value;
                    } else if (healFor.regExp.test(instr)) {
                        this.entries[variables[0]].value += Number(variables[1]);
                    } else if (criticalHit.regExp.test(instr)) {
                        this.entries[variables[1]].value /= this.entries[variables[0]].value;
                    } else if (dodge.regExp.test(instr)) {
                        this.entries[variables[1]].value *= this.entries[variables[0]].value;
                    } else if (counter.regExp.test(instr)) {
                        const entity = variables[0];
                        this.logs.push(this.entries[entity].type === "string" ? String.fromCharCode(this.entries[entity].value) : this.entries[entity].value);
                    } else {
                        throw Error(FormatEnum(FightError.Syntax, this.pc.toString(), instr));
                    }
                } else {
                    throw Error(FightError.ProtectedEntity);
                }
            }
        }
    }

    findNbArgumentsForInstruction(instr: string): number {
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
            throw Error(FormatEnum(FightError.Syntax, this.pc.toString(), instr));
        }
    }

    extractVariableFromInstruction(instr: string): string[] {
        const reg = new RegExp("(" + Object.keys(this.entries).reduce((previousValue, currentValue) => previousValue + "|" + currentValue) + "|[1-9][0-9]*)", "g");
        const nbArguments = this.findNbArgumentsForInstruction(instr);
        const variablesExtracted = instr.match(reg)?.map((value) => value) ?? [];
        if (variablesExtracted.length < nbArguments || (nbArguments === -1 && variablesExtracted.length < 1)) {
            throw Error(FormatEnum(FightError.UnknownVariable, this.pc.toString()));
        }
        return variablesExtracted;
    }

    execute(path?: string, data?: string[]): InterpreterOutput {
        this.reset();
        let file: string = "";
        if (path !== undefined) {
            const pathSplit = path.split(".");
            if (pathSplit[pathSplit.length - 1] !== "rpg") {
                throw Error("Wrong extension file.");
            }
            file = fs.readFileSync(path).toString();
            this.instructions = file.split('\n').filter(instr => !special.includes(instr));
        } else if (data !== undefined) {
            this.instructions = data;
        } else {
            throw Error("A path or data is required.");
        }
        this.extractVariables();
        this.analyze();

        //console.log("entities", entities);
        //console.log("consoleLogs", consoleLogs);
        return { logs: this.logs, entries: this.entries, instructions: this.instructions };
    }
}