import * as fs from 'fs';
import { FormatEnum, FunctionsError, InstructionsError, VariablesError } from './Errors';
import { Entities, Function, Position, Section, Variable, absorbing, almostFightSection, almostFlashbackSection, attack, boostingAttack, boostingDefense, challenging, combining, counter, criticalHit, debuffingAttack, debuffingDefense, dissapears, dodge, endOfFightSection, endOfFlashbackSection, enter, entity, environment, environmentChanging, eventSection, extractFightSection, extractFlashbackSection, fightSection, flashbackSection, flees, fromBooleanToBooleanNumber, fromStringToBooleanNumber, happened, heal, healFor, instructionSet, isBoolean, isNumber, loopEntityCondition, loopEntityLabel, loopEnvironmentCondition, loopEnvironmentLabel, lose, makingUpTheScene, pondering, remember, special, vibrating, wondering } from './tokens';

interface InterpreterOutput {
    logs: (string | number)[];
    instructions: string[];
    entries: Record<string, Record<string, Variable>>;
}

interface CheckSection {
    entities: boolean;
    environment: boolean;
}

interface Path {
    function: string;
    variable: string;
}

export class Interpreter {
    pc: number = 0;
    rc: number[] = [];
    instructions: string[] = [];
    entries: Record<string, Record<string, Variable>> = {};
    returns: Path[] = [];
    functions: Record<string, Function> = {};
    function: string = "";
    logs: (string | number)[] = [];
    doesSectionExist: CheckSection;

    constructor() {
        this.pc = 0;
        this.rc = [];
        this.instructions = [];
        this.entries = {};
        this.logs = [];
        this.doesSectionExist = {
            entities: false,
            environment: false
        }
    }

    reset(): void {
        this.pc = 0;
        this.rc = [];
        this.instructions = [];
        this.entries = {};
        this.logs = [];
        this.doesSectionExist = {
            entities: false,
            environment: false
        }
    }

    getFutureFunctionContext(): string {
        for (let func of Object.keys(this.functions)) {
            if (this.functions[func].position.start <= this.pc && this.pc <= this.functions[func].position.end) {
                return func;
            }
        }
        throw new Error(FunctionsError.UnknownFunctionContext);
    }

    extractFunctions(): void {
        let functions: Record<string, Function> = {};
        let analyzing = true;
        let pc = -1;
        let nbFightFunctions = 0;

        while (analyzing) {
            pc++;
            if (pc >= this.instructions.length) {
                analyzing = false;
                break;
            }
            let instr = this.instructions[pc].trim();
            if (almostFightSection.test(instr)) {
                if (fightSection.test(instr)) {
                    const name = "f" + instr.slice(1, instr.length);
                    functions[name] = {
                        type: "main",
                        position: {
                            start: pc,
                            end: -1
                        },
                    };
                    nbFightFunctions++;
                } else {
                    throw Error(FormatEnum(FunctionsError.FightSectionSyntax, this.pc.toString(), instr));
                }
            } else if (almostFlashbackSection.test(instr)) {
                if (flashbackSection.test(instr)) {
                    const name = "f" + instr.slice(1, instr.length);
                    functions[name] = {
                        type: "other",
                        position: {
                            start: pc,
                            end: -1
                        }
                    }
                } else {
                    throw Error(FormatEnum(FunctionsError.FlashbackSectionSyntax, this.pc.toString(), instr));
                }
            } else if (endOfFightSection.test(instr)) {
                const name = instr.match(extractFightSection)?.at(0) ?? "";
                if (functions[name] !== undefined) {
                    functions[name].position.end = pc;
                } else {
                    throw Error(FormatEnum(FunctionsError.InversedFunctionsTags, this.pc.toString(), name));
                }
            } else if (endOfFlashbackSection.regExp.test(instr)) {
                const name = instr.match(extractFlashbackSection)?.at(0) ?? "";
                if (functions[name] !== undefined) {
                    functions[name].position.end = pc;
                } else {
                    throw Error(FormatEnum(FunctionsError.InversedFunctionsTags, this.pc.toString(), name));
                }
            }
        }
        let functionsPositions: { label: string, position: Position }[] = [];
        for (let func of Object.keys(functions)) {
            const { position: { start, end } } = functions[func];
            if (end === -1) {
                throw Error(FormatEnum(FunctionsError.FunctionNotClosed, func, start.toString()));
            }
            if (nbFightFunctions === 0) {
                throw Error(FunctionsError.AtLeastOneFightFunction);
            }
            if (nbFightFunctions > 1) {
                throw Error(FunctionsError.OnlyOneFightFunction);
            }
            functionsPositions.push({
                label: func,
                position: {
                    start,
                    end
                }
            });
        }
        functionsPositions.sort((a, b) => a.position.start - b.position.start);
        for (let i = 0; i < functionsPositions.length - 1; i++) {
            if (functionsPositions[i].position.end > functionsPositions[i + 1].position.start) {
                throw Error(FormatEnum(FunctionsError.IncorrectlyClosedFunction, functionsPositions[i].label));
            }
        }
        this.functions = functions;
    }

