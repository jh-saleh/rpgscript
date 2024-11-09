import * as fs from 'fs';
import { FormatEnum, FunctionsError, InstructionsError, VariablesError } from './Errors';
import { ArrayVariable, Entities, Function, Position, Section, SimpleVariable, Variable, absorbing, almostFightSection, almostFlashbackSection, attack, boostingAttack, boostingDefense, castEntityToEnv, castEnvToEntity, challenging, combine, combining, comment, counter, criticalHit, currentLevel, debuffingAttack, debuffingDefense, dissapears, dodge, enchant, enchantAlongside, enchantMin, endOfFightSection, endOfFlashbackSection, enter, entity, environment, environmentChanging, equip, eventSection, extractFightSection, extractFlashbackSection, fightSection, flashbackSection, flees, fromBooleanToBooleanNumber, fromNumberToBooleanNumber, fromStringToArray, fromStringToBooleanNumber, happened, heal, healFor, inspect, instructionSet, isBoolean, isNumber, item, loopEntityCondition, loopEntityLabel, loopEnvironmentCondition, loopEnvironmentLabel, lose, makingUpTheScene, meditate, merging, pondering, protect, remember, slowedDown, slowedDownFor, special, upgradeLevel, upgradeStaticLevel, useElement, useLast, useStaticElement, vibrating, wondering } from './tokens';

export interface InterpreterOutput {
    logs: (string | number)[];
    instructions: string[];
    entries: Record<string, Record<string, Variable>>;
}

interface CheckSection {
    entities: boolean;
    environment: boolean;
    items: boolean;
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
            environment: false,
            items: false,
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
            environment: false,
            items: false,
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
            if (!special.includes(this.instructions[this.pc]) && !comment.test(this.instructions[this.pc])) {
                if (this.instructions[this.pc] !== Section.Entities && this.instructions[this.pc] !== Section.Environments && this.instructions[this.pc] !== Section.Items) {
                    if (!this.doesSectionExist.entities && !this.doesSectionExist.environment && !this.doesSectionExist.items) {
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
                    if (this.instructions[this.pc] === Section.Items) {
                        currentVariablesSection = Section.Items;
                        this.doesSectionExist.items = true;
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
                if (currentVariablesSection !== undefined && currentVariablesSection === Section.Items) {
                    if (!item.test(this.instructions[this.pc])) {
                        throw Error(FormatEnum(VariablesError.WrongItemVariableSyntax, this.pc.toString()));
                    }
                    const itemSection: string[] = this.instructions[this.pc].split(": ");
                    if (localVariables.hasOwnProperty(itemSection[0])) {
                        throw Error(FormatEnum(VariablesError.DuplicatedVariable, this.pc.toString(), this.instructions[this.pc]));
                    }
                    localVariables[itemSection[0]] = {
                        type: "array",
                        values: fromStringToArray(itemSection[1]),
                        protected: true
                    };
                }
            }
            this.pc++;
        }
        this.entries[this.function] = localVariables;
    }

    getEntity(variable: string): SimpleVariable {
        const a = this.entries[this.function][variable];
        if (a.type !== "number" && a.type !== "string") {
            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variable, this.pc.toString(), this.instructions[this.pc]));
        }
        return a;
    }

    getEnvironment(variable: string): SimpleVariable {
        const b = this.entries[this.function][variable];
        if (b.type !== "boolean") {
            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variable, this.pc.toString(), this.instructions[this.pc]));
        }
        return b;
    }

    getItem(variable: string): ArrayVariable {
        const i = this.entries[this.function][variable];
        if (i.type !== "array") {
            throw Error(FormatEnum(InstructionsError.IncorrectVariableType, variable, this.pc.toString(), this.instructions[this.pc]));
        }
        return i;
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
            if (!special.includes(instr) && !comment.test(this.instructions[this.pc])) {
                const variables = this.extractTokensFromInstruction(instr);
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
                } else if (equip.regExp.test(instr)) {
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
                                if (this.entries[this.function][value].type === "array") {
                                    throw Error(InstructionsError.ProtectedItem);
                                }
                            }
                        });
                    if (protect.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        a.value = b.value;
                    } else if (meditate.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        a.value = Math.random();
                    } else if (attack.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        b.value -= a.value;
                    } else if (lose.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        a.value -= Number(variables[1]);
                    } else if (heal.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        b.value += a.value;
                    } else if (healFor.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        a.value += Number(variables[1]);
                    } else if (criticalHit.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        b.value /= a.value;
                    } else if (dodge.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        b.value *= a.value;
                    } else if (slowedDown.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        const b: Variable = this.getEntity(variables[1]);
                        a.value = a.value % b.value;
                    } else if (slowedDownFor.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        a.value = a.value % Number(variables[1]);
                    } else if (counter.regExp.test(instr)) {
                        const a: Variable = this.getEntity(variables[0]);
                        this.logs.push(a.type === "string" ? String.fromCharCode(a.value) : a.value);
                    } else if (environmentChanging.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        a.value = fromStringToBooleanNumber(variables[1], this.pc);
                    } else if (absorbing.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        a.value = b.value;
                    } else if (vibrating.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        a.value = (a.value + 1) % 2;
                    } else if (challenging.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const c = this.getEnvironment(variables[2]);
                        c.value = fromBooleanToBooleanNumber(a.value === b.value);
                    } else if (boostingAttack.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const c = this.getEnvironment(variables[2]);
                        c.value = fromBooleanToBooleanNumber(a.value > b.value);
                    } else if (boostingDefense.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const c = this.getEnvironment(variables[2]);
                        c.value = fromBooleanToBooleanNumber(a.value >= b.value);
                    } else if (debuffingAttack.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const c = this.getEnvironment(variables[2]);
                        c.value = fromBooleanToBooleanNumber(a.value < b.value);
                    } else if (debuffingDefense.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const c = this.getEnvironment(variables[2]);
                        c.value = fromBooleanToBooleanNumber(a.value <= b.value);
                    } else if (combining.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        a.value = a.value * b.value;
                    } else if (merging.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        a.value = Math.min(1, a.value + b.value);
                    } else if (wondering.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        if (b.value === 0) {
                            this.pc++;
                        }
                    } else if (pondering.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        if (b.value === 0) {
                            this.pc++;
                        } else {
                            specialIncrementIfElse = 1;
                        }
                    } else if (castEnvToEntity.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEnvironment(variables[1]);
                        a.value = b.value;
                    } else if (castEntityToEnv.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        const b = this.getEntity(variables[1]);
                        a.value = fromNumberToBooleanNumber(b.value);
                    } else if (loopEntityLabel.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        this.rc.push(this.pc);
                    } else if (loopEntityCondition.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        if (a.value > 0) {
                            this.pc = this.rc[this.rc.length - 1];
                        } else {
                            this.rc.pop();
                        }
                    } else if (loopEnvironmentLabel.regExp.test(instr)) {
                        this.getEnvironment(variables[0]);
                        this.rc.push(this.pc);
                    } else if (loopEnvironmentCondition.regExp.test(instr)) {
                        const a = this.getEnvironment(variables[0]);
                        if (a.value > 0) {
                            this.pc = this.rc[this.rc.length - 1];
                        } else {
                            this.rc.pop();
                        }
                    } else if (remember.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        this.rc.push(this.pc);
                        this.pc = this.functions[variables[1]].position.start;
                        this.returns.push({ function: this.function, variable: variables[0] });
                        this.function = variables[1];
                        this.entries[this.function] = {};
                        this.extractVariables();
                    } else if (happened.regExp.test(instr)) {
                        this.getEnvironment(variables[1]);
                        this.rc.push(this.pc);
                        this.pc = this.functions[variables[0]].position.start;
                        this.returns.push({ function: this.function, variable: variables[1] });
                        this.function = variables[0];
                        this.entries[this.function] = {};
                        this.extractVariables();
                    } else if (flees.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        const path = this.returns.pop();
                        if (path !== undefined) {
                            this.entries[path.function][path.variable] = this.entries[this.function][variables[0]];
                            this.pc = this.rc.pop() ?? 0;
                            this.function = this.getFutureFunctionContext();
                        }
                    } else if (dissapears.regExp.test(instr)) {
                        this.getEnvironment(variables[0]);
                        const path = this.returns.pop();
                        if (path !== undefined) {
                            this.entries[path.function][path.variable] = this.entries[this.function][variables[0]];
                            this.pc = this.rc.pop() ?? 0;
                            this.function = this.getFutureFunctionContext();
                        }
                    } else if (endOfFlashbackSection.regExp.test(instr)) {
                        this.pc = this.rc.pop() ?? 0;
                        this.function = this.getFutureFunctionContext();
                    } else if (inspect.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        a.value = i.values.length;
                    } else if (useLast.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        a.value = i.values[i.values.length - 1];
                    } else if (useElement.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        const b = this.getEntity(variables[2]);
                        a.value = i.values[b.value];
                    } else if (useStaticElement.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        const turns = Number(variables[2]);
                        a.value = i.values[turns];
                    } else if (currentLevel.regExp.test(instr)) {
                        const i = this.getItem(variables[0]);
                        const level = Number(variables[1]);
                        i.values[i.values.length - 1] = level;
                    } else if (upgradeLevel.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        const level = Number(variables[2]);
                        i.values[a.value] = level;
                    } else if (upgradeStaticLevel.regExp.test(instr)) {
                        const i = this.getItem(variables[1]);
                        const level = Number(variables[2]);
                        const min = Number(variables[3]);
                        i.values[min] = level;
                    } else if (enchant.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        i.values[i.values.length - 1] = a.value;
                    } else if (enchantAlongside.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const b = this.getEntity(variables[1]);
                        const i = this.getItem(variables[2]);
                        i.values[b.value] = a.value;
                    } else if (enchantMin.regExp.test(instr)) {
                        const a = this.getEntity(variables[0]);
                        const i = this.getItem(variables[1]);
                        const min = Number(variables[2]);
                        i.values[min] = a.value;
                    } else if (combine.regExp.test(instr)) {
                        this.getEntity(variables[0]);
                        const i1 = this.getItem(variables[1]);
                        const i2 = this.getItem(variables[2]);
                        i1.values = i1.values.concat(i2.values);
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

    extractTokensFromInstruction(instr: string): string[] {
        const theVariablesToCheck: string = "(The|the) " + Object.keys(this.entries[this.function]).reduce((previousValue, currentValue) => previousValue + "|(The|the) " + currentValue);
        const functionsRegPrefix = Object.keys(this.entries[this.function]).length > 0 ? "|" : "";
        const functionsToCheck: string = functionsRegPrefix + Object.keys(this.functions).reduce((previousValue, currentValue) => previousValue + "|" + currentValue);
        const completeReg = new RegExp("\\b(" + theVariablesToCheck + functionsToCheck + "|[1-9][0-9]*|strong|weak)\\b", "g");
        const theVariablesToCheckReg = new RegExp("\\b(" + theVariablesToCheck + ")\\b", "g");

        const tokensExtracted = instr.match(completeReg)?.map((value) => {
            if (value.match(theVariablesToCheckReg)) {
                return value.slice(4, value.length);
            } else {
                return value;
            }
        }) ?? [];

        const nbArguments = this.findNbArgumentsForInstruction(instr);
        if ((nbArguments !== -1 && tokensExtracted.length !== nbArguments) || (nbArguments === -1 && tokensExtracted.length < 1)) {
            throw Error(FormatEnum(InstructionsError.UnknownVariable, this.pc.toString()));
        }
        return tokensExtracted;
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

        return { logs: this.logs, entries: this.entries, instructions: this.instructions };
    }
}