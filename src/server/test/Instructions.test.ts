import { expect, test } from '@jest/globals';
import { FightError, FormatEnum, VariablesError } from '../Errors';
import { Interpreter } from '../Interpreter';

test('interprete_should_not_allow_wrong_syntax_for_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/entitiesSectionMissing.rpg");
    }).toThrow(VariablesError.VariablesSectionMissing);
});

test('interprete_should_not_allow_wrong_syntax_for_entity_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/wrongEntityVariableSyntax.rpg");
    }).toThrow(FormatEnum(VariablesError.WrongEntityVariableSyntax, "1"));
});

test('interprete_should_not_allow_wrong_syntax_for_environment_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/wrongEnvironmentVariableSyntax.rpg");
    }).toThrow(FormatEnum(VariablesError.WrongEnvironmentVariableSyntax, "1"));
});

test('interprete_should_allow_both_environment_and_entity_variables', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/environmentAndEntityVariables.rpg");
    expect(entries["rain"].type).toBe("boolean");
    expect(entries["rain"].value).toBe(1);
    expect(entries["sun"].type).toBe("boolean");
    expect(entries["sun"].value).toBe(0);
    expect(entries["dragon"].type).toBe("number");
    expect(entries["dragon"].value).toBe(100);
    expect(entries["wolf"].type).toBe("string");
    expect(entries["wolf"].value).toBe(50);
});

test('interprete_should_not_allow_duplicated_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/duplicatedVariables.rpg");
    }).toThrow(FormatEnum(VariablesError.DuplicatedVariable, "2", "dragon: 100hp"));
});

test('interprete_should_not_be_able_to_use_an_entity_variable_that_was_not_declared', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/unknownVariable.rpg");
    }).toThrow(FormatEnum(FightError.UnknownVariable, "3", "ghost"));
});

test('interprete_should_allow_entity_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_exists', () => {
    const interpreter = new Interpreter();
    const { logs, entries, instructions } = interpreter.execute("src/server/test/data/enterCombat.rpg");
    expect(entries["dragon"].protected).toBe(false);
    expect(entries["ghost"].protected).toBe(false);
    expect(logs.length).toBe(0);
    expect(instructions.length).toBe(5);
});

test('interprete_should_not_allow_entity_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_is_missing', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/emptyFight.rpg");
    }).toThrow(FightError.ProtectedEntity);
});

test('interprete_should_allow_environment_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN (are|is) making up the scene!"_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/makingUpTheScene.rpg");
    expect(entries["sun"].protected).toBe(false);
    expect(entries["rain"].protected).toBe(false);
    expect(entries["sun"].value).toBe(1);
    expect(entries["rain"].value).toBe(0);
});

test('interprete_should_not_allow_environment_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN (are|is) making up the scene!"_is_missing', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/notMakingUpTheScene.rpg");
    }).toThrow(FightError.ProtectedEnvironment);
});

test('interprete_should_require_a_fight_section_with_a_proper_name', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/correctFightSection.rpg");
    }).not.toThrow(FormatEnum(FightError.FightSectionSyntax));
});

test('interprete_should_throw_an_error_when_the_fight_section_has_an_improper_name', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/incorrectFightSection.rpg");
    }).toThrow(FormatEnum(FightError.FightSectionSyntax, "3", "Fight &+-\"*"));
});

test('interprete_should_not_allow_unknown_syntax', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/unknownSyntax.rpg");
    }).toThrow(FormatEnum(FightError.Syntax, "5", "The dragon bleepbloop."));
});

test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"a attack[s] b."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/attack.rpg");
    expect(entries["dragon"].value).toBe(100);
    expect(entries["ghost"].value).toBe(0);
});

test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"a lose[s] c points."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/losePoints.rpg");
    expect(entries["dragon"].value).toBe(90);
});

test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"a heal[s] b."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/heals.rpg");
    expect(entries["dragon"].value).toBe(100);
    expect(entries["wolf"].value).toBe(150);
});

test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"a heal[s] for c points."_exists', () => {
    const interpreter = new Interpreter();

    const { entries } = interpreter.execute("src/server/test/data/healsFor.rpg");
    expect(entries["dragon"].value).toBe(150);
});

test('interprete_should_allow_a_variable_to_divide_its_value_when_the_instruction_"a critically hit[s] b."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/criticalHits.rpg");
    expect(entries["wolf"].value).toBe(50);
    expect(entries["dragon"].value).toBe(2);
});

test('interprete_should_allow_a_variable_to_multiply_its_value_when_the_instruction_"a dodge[s] b."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/dodge.rpg");
    expect(entries["wolf"].value).toBe(50);
    expect(entries["dragon"].value).toBe(5000);
});

test('interprete_should_print_the_variable_s_value_when_the_instruction_"a activate[s] a counter!"_exists', () => {
    const interpreter = new Interpreter();
    const { logs, entries } = interpreter.execute("src/server/test/data/counter.rpg");
    expect(entries["dragon"].value).toBe(65);
    expect(entries["ghost"].value).toBe(103);
    expect(logs).toEqual([65, "g"]);
});

test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The e is getting (weak or strong)."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/changingEnvironment.rpg");
    expect(entries["sun"].protected).toBe(false);
    expect(entries["rain"].protected).toBe(false);
    expect(entries["sun"].value).toBe(0);
    expect(entries["rain"].value).toBe(1);
});

test('interprete_should_allow_a_loop_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/entityLoop.rpg");
    expect(entries["wolf"].value).toBe(0);
    expect(entries["dragon"].value).toBe(5);
});

test('interprete_should_allow_multiple_loops_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/entityMultipleLoops.rpg");
    expect(entries["i"].value).toBe(0);
    expect(entries["j"].value).toBe(3);
    expect(entries["k"].value).toBe(3);
    expect(entries["dragon"].value).toBe(27);
});

test('interprete_should_throw_an_error_if_an_incorrect_variable_type_is_used_with_the_instruction_"a is wondering the effects of the e.', () => {
    const interpreter = new Interpreter();
});

test('interprete_should_compare_entity_values_when_the_instruction_"a is wondering the effects of the e.', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/if/wondering.rpg");
    expect(entries["dragon"].value).toBe(60);
    expect(entries["ghost"].value).toBe(32);
    expect(entries["sun"].value).toBe(1);
    expect(entries["rain"].value).toBe(0);
});

test('interprete_should_compare_entity_values_when_the_instruction_"a is pondering the effects of the e.', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/if/pondering.rpg");
    expect(entries["dragon"].value).toBe(50);
    expect(entries["ghost"].value).toBe(182);
    expect(entries["sun"].value).toBe(1);
    expect(entries["human"].value).toBe(10);
    expect(entries["elf"].value).toBe(10);
    expect(entries["rain"].value).toBe(0);
});