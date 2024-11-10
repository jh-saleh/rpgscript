import { FormatEnum, VariablesError } from "./Errors";

export enum Entities {
    hp = 'hp',
    mp = 'mp'
}

export enum Section {
    Entities = "Entities",
    Environments = "Environments",
    Items = "Items",
    Events = "Events",
}

// J'utilise ici la notion de discriminated unions pour éviter de faire la vérification du undefined en fonction du champ value / values
export interface BaseVariable {
    protected: boolean;
}

export interface SimpleVariable extends BaseVariable {
    type: "string" | "number" | "boolean";
    value: number;
}

export interface ArrayVariable extends BaseVariable {
    type: "array";
    values: number[];
}

export type Variable = SimpleVariable | ArrayVariable;

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

export const fromStringToArray = (array: string): number[] => {
    return (array.match(/-?\d+(\.\d+)?/g) || []).map((value) => Number(value));
}

export const fromBooleanToBooleanNumber = (bool: boolean): number => {
    return bool ? 1 : 0;
}

export const fromNumberToBooleanNumber = (nb: number): number => {
    return nb > 0 ? 1 : 0;
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
export const item: RegExp = /^\w+: ((-?\d+(\.\d+)?)[a-z]{1,3}\s?)+$/i;
export const comment: RegExp = /^#\w+( \w+)*$/;

// instruction set
export const enter: RPGRegExp = new RPGRegExp(/^The ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+) ente(r|rs) combat!$/, -1);
export const protect: RPGRegExp = new RPGRegExp(/^The [a-z]+ protec(t|ts) the [a-z]+.$/, 2);
export const meditate: RPGRegExp = new RPGRegExp(/^The [a-z]+ meditat(e|es).$/, 1);
export const attack: RPGRegExp = new RPGRegExp(/^The [a-z]+ attac(k|ks) the [a-z]+.$/, 2);
export const lose: RPGRegExp = new RPGRegExp(/^The [a-z]+ los(e|es) ([1-9][0-9]*|0) poin(t|ts).$/, 2);
export const heal: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) the [a-z]+.$/, 2);
export const healFor: RPGRegExp = new RPGRegExp(/^The [a-z]+ hea(l|ls) for ([1-9][0-9]*|0) poin(t|ts).$/, 2);
export const criticalHit: RPGRegExp = new RPGRegExp(/^The [a-z]+ critically hi(t|ts) the [a-z]+.$/, 2);
export const dodge: RPGRegExp = new RPGRegExp(/^The [a-z]+ dodg(e|es) the [a-z]+.$/, 2);
export const slowedDown: RPGRegExp = new RPGRegExp(/^The [a-z]+ is slowed down by the [a-z]+.$/, 2);
export const slowedDownFor: RPGRegExp = new RPGRegExp(/^The [a-z]+ is slowed down for ([1-9][0-9]*|0) tur(n|ns).$/, 2);
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
export const castEnvToEntity: RPGRegExp = new RPGRegExp(/^The [a-z]+'s hidden skill is triggered (under|inside|within|on) the [a-z]+.$/, 2);
export const castEntityToEnv: RPGRegExp = new RPGRegExp(/^The [a-z]+ trigge(r|rs) the [a-z]+'s hidden skill.$/, 2);
export const loopEntityLabel: RPGRegExp = new RPGRegExp(/^The [a-z]+ prepar(e|es) an attack$/, 1);
export const loopEntityCondition: RPGRegExp = new RPGRegExp(/^until the [a-z]+ is charged up.$/, 1);
export const loopEnvironmentLabel: RPGRegExp = new RPGRegExp(/^The [a-z]+ is starting to change$/, 1);
export const loopEnvironmentCondition: RPGRegExp = new RPGRegExp(/^until the [a-z]+ is done changing.$/, 1);
export const remember: RPGRegExp = new RPGRegExp(/^The [a-z]+ remembe(r|rs) the flashback [a-z]+( [a-z]+)*.$/, 2);
export const happened: RPGRegExp = new RPGRegExp(/^The flashback [a-z]+( [a-z]+)* happened (under|inside|within|on) the [a-z]+.$/, 2);
export const flees: RPGRegExp = new RPGRegExp(/^The [a-z]+ (fle(e|es)|is defeated|dissapea(r|rs))!$/, 1);
export const dissapears: RPGRegExp = new RPGRegExp(/^The [a-z]+ (dissapea(r|rs)|sto(p|ps)|vanish(e|es))!$/, 1);
export const endOfFlashbackSection: RPGRegExp = new RPGRegExp(/^End of the flashback [a-z]+( [a-z]+)*.$/, 1);
export const equip: RPGRegExp = new RPGRegExp(/^The [a-z]+ equi(p|ps) the ([a-z]+|[a-z]+ and the [a-z]+|[a-z]+, (the [a-z]+, ){0,}the [a-z]+ and the [a-z]+).$/, -1);
export const inspect: RPGRegExp = new RPGRegExp(/^The [a-z]+ inspec(t|ts) the [a-z]+.$/, 2);
export const useLast: RPGRegExp = new RPGRegExp(/^The [a-z]+ us(e|es) the [a-z]+.$/, 2);
export const useElement: RPGRegExp = new RPGRegExp(/^The [a-z]+ us(e|es) the [a-z]+ on the [a-z]+.$/, 3);
export const useStaticElement: RPGRegExp = new RPGRegExp(/^The [a-z]+ us(e|es) the [a-z]+ for \d+ tur(n|ns) on the [a-z]+.$/, 4);
export const currentLevel: RPGRegExp = new RPGRegExp(/^The [a-z]+ is currently level \d+.$/, 2);
export const upgradeLevel: RPGRegExp = new RPGRegExp(/^The [a-z]+ upgrad(e|es) the [a-z]+ by \d+ leve(l|ls).$/, 3);
export const upgradeStaticLevel: RPGRegExp = new RPGRegExp(/^The [a-z]+ upgrad(e|es) the [a-z]+ by \d+ leve(l|ls) in \d+ mi(n|ns).$/, 4);
export const enchant: RPGRegExp = new RPGRegExp(/^The [a-z]+ enchan(t|ts) the [a-z]+.$/, 2);
export const enchantAlongside: RPGRegExp = new RPGRegExp(/^The [a-z]+ enchan(t|ts) alongside the [a-z]+ the [a-z]+.$/, 3);
export const enchantMin: RPGRegExp = new RPGRegExp(/^The [a-z]+ enchan(t|ts) the [a-z]+ in \d+ mi(n|ns).$/, 3);
export const combine: RPGRegExp = new RPGRegExp(/^The [a-z]+ combin(e|es) the [a-z]+ and the [a-z]+.$/, 3);
export const increaseDurability: RPGRegExp = new RPGRegExp(/^The [a-z]+ increas(e|es) the [a-z]+'s durability.$/, 2);
export const increaseDurabilityByPoints: RPGRegExp = new RPGRegExp(/^The [a-z]+ increas(e|es) the [a-z]+'s durability by \d+ points.$/, 3);
export const increaseDurabilityAlongside: RPGRegExp = new RPGRegExp(/^The [a-z]+ increas(e|es) the [a-z]+'s durability alongside the [a-z]+.$/, 3);
export const decreaseDurability: RPGRegExp = new RPGRegExp(/^The [a-z]+'s durability is decreased.$/, 1);
export const breaks: RPGRegExp = new RPGRegExp(/^The [a-z]+'s (brea(k|ks)|shatte(r|rs)|vanish(e|es)) after the [a-z]+ us(e|es) it.$/, 2);
export const decreaseDurabilityByPoints: RPGRegExp = new RPGRegExp(/^The [a-z]+'s durability is decreased by \d+ poin(t|ts).$/, 2);
export const editStatsByTurn: RPGRegExp = new RPGRegExp(/^The [a-z]+ (in|de)creased the [a-z]+'s (attack|defense|health|stamina) for \d+ tur(n|ns).$/, 3);
export const editStats: RPGRegExp = new RPGRegExp(/^The [a-z]+ (in|de)creased the [a-z]+ and the [a-z]+'s (attack|defense|health|stamina).$/, 3);
export const consume: RPGRegExp = new RPGRegExp(/^The [a-z]+ (consum(e|es)|dro(p|ps)|repai(r|rs)) the [a-z]+.$/, 2);
export const bless: RPGRegExp = new RPGRegExp(/^The [a-z]+ bless(e|es) the [a-z]+!$/, 2);

export const instructionSet = [
    enter,
    protect, meditate,
    attack, lose,
    heal, healFor,
    criticalHit, dodge,
    slowedDown, slowedDownFor,
    counter,
    makingUpTheScene, environmentChanging,
    absorbing, vibrating, challenging,
    boostingAttack, boostingDefense,
    debuffingAttack, debuffingDefense,
    combining, merging,
    wondering, pondering,
    castEnvToEntity, castEntityToEnv,
    loopEntityLabel, loopEntityCondition,
    loopEnvironmentLabel, loopEnvironmentCondition,
    remember, happened,
    flees, dissapears,
    endOfFlashbackSection,
    equip,
    inspect,
    useLast, useElement, useStaticElement,
    currentLevel, upgradeLevel, upgradeStaticLevel,
    enchant, enchantAlongside, enchantMin,
    combine,
    increaseDurability, increaseDurabilityByPoints, increaseDurabilityAlongside,
    decreaseDurability, breaks, decreaseDurabilityByPoints,
    editStatsByTurn, editStats,
    consume,
    bless,
];