import { expect, test } from '@jest/globals';
import { EntitiesError, FightError, FormatEnum } from '../Errors';
import { interprete } from '../Interpreter';

test('interprete_should_not_allow_wrong_syntax_for_variables', () => {
    expect(() => {
        interprete("src/server/test/data/entitiesSectionMissing.rpg");
    }).toThrow(EntitiesError.EntitiesSectionMissing);
});

test('interprete_should_not_allow_wrong_syntax_for_variables', () => {
    expect(() => {
        interprete("src/server/test/data/wrongVariableSyntax.rpg");
    }).toThrow(FormatEnum(EntitiesError.WrongVaribleSyntax, "0"));
});

test('interprete_should_not_allow_duplicated_variables', () => {
    expect(() => {
        interprete("src/server/test/data/duplicatedVariables.rpg");
    }).toThrow(FormatEnum(EntitiesError.DuplicatedVariable, "1", "dragon: 100hp"));
});

test('interprete_should_not_be_able_to_use_a_variable_that_was_not_declared', () => {
    expect(() => {
        interprete("src/server/test/data/unknownVariable.rpg");
    }).toThrow(FormatEnum(FightError.UnknownVariable, "0", "ghost"));
});

test('interprete_should_allow_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_exists', () => {
    const { consoleLogs, entities, instructions } = interprete("src/server/test/data/enterCombat.rpg");
    expect(entities["dragon"].enteredCombat).toBe(true);
    expect(entities["ghost"].enteredCombat).toBe(true);
    expect(consoleLogs.length).toBe(0);
    expect(instructions.length).toBe(0);
});

test('interprete_should_not_allow_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_is_missing', () => {
    expect(() => {
        interprete("src/server/test/data/emptyFight.rpg");
    }).toThrow(FightError.ProtectedEntity);
});

test('interprete_should_require_a_fight_section_with_a_proper_name', () => {
    expect(() => {
        interprete("src/server/test/data/correctFightSection.rpg");
    }).not.toThrow(FormatEnum(FightError.FightSectionSyntax));
});

test('interprete_should_throw_an_error_when_the_fight_section_has_an_improper_name', () => {
    expect(() => {
        interprete("src/server/test/data/incorrectFightSection.rpg");
    }).toThrow(FormatEnum(FightError.FightSectionSyntax, "2", "Fight &+-\"*"));
});

test('interprete_should_not_allow_unknown_syntax', () => {
    expect(() => {
        interprete("src/server/test/data/unknownSyntax.rpg");
    }).toThrow(FormatEnum(FightError.Syntax, "1", "The dragon bleepbloop."));
});

test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"a attack[s] b."_exists', () => {
    const { entities } = interprete("src/server/test/data/attack.rpg");
    expect(entities["dragon"].value).toBe(100);
    expect(entities["ghost"].value).toBe(0);
});

test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"a lose[s] c points."_exists', () => {
    const { entities } = interprete("src/server/test/data/losePoints.rpg");
    expect(entities["dragon"].value).toBe(90);
});

test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"a heal[s] b."_exists', () => {
    const { entities } = interprete("src/server/test/data/heals.rpg");
    expect(entities["dragon"].value).toBe(100);
    expect(entities["wolf"].value).toBe(150);
});

test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"a heal[s] for c points."_exists', () => {
    const { entities } = interprete("src/server/test/data/healsFor.rpg");
    expect(entities["dragon"].value).toBe(150);
});

test('interprete_should_allow_a_variable_to_divide_its_value_when_the_instruction_"a critically hit[s] b."_exists', () => {
    const { entities } = interprete("src/server/test/data/criticalHits.rpg");
    expect(entities["wolf"].value).toBe(50);
    expect(entities["dragon"].value).toBe(2);
});

test('interprete_should_allow_a_variable_to_multiply_its_value_when_the_instruction_"a dodge[s] b."_exists', () => {
    const { entities } = interprete("src/server/test/data/dodge.rpg");
    expect(entities["wolf"].value).toBe(50);
    expect(entities["dragon"].value).toBe(5000);
});

test('interprete_should_print_the_variable_s_value_when_the_instruction_"a activate[s] a counter!"_exists', () => {
    const { consoleLogs, entities } = interprete("src/server/test/data/counter.rpg");
    expect(entities["dragon"].value).toBe(65);
    expect(entities["ghost"].value).toBe(103);
    expect(consoleLogs).toEqual([65, "g"]);
});