    extractVariables(): void {
        let localVariables: Record<string, Variable> = {};
        let currentVariablesSection: Section | undefined;
        while (true) {
            if (this.pc >= this.instructions.length) {
                break;
            }
            if (!special.includes(this.instructions[this.pc])) {
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
                if (endOfFightSection.test(this.instructions[this.pc])) {
                    this.entries[this.function] = localVariables;
                    this.pc--;
                    break;
                }
                if (eventSection.test(this.instructions[this.pc])) {
                    this.entries[this.function] = localVariables;
                    break;
                }
                if (currentVariablesSection !== undefined && currentVariablesSection === Section.Entities) {
                    if (!entity.test(this.instructions[this.pc])) {
                        throw Error(FormatEnum(VariablesError.WrongEntityVariableSyntax, this.pc.toString()));
                    }
                    const entitySection: string[] = this.instructions[this.pc].split(":");
                    const entityData: string = entitySection[1].split(" ")[1];
                    if (localVariables.hasOwnProperty(entitySection[0])) {
                        throw Error(FormatEnum(VariablesError.DuplicatedVariable, this.pc.toString(), this.instructions[this.pc]));
                    }
                    localVariables[entitySection[0]] = {
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
                    if (localVariables.hasOwnProperty(environmentSection[0])) {
                        throw Error(FormatEnum(VariablesError.DuplicatedVariable, this.pc.toString(), this.instructions[this.pc]));
                    }
                    localVariables[environmentSection[0]] = {
                        type: "boolean",
                        value: fromStringToBooleanNumber(environmentSection[1], this.pc),
                        protected: true
                    };
                }
            }
            this.pc++;
        }
        this.entries[this.function] = localVariables;
    }

    analyze(): void {
        let specialIncrementIfElse: number = 0;
        let nextInstruction: boolean = true;
        while (true) {
            nextInstruction = true;
            if (specialIncrementIfElse === 2) {
                this.pc += 2;
                specialIncrementIfElse = 0;
            } else {
                this.pc++;
                if (specialIncrementIfElse === 1) {
                    specialIncrementIfElse++;
                }
            }
            const instr: string | undefined = this.instructions[this.pc];
            if (instr === undefined || endOfFightSection.test(instr)) {
                break;
            }
            if (!special.includes(instr)) {
                const variables = this.extractVariableFromInstruction(instr);
                if (enter.regExp.test(instr)) {
                    for (let variable of variables) {
                        this.entries[this.function][variable].protected = false;
                    }
                    nextInstruction = false;
                } else if (makingUpTheScene.regExp.test(instr)) {
                    for (let variable of variables) {
                        this.entries[this.function][variable].protected = false;
                    }
                    nextInstruction = false;
                }
                if (nextInstruction) {
                    variables
                        .filter((value) => !isNumber.test(value) && !isBoolean.test(value))
                        .forEach((value) => {
                            if (!this.functions.hasOwnProperty(value) && this.entries[this.function][value].protected) {
                                if (this.entries[this.function][value].type === "number" || this.entries[this.function][value].type === "string") {
                                    throw Error(InstructionsError.ProtectedEntity);
                                }
                                if (this.entries[this.function][value].type === "boolean") {
                                    throw Error(InstructionsError.ProtectedEnvironment);
                                }
                            }
                        });
                    if (attack.regExp.test(instr)) {
                        this.entries[this.function][variables[1]].value -= this.entries[this.function][variables[0]].value;
                    } else if (lose.regExp.test(instr)) {
                        this.entries[this.function][variables[0]].value -= Number(variables[1]);
                    } else if (heal.regExp.test(instr)) {
                        this.entries[this.function][variables[1]].value += this.entries[this.function][variables[0]].value;
                    } else if (healFor.regExp.test(instr)) {
                        this.entries[this.function][variables[0]].value += Number(variables[1]);
                    } else if (criticalHit.regExp.test(instr)) {
                        this.entries[this.function][variables[1]].value /= this.entries[this.function][variables[0]].value;
                    } else if (dodge.regExp.test(instr)) {
                        this.entries[this.function][variables[1]].value *= this.entries[this.function][variables[0]].value;
                    } else if (counter.regExp.test(instr)) {
                        const entity = variables[0];
                        this.logs.push(this.entries[this.function][entity].type === "string" ? String.fromCharCode(this.entries[this.function][entity].value) : this.entries[this.function][entity].value);
                    } else if (environmentChanging.regExp.test(instr)) {
                        this.entries[this.function][variables[0]].value = fromStringToBooleanNumber(variables[1], this.pc);
                    } else if (vibrating.regExp.test(instr)) {
                        this.entries[this.function][variables[0]].value = (this.entries[this.function][variables[0]].value + 1) % 2;
                    } else if (challenging.regExp.test(instr)) {
                        this.entries[this.function][variables[2]].value = fromBooleanToBooleanNumber(this.entries[this.function][variables[0]].value === this.entries[this.function][variables[1]].value);
                    } else if (boostingAttack.regExp.test(instr)) {
                        this.entries[this.function][variables[2]].value = fromBooleanToBooleanNumber(this.entries[this.function][variables[0]].value > this.entries[this.function][variables[1]].value);
                    } else if (boostingDefense.regExp.test(instr)) {
                        this.entries[this.function][variables[2]].value = fromBooleanToBooleanNumber(this.entries[this.function][variables[0]].value >= this.entries[this.function][variables[1]].value);
                    } else if (debuffingAttack.regExp.test(instr)) {
                        this.entries[this.function][variables[2]].value = fromBooleanToBooleanNumber(this.entries[this.function][variables[0]].value < this.entries[this.function][variables[1]].value);
                    } else if (debuffingDefense.regExp.test(instr)) {
                        this.entries[this.function][variables[2]].value = fromBooleanToBooleanNumber(this.entries[this.function][variables[0]].value <= this.entries[this.function][variables[1]].value);
                    } else if (combining.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].type !== "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[0], this.pc.toString(), instr));
                        }
                        if (this.entries[this.function][variables[1]].type !== "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[1], this.pc.toString(), instr));
                        }
                        this.entries[this.function][variables[0]].value = this.entries[this.function][variables[0]].value * this.entries[this.function][variables[1]].value;
                    } else if (absorbing.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].type !== "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[0], this.pc.toString(), instr));
                        }
                        if (this.entries[this.function][variables[1]].type !== "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[1], this.pc.toString(), instr));
                        }
                        this.entries[this.function][variables[0]].value = Math.min(1, this.entries[this.function][variables[0]].value + this.entries[this.function][variables[1]].value);
                    } else if (wondering.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].type === "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[0], this.pc.toString(), instr));
                        }
                        if (this.entries[this.function][variables[1]].type === "boolean") {
                            if (this.entries[this.function][variables[1]].value === 0) {
                                this.pc++;
                            }
                        } else {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[1], this.pc.toString(), instr));
                        }
                    } else if (pondering.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].type === "boolean") {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[0], this.pc.toString(), instr));
                        }
                        if (this.entries[this.function][variables[1]].type === "boolean") {
                            if (this.entries[this.function][variables[1]].value === 0) {
                                this.pc++;
                            } else {
                                specialIncrementIfElse = 1;
                            }
                        } else {
                            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variables[1], this.pc.toString(), instr));
                        }
                    } else if (loopEntityLabel.regExp.test(instr)) {
                        this.rc.push(this.pc);
                    } else if (loopEntityCondition.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].value > 0) {
                            this.pc = this.rc[this.rc.length - 1];
                        } else {
                            this.rc.pop();
                        }
                    } else if (loopEnvironmentLabel.regExp.test(instr)) {
                        this.rc.push(this.pc);
                    } else if (loopEnvironmentCondition.regExp.test(instr)) {
                        if (this.entries[this.function][variables[0]].value > 0) {
                            this.pc = this.rc[this.rc.length - 1];
                        } else {
                            this.rc.pop();
                        }
                    } else if (remember.regExp.test(instr)) {
                        this.rc.push(this.pc);
                        this.pc = this.functions[variables[1]].position.start;
                        this.returns.push({ function: this.function, variable: variables[0] });
                        this.function = variables[1];
                        this.entries[this.function] = {};
                        this.extractVariables();
                    } else if (happened.regExp.test(instr)) {
                        this.rc.push(this.pc);
                        this.pc = this.functions[variables[0]].position.start;
                        this.returns.push({ function: this.function, variable: variables[1] });
                        this.function = variables[0];
                        this.entries[this.function] = {};
                        this.extractVariables();
                    } else if (flees.regExp.test(instr)) {
                        const path = this.returns.pop();
                        if (path !== undefined) {
                            this.entries[path.function][path.variable] = this.entries[this.function][variables[0]];
                            this.pc = this.rc.pop() ?? 0;
                            this.function = this.getFutureFunctionContext();
                        }
                    } else if (dissapears.regExp.test(instr)) {
                        const path = this.returns.pop();
                        if (path !== undefined) {
                            this.entries[path.function][path.variable] = this.entries[this.function][variables[0]];
                            this.pc = this.rc.pop() ?? 0;
                            this.function = this.getFutureFunctionContext();
                        }
                    } else if (endOfFlashbackSection.regExp.test(instr)) {
                        this.pc = this.rc.pop() ?? 0;
                        this.function = this.getFutureFunctionContext();
                    } else {
                        throw Error(FormatEnum(InstructionsError.Syntax, this.pc.toString(), instr));
                    }
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
        throw Error(FormatEnum(InstructionsError.Syntax, this.pc.toString(), instr));
    }

    extractVariableFromInstruction(instr: string): string[] {
        const variablesToCheck: string = Object.keys(this.entries[this.function]).reduce((previousValue, currentValue) => previousValue + "|" + currentValue);
        const functionsRegPrefix = variablesToCheck.length > 0 ? "|" : "";
        const functionsToCheck: string = functionsRegPrefix + Object.keys(this.functions).reduce((previousValue, currentValue) => previousValue + "|" + currentValue);
        const reg = new RegExp("\\b(" + variablesToCheck + functionsToCheck + "|[1-9][0-9]*|strong|weak)\\b", "g");
        const nbArguments = this.findNbArgumentsForInstruction(instr);
        const variablesExtracted = instr.match(reg)?.map((value) => value) ?? [];
        if ((nbArguments !== -1 && variablesExtracted.length !== nbArguments) || (nbArguments === -1 && variablesExtracted.length < 1)) {
            throw Error(FormatEnum(InstructionsError.UnknownVariable, this.pc.toString()));
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
            this.instructions = file.split('\n');
        } else if (data !== undefined) {
            this.instructions = data;
        } else {
            throw Error("A path or data is required.");
        }
        this.extractFunctions();

        this.function = Object.keys(this.functions).find((func) => this.functions[func].type === "main") ?? "";
        this.pc = this.functions[this.function].position.start + 1;

        this.extractVariables();
        this.analyze();

        //console.log("entities", entities);
        //console.log("consoleLogs", consoleLogs);
        return { logs: this.logs, entries: this.entries, instructions: this.instructions };
    }
}