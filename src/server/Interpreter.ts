import * as fs from 'fs';
import { Entities, almostFightSection, attack, counter, criticalHit, dodge, enter, fightSection, heal, healFor, instructionSet, isNumber, lose, special, entity, environment, Section, Variable, environmentChanging, getBoolean, makingUpTheScene, isBoolean } from './tokens';
import { VariablesError, FightError, FormatEnum } from './Errors';

interface InterpreterOutput {
    logs: (string | number)[];
    instructions: string[];
    entries: Record<string, Variable>;
}

interface CheckSection {
    entities: boolean;
    environment: boolean;
}

export class Interpreter {
    pc: number = 0;
    rc: number = 0;
    instructions: string[] = [];
    entries: Record<string, Variable> = {};
    logs: (string | number)[] = [];
    doesSectionExist: CheckSection;

    constructor() {
        this.pc = 0;
        this.rc = 0;
        this.instructions = [];
        this.entries = {};
        this.logs = [];
        this.doesSectionExist = {
            entities: false,
            environment: false
        }
    }

    reset() {
        this.pc = 0;
        this.rc = 0;
        this.instructions = [];
        this.entries = {};
        this.logs = [];
        this.doesSectionExist = {
            entities: false,
            environment: false
        }
    }

    extractVariables(): void {
        let entries: Record<string, Variable> = {};
        let analyzing = true;
        let currentVariablesSection: Section | undefined;
        while (analyzing) {
            if (this.pc >= this.instructions.length) {
                analyzing = false;
                break;
            }
            if (this.instructions[this.pc] !== Section.Entities && this.instructions[this.pc] !== Section.Environments) {
                if (!this.doesSectionExist.entities && !this.doesSectionExist.environment) {
                    throw Error(VariablesError.VariablesSectionMissing);
                }
            } else {
                if (this.instructions[this.pc] === Section.Entities) {
                    currentVariablesSection = Section.Entities;
                    this.doesSectionExist.entities = true;
                    this.pc++;
                }
                if (this.instructions[this.pc] === Section.Environments) {
                    currentVariablesSection = Section.Environments;
                    this.doesSectionExist.environment = true;
                    this.pc++;
                }
            }
            if (fightSection.test(this.instructions[this.pc])) {
                this.entries = entries;
                analyzing = false;
                break;
            } else {
                if (almostFightSection.test(this.instructions[this.pc])) {
                    throw Error(FormatEnum(FightError.FightSectionSyntax, this.pc.toString(), this.instructions[this.pc]));
                }
            }
            if (currentVariablesSection !== undefined && currentVariablesSection === Section.Entities) {
                if (!entity.test(this.instructions[this.pc])) {
                    throw Error(FormatEnum(VariablesError.WrongEntityVariableSyntax, this.pc.toString()));
                }
                const entitySection: string[] = this.instructions[this.pc].split(":");
                const entityData: string = entitySection[1].split(" ")[1];
                if (entries.hasOwnProperty(entitySection[0])) {
                    throw Error(FormatEnum(VariablesError.DuplicatedVariable, this.pc.toString(), this.instructions[this.pc]));
                }
                entries[entitySection[0]] = {
                    type: entityData.slice(entityData.length - 2, entityData.length) === Entities.hp ? "number" : "string",
                    value: Number(entityData.slice(0, entityData.length - 2)),
                    protected: true
                };
            }
            if (currentVariablesSection !== undefined && currentVariablesSection === Section.Environments) {
                if (!environment.test(this.instructions[this.pc])) {
                    throw Error(FormatEnum(VariablesError.WrongEnvironmentVariableSyntax, this.pc.toString()));
                }
                const environmentSection: string[] = this.instructions[this.pc].split(": ");
                if (entries.hasOwnProperty(environmentSection[0])) {
                    throw Error(FormatEnum(VariablesError.DuplicatedVariable, this.pc.toString(), this.instructions[this.pc]));
                }
                entries[environmentSection[0]] = {
                    type: "boolean",
                    value: getBoolean(environmentSection[1], this.pc),
                    protected: true
                };
            }
            this.pc++;
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
            let analyzeNextInstruction = true;
            if (enter.regExp.test(instr)) {
                for (let variable of variables) {
                    this.entries[variable].protected = false;
                }
                analyzeNextInstruction = false;
            }
            if (makingUpTheScene.regExp.test(instr)) {
                for (let variable of variables) {
                    this.entries[variable].protected = false;
                }
                analyzeNextInstruction = false;
            }
            if (analyzeNextInstruction) {
                variables
                    .filter((value) => !isNumber.test(value) && !isBoolean.test(value))
                    .forEach((value) => {
                        if (this.entries[value].protected) {
                            if (this.entries[value].type === "number" || this.entries[value].type === "string") {
                                throw Error(FightError.ProtectedEntity);
                            }
                            if (this.entries[value].type === "boolean") {
                                throw Error(FightError.ProtectedEnvironment);
                            }
                        }
                    });
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
                } else if (environmentChanging.regExp.test(instr)) {
                    this.entries[variables[0]].value = getBoolean(variables[1], this.pc);
                } else {
                    throw Error(FormatEnum(FightError.Syntax, this.pc.toString(), instr));
                }

            }
        }
    }

    findNbArgumentsForInstruction(instr: string): number {
        for (let instrRegExp of instructionSet) {
            if (instrRegExp.regExp.test(instr)) {
                return instrRegExp.nbArguments;
            }
        }
        throw Error(FormatEnum(FightError.Syntax, this.pc.toString(), instr));
    }

    extractVariableFromInstruction(instr: string): string[] {
        const reg = new RegExp("(" + Object.keys(this.entries).reduce((previousValue, currentValue) => previousValue + "|" + currentValue) + "|[1-9][0-9]*|strong|weak)", "g");
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