export enum Entities {
    hp = 'hp',
    mp = 'mp'
}

export interface Variable {
    type: "string" | "number";
    value: number;
    enteredCombat: boolean;
}


class RPGRegExp {
    regExp: RegExp;
    nbArguments: number;

    constructor(regExp: RegExp, nbArguments: number = 0) {
        this.regExp = regExp;
        this.nbArguments = nbArguments;
    }
}

export const special = ["", " ", "\n", "\t"];
export const fightSection = /^Fight [a-z][a-z]*([a-z][a-z]*)*/i;
export const almostFightSection = /^Fight /i;
export const isNumber: RegExp = /^[1-9][0-9]*$/i;
export const variable: RegExp = /^[a-z][a-z]*: [1-9][0-9]*(hp|mp)$/i;

// instruction set
export const enter: RPGRegExp = new RPGRegExp(/^The ([a-z][a-z]*|[a-z][a-z]* and [a-z][a-z]*|([a-z]*, ){1,}[a-z][a-z]* and [a-z][a-z]*) ente(r|rs) combat!$/i, -1);
export const attack: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* attac(k|ks) the [a-z][a-z]*.$/i, 2);
export const lose: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* los(e|es) [1-9][0-9]* points.$/i, 2);
export const heal: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* hea(l|ls) the [a-z][a-z]*.$/i, 2);
export const healFor: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* hea(l|ls) for [1-9][0-9]* points.$/i, 2);
export const criticalHit: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* critically hi(t|ts) the [a-z][a-z]*.$/i, 2);
export const dodge: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* dodg(e|es) the [a-z][a-z]*.$/i, 2);
export const counter: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* activat(e|es) a counter attack!$/i, 1);
export const flee: RPGRegExp = new RPGRegExp(/^The [a-z][a-z]* (fle(e|es)|is defeated|dissapea(r|rs))!$/i, 1);

export const instructionSet = [enter, attack, lose, heal, healFor, criticalHit, dodge, counter, flee];