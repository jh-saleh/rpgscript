//https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
export const FormatEnum = (error: VariablesError | InstructionsError | FunctionsError, ...args: string[]): string => {
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

export enum InstructionsError {
    UnknownVariable = "Unknown variable used at line {0}.",
    MissingEventsSection = "The events section is missing.",
    FightSectionSyntax = "Wrong fight section syntax at line {0}:\n{1}",
    Syntax = "Wrong instruction syntax at line {0}:\n{1}",
    ProtectedEntity = "Cannot use the value of an entity that hasn't entered combat !",
    ProtectedEnvironment = "Cannot use the value of a environment that hasn't made up the scene !",
    IncorrectVariableType = "Incorrect variable type {0} used at line {1}:\n{2}",
}

export enum FunctionsError {
    FunctionNotClosed = "The function {0} at line {1} is not closed.",
    AtLeastOneFightFunction = "One entry point / one fight function is needed.",
    OnlyOneFightFunction = "There can only be one entry point / one fight function.",
    InversedFunctionsTags = "The closing function tag is after the function definition.",
    IncorrectlyClosedFunction = "The function '{0}' is incorrectly closed.",
    UnknownFunctionContext = "Unknown function context.",
    MoreThanOneReturnPerFunction = "There are more than one return inside the function {0} at line {1}.",
}