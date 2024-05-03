//https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
export const FormatEnum = (error: VariablesError | FightError, ...args: string[]): string => {
    return error.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] !== 'undefined'
            ? args[number]
            : match
            ;
    });
}

export enum VariablesError {
    VariablesSectionMissing = "Entities or Environment section missing.",
    WrongEntityVariableSyntax = "Wrong entity variable syntax at line {0}.",
    WrongEnvironmentVariableSyntax = "Wrong environment variable syntax at line {0}.",
    WrongEnvironmentVariableValue = "Unknown environment value at line {0}",
    DuplicatedVariable = "Duplicated token at line {0}:\n{1}",
}

export enum FightError {
    UnknownVariable = "Unknown variable used at line {0}.",
    FightSectionSyntax = "Wrong fight section syntax at line {0}:\n{1}",
    Syntax = "Wrong instruction syntax at line {0}:\n{1}",
    ProtectedEntity = "Cannot use the value of an entity that hasn't entered combat !",
    ProtectedEnvironment = "Cannot use the value of a environment that hasn't made up the scene !",
    IncorrectVariableType = "Incorrect variable type {0} used at line {1}:\n{2}",
}