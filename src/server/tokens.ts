import { FormatEnum, VariablesError } from "./Errors";

export enum Entities {
    hp = 'hp',
    mp = 'mp'
}

export enum Section {
    Entities = "Entities",
    Environments = "Environments",
    Events = "Events"
}

export interface Variable {
    type: "string" | "number" | "boolean";
    value: number;
    protected: boolean;
}

export interface Function {
    type: "main" | "other";
    position: Position;
}

export interface Position {
    start: number;
    end: number;
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
export const eventSection = /^Events$/;
export const fightSection = /^Fight \b[a-z]+\b(\b [a-z]+\b)*$/;
export const almostFightSection = /^Fight /;
export const extractFightSection = /fight [a-z]+( [a-z]+)*/g;
export const endOfFightSection = /^End of the fight [a-z]+( [a-z]+)*.$/g;
export const flashbackSection = /^Flashback \b[a-z]+\b(\b [a-z]+\b)*$/;
export const almostFlashbackSection = /^Flashback /g;
export const extractFlashbackSection = /flashback [a-z]+( [a-z]+)*/g;
export const isNumber: RegExp = /^([1-9][0-9]*|0)$/;
export const isBoolean: RegExp = /^(weak|strong)*$/;
export const entity: RegExp = /^[a-z]+: ([1-9][0-9]*|0)(hp|mp)$/i;
export const environment: RegExp = /^\b(?!strong\b|weak\b)[a-z]+\b: (weak|strong)$/i;

// instruction set
export const enter: RPGRegExp = new RPGRegExp(/^The ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+) ente(r|rs) combat!$/, -1);
export const protect: RPGRegExp = new RPGRegExp(/^The [a-z]+ protec(t|ts) the [a-z]+.$/, 2);
export const attack: RPGRegExp = new RPGRegExp(/^The [a-z]+ attac(k|ks) the [a-z]+.$/, 2);
export const lose: RPGRegExp = new RPGRegExp(/^The [a-z]+ los(e|es) [1-9][0-9]* poin(t|ts).$/, 2);
export const heal: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) the [a-z]+.$/, 2);
export const healFor: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) for [1-9][0-9]* poin(t|ts).$/, 2);
export const criticalHit: RPGRegExp = new RPGRegExp(/^The [a-z]+ critically hi(t|ts) the [a-z]+.$/, 2);
export const dodge: RPGRegExp = new RPGRegExp(/^The [a-z]+ dodg(e|es) the [a-z]+.$/, 2);
export const counter: RPGRegExp = new RPGRegExp(/^The [a-z]+ activat(e|es) a counter attack!$/, 1);
export const makingUpTheScene: RPGRegExp = new RPGRegExp(/^The ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+) (are|is) making up the scene!$/, -1);
export const environmentChanging: RPGRegExp = new RPGRegExp(/^The [a-z]+ is getting (weak|strong).$/, 2);
export const absorbing: RPGRegExp = new RPGRegExp(/^The [a-z]+ is absorbing the [a-z]+.$/, 2);
export const vibrating: RPGRegExp = new RPGRegExp(/^The [a-z]+ is vibrating.$/, 1);
export const challenging: RPGRegExp = new RPGRegExp(/^The [a-z]+ is challenging the [a-z]+ (under|inside|within|on) the [a-z]+.$/, 3);
export const boostingAttack: RPGRegExp = new RPGRegExp(/^The [a-z]+ is boosting the [a-z]+'s attack (under|inside|within|on) the [a-z]+.$/, 3);
export const boostingDefense: RPGRegExp = new RPGRegExp(/^The [a-z]+ is boosting the [a-z]+'s defense (under|inside|within|on) the [a-z]+.$/, 3);
export const debuffingAttack: RPGRegExp = new RPGRegExp(/^The [a-z]+ is debuffing the [a-z]+'s attack (under|inside|within|on) the [a-z]+.$/, 3);
export const debuffingDefense: RPGRegExp = new RPGRegExp(/^The [a-z]+ is debuffing the [a-z]+'s defense (under|inside|within|on) the [a-z]+.$/, 3);
export const combining: RPGRegExp = new RPGRegExp(/^The [a-z]+ is combining with the [a-z]+.$/, 2);
export const merging: RPGRegExp = new RPGRegExp(/^The [a-z]+ is merging with the [a-z]+.$/, 2);
export const wondering: RPGRegExp = new RPGRegExp(/^The [a-z]+ is wondering the effects of the [a-z]+.$/, 2);
export const pondering: RPGRegExp = new RPGRegExp(/^The [a-z]+ is pondering the effects of the [a-z]+.$/, 2);
export const loopEntityLabel: RPGRegExp = new RPGRegExp(/^The [a-z]+ prepar(e|es) an attack$/, 1);
export const loopEntityCondition: RPGRegExp = new RPGRegExp(/^until the [a-z]+ is charged up.$/, 1);
export const loopEnvironmentLabel: RPGRegExp = new RPGRegExp(/^The [a-z]+ is starting to change$/, 1);
export const loopEnvironmentCondition: RPGRegExp = new RPGRegExp(/^until the [a-z]+ is done changing.$/, 1);
export const remember: RPGRegExp = new RPGRegExp(/^The [a-z]+ remembe(r|rs) the flashback [a-z]+( [a-z]+)*.$/, 2);
export const happened: RPGRegExp = new RPGRegExp(/^The flashback [a-z]+( [a-z]+)* happened (under|inside|within|on) the [a-z]+.$/, 2);
export const flees: RPGRegExp = new RPGRegExp(/^The [a-z]+ (fle(e|es)|is defeated|dissapea(r|rs))!$/, 1);
export const dissapears: RPGRegExp = new RPGRegExp(/^The [a-z]+ (dissapea(r|rs)|sto(p|ps)|vanish(e|es))!$/, 1);
export const endOfFlashbackSection: RPGRegExp = new RPGRegExp(/^End of the flashback [a-z]+( [a-z]+)*.$/, 1);

export const instructionSet = [
    enter,
    protect,
    attack, lose,
    heal, healFor,
    criticalHit, dodge,
    counter,
    makingUpTheScene, environmentChanging,
    absorbing, vibrating, challenging,
    boostingAttack, boostingDefense,
    debuffingAttack, debuffingDefense,
    combining, merging,
    wondering, pondering,
    loopEntityLabel, loopEntityCondition,
    loopEnvironmentLabel, loopEnvironmentCondition,
    remember, happened,
    flees, dissapears,
    endOfFlashbackSection
];