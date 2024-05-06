import { FormatEnum, VariablesError } from "./Errors";

export enum Entities {
    hp = 'hp',
    mp = 'mp'
}

export enum Section {
    Entities = "Entities",
    Environments = "Environments"
}

export interface Variable {
    type: "string" | "number" | "boolean";
    value: number;
    protected: boolean;
}

class RPGRegExp {
    regExp: RegExp;
    nbArguments: number;

    constructor(regExp: RegExp, nbArguments: number = 0) {
        this.regExp = regExp;
        this.nbArguments = nbArguments;
    }
}

export const fromStringToBooleanNumber = (bool: string, line: number): number => {
    switch (bool) {
        case "strong":
            return 1;
        case "weak":
            return 0;
        default:
            throw Error(FormatEnum(VariablesError.WrongEnvironmentVariableValue, line.toString()));
    }
}

export const fromBooleanToBooleanNumber = (bool: boolean): number => {
    return bool ? 1 : 0;
}

export const special = ["", " ", "\n", "\t"];
export const fightSection = /^Fight [a-z]+([a-z]+)*/i;
export const almostFightSection = /^Fight /i;
export const isNumber: RegExp = /^([1-9][0-9]*|0)$/i;
export const isBoolean: RegExp = /^(weak|strong)*$/i;
export const entity: RegExp = /^[a-z]+: ([1-9][0-9]*|0)(hp|mp)$/i;
export const environment: RegExp = /^\b(?!strong\b|weak\b)[a-z]+\b: (weak|strong)$/i;

// instruction set
export const enter: RPGRegExp = new RPGRegExp(/^The ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+) ente(r|rs) combat!$/i, -1);
export const attack: RPGRegExp = new RPGRegExp(/^The [a-z]+ attac(k|ks) the [a-z]+.$/i, 2);
export const lose: RPGRegExp = new RPGRegExp(/^The [a-z]+ los(e|es) [1-9][0-9]* poin(t|ts).$/i, 2);
export const heal: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) the [a-z]+.$/i, 2);
export const healFor: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) for [1-9][0-9]* poin(t|ts).$/i, 2);
export const criticalHit: RPGRegExp = new RPGRegExp(/^The [a-z]+ critically hi(t|ts) the [a-z]+.$/i, 2);
export const dodge: RPGRegExp = new RPGRegExp(/^The [a-z]+ dodg(e|es) the [a-z]+.$/i, 2);
export const counter: RPGRegExp = new RPGRegExp(/^The [a-z]+ activat(e|es) a counter attack!$/i, 1);
export const makingUpTheScene: RPGRegExp = new RPGRegExp(/^The ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+) (are|is) making up the scene!$/i, -1);
export const environmentChanging: RPGRegExp = new RPGRegExp(/^The [a-z]+ is getting (weak|strong).$/i, 2);
export const boostingAttack: RPGRegExp = new RPGRegExp(/^The [a-z]+ is boosting the [a-z]+'s attack (under|inside|within|on) the [a-z]+.$/i, 3);
export const boostingDefense: RPGRegExp = new RPGRegExp(/^The [a-z]+ is boosting the [a-z]+'s defense (under|inside|within|on) the [a-z]+.$/i, 3);
export const debuffingAttack: RPGRegExp = new RPGRegExp(/^The [a-z]+ is debuffing the [a-z]+'s attack (under|inside|within|on) the [a-z]+.$/i, 3);
export const debuffingDefense: RPGRegExp = new RPGRegExp(/^The [a-z]+ is debuffing the [a-z]+'s defense (under|inside|within|on) the [a-z]+.$/i, 3);
export const combining: RPGRegExp = new RPGRegExp(/^The [a-z]+ is combining with the [a-z]+.$/i, 2);
export const absorbing: RPGRegExp = new RPGRegExp(/^The [a-z]+ is absorbing the [a-z]+.$/i, 2);
export const wondering: RPGRegExp = new RPGRegExp(/^The [a-z]+ is wondering the effects of the [a-z]+.$/i, 2);
export const pondering: RPGRegExp = new RPGRegExp(/^The [a-z]+ is pondering the effects of the [a-z]+.$/i, 2);
export const loopLabel: RPGRegExp = new RPGRegExp(/^The [a-z]+ prepar(e|es) an attack$/i, 1);
export const loopCondition: RPGRegExp = new RPGRegExp(/^until the [a-z]+ is charged up.$/i, 1);

export const instructionSet = [
    enter, attack, lose, heal, healFor, criticalHit, dodge,
    counter,
    makingUpTheScene, environmentChanging,
    boostingAttack, boostingDefense,
    debuffingAttack, debuffingDefense,
    combining, absorbing,
    wondering, pondering,
    loopLabel, loopCondition,
];