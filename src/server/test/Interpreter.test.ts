import { expect, test } from '@jest/globals';
import { FormatEnum, FunctionsError, InstructionsError, VariablesError } from '../Errors';
import { Interpreter } from '../Interpreter';

test('interprete_should_not_allow_functions_with_missing_variables_section', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/arithmetic/variablesSectionMissing.rpg");
    }).toThrow(VariablesError.VariablesSectionMissing);
});

test('interprete_should_not_allow_wrong_syntax_for_entity_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/wrongEntityVariableSyntax.rpg");
    }).toThrow(FormatEnum(VariablesError.WrongEntityVariableSyntax, "2"));
});

test('interprete_should_not_allow_wrong_syntax_for_environment_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/boolean/wrongEnvironmentVariableSyntax.rpg");
    }).toThrow(FormatEnum(VariablesError.WrongEnvironmentVariableSyntax, "2"));
});

test('interprete_should_allow_both_environment_and_entity_variables', () => {
    const interpreter = new Interpreter();
    const { entries } = interpreter.execute("src/server/test/data/environmentAndEntityVariables.rpg");
    expect(entries["fight of the environment and entity variables"]["rain"].type).toBe("boolean");
    expect(entries["fight of the environment and entity variables"]["rain"].value).toBe(1);
    expect(entries["fight of the environment and entity variables"]["sun"].type).toBe("boolean");
    expect(entries["fight of the environment and entity variables"]["sun"].value).toBe(0);
    expect(entries["fight of the environment and entity variables"]["dragon"].type).toBe("number");
    expect(entries["fight of the environment and entity variables"]["dragon"].value).toBe(100);
    expect(entries["fight of the environment and entity variables"]["wolf"].type).toBe("string");
    expect(entries["fight of the environment and entity variables"]["wolf"].value).toBe(50);
});

test('interprete_should_not_allow_duplicated_variables', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/duplicatedVariables.rpg");
    }).toThrow(FormatEnum(VariablesError.DuplicatedVariable, "3", "dragon: 100hp"));
});

test('interprete_should_not_be_able_to_use_an_entity_variable_that_was_not_declared', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/unknownVariable.rpg");
    }).toThrow(FormatEnum(InstructionsError.UnknownVariable, "5", "ghost"));
});

test('interprete_should_allow_entity_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_exists', () => {
    const interpreter = new Interpreter();
    const { logs, entries, instructions } = interpreter.execute("src/server/test/data/arithmetic/enterCombat.rpg");
    expect(entries["fight of the entities entering combat"]["dragon"].protected).toBe(false);
    expect(entries["fight of the entities entering combat"]["ghost"].protected).toBe(false);
    expect(logs.length).toBe(0);
    expect(instructions.length).toBe(8);
});

test('interprete_should_not_allow_entity_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN enter combat!"_is_missing', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/emptyFight.rpg");
    }).toThrow(InstructionsError.ProtectedEntity);
});

test('interprete_should_not_allow_unknown_syntax', () => {
    const interpreter = new Interpreter();
    expect(() => {
        interpreter.execute("src/server/test/data/unknownSyntax.rpg");
    }).toThrow(FormatEnum(InstructionsError.Syntax, "7", "The dragon bleepbloop."));
});

describe('Arithmetic', () => {
    test('interprete_should_allow_an_entity_variable_to_store_the_value_of_another_variable_when_the_instruction_"The a protec(t|ts) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/protect.rpg");
        expect(entries["fight protect"]["dragon"].value).toBe(100);
        expect(entries["fight protect"]["dragon"].type).toBe("number");
        expect(entries["fight protect"]["ghost"].value).toBe(100);
        expect(entries["fight protect"]["ghost"].type).toBe("number");
    });

    test('interprete_should_allow_random_number_generation_when_the_instruction_"The a meditat(e|es)."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/meditate.rpg");
        expect(entries["fight meditate"]["dragon"].type).toBe("number");
        expect(entries["fight meditate"]["dragon"].value).toBeGreaterThanOrEqual(0);
        expect(entries["fight meditate"]["dragon"].value).toBeLessThanOrEqual(1);
    });

    test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"The a attac(k|ks) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/attack.rpg");
        expect(entries["fight attack"]["dragon"].value).toBe(100);
        expect(entries["fight attack"]["ghost"].value).toBe(0);
    });

    test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"The a los(e|es) c points."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/losePoints.rpg");
        expect(entries["fight lose points"]["dragon"].value).toBe(90);
    });

    test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"The a hea(l|ls) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/heals.rpg");
        expect(entries["fight of the healing"]["dragon"].value).toBe(100);
        expect(entries["fight of the healing"]["wolf"].value).toBe(150);
    });

    test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"The a hea(l|ls) for c points."_exists', () => {
        const interpreter = new Interpreter();

        const { entries } = interpreter.execute("src/server/test/data/arithmetic/healsFor.rpg");
        expect(entries["fight of the self healing"]["dragon"].value).toBe(150);
    });

    test('interprete_should_allow_a_variable_to_divide_its_value_when_the_instruction_"The a critically hi(t|ts) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/criticalHits.rpg");
        expect(entries["fight of the critical hits"]["wolf"].value).toBe(50);
        expect(entries["fight of the critical hits"]["dragon"].value).toBe(2);
    });

    test('interprete_should_allow_a_variable_to_multiply_its_value_when_the_instruction_"The a dodg(e|es) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/dodge.rpg");
        expect(entries["fight dodge"]["wolf"].value).toBe(50);
        expect(entries["fight dodge"]["dragon"].value).toBe(5000);
    });

    test('interprete_should_allow_a_variable_to_modulo_its_value_when_the_instruction_"The a is slowed down by the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/slowedDown.rpg");
        expect(entries["fight slowed down"]["ghost"].value).toBe(71);
        expect(entries["fight slowed down"]["dragon"].value).toBe(145);
    });

    test('interprete_should_allow_a_variable_to_modulo_its_value_when_the_instruction_"The a is slowed down for c turn(s)."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/slowedDownFor.rpg");
        expect(entries["fight slowed down for"]["ghost"].value).toBe(71);
        expect(entries["fight slowed down for"]["dragon"].value).toBe(145);
    });
});

test('interprete_should_print_the_variable_s_value_when_the_instruction_"The a activat(e|es) a counter!"_exists', () => {
    const interpreter = new Interpreter();
    const { logs, entries } = interpreter.execute("src/server/test/data/counter.rpg");
    expect(entries["fight counter"]["dragon"].value).toBe(65);
    expect(entries["fight counter"]["ghost"].value).toBe(103);
    expect(logs).toEqual([65, "g"]);
});

describe('Boolean', () => {
    test('interprete_should_allow_environment_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN (are|is) making up the scene!"_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/makingUpTheScene.rpg");
        expect(entries["fight making up the scene"]["sun"].protected).toBe(false);
        expect(entries["fight making up the scene"]["rain"].protected).toBe(false);
        expect(entries["fight making up the scene"]["sun"].value).toBe(1);
        expect(entries["fight making up the scene"]["rain"].value).toBe(0);
    });

    test('interprete_should_not_allow_environment_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN (are|is) making up the scene!"_is_missing', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/boolean/notMakingUpTheScene.rpg");
        }).toThrow(InstructionsError.ProtectedEnvironment);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The e is getting (weak or strong)."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/changingEnvironment.rpg");
        expect(entries["fight changing environment"]["sun"].protected).toBe(false);
        expect(entries["fight changing environment"]["rain"].protected).toBe(false);
        expect(entries["fight changing environment"]["sun"].value).toBe(0);
        expect(entries["fight changing environment"]["rain"].value).toBe(1);
    });

    test('interprete_should_allow_an_environment_variable_to_store_the_value_of_another_variable_when_the_instruction_"The e1 is absorbing the e2."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/absorbing.rpg");
        expect(entries["fight absorbing"]["sun"].value).toBe(1);
        expect(entries["fight absorbing"]["sun"].type).toBe("boolean");
        expect(entries["fight absorbing"]["rain"].value).toBe(1);
        expect(entries["fight absorbing"]["rain"].type).toBe("boolean");
    });

    test('interprete_should_inverse_the_environment_value_when_the_instruction_"The e is vibrating."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/vibrating.rpg");
        expect(entries["fight vibrating"]["sun"].value).toBe(0);
        expect(entries["fight vibrating"]["rain"].value).toBe(1);
    });

    test('interprete_should_compare_entity_values_when_the_instruction_"The a is challenging the b (under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/challenging.rpg");
        expect(entries["fight challenging"]["sun"].value).toBe(1);
        expect(entries["fight challenging"]["dragon"].value).toBe(5);
        expect(entries["fight challenging"]["wolf"].value).toBe(5);
        expect(entries["fight challenging"]["rain"].value).toBe(0);
        expect(entries["fight challenging"]["human"].value).toBe(2);
        expect(entries["fight challenging"]["elf"].value).toBe(15);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is boosting the bs attack(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/boostingAttack.rpg");
        expect(entries["fight of the boosting attack"]["sun"].value).toBe(0);
        expect(entries["fight of the boosting attack"]["ghost"].value).toBe(10);
        expect(entries["fight of the boosting attack"]["dragon"].value).toBe(30);
        expect(entries["fight of the boosting attack"]["rain"].value).toBe(1);
        expect(entries["fight of the boosting attack"]["human"].value).toBe(50);
        expect(entries["fight of the boosting attack"]["elf"].value).toBe(10);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is boosting the bs defense(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/boostingDefense.rpg");
        expect(entries["fight of the boosting defense"]["sun"].value).toBe(0);
        expect(entries["fight of the boosting defense"]["ghost"].value).toBe(10);
        expect(entries["fight of the boosting defense"]["dragon"].value).toBe(30);
        expect(entries["fight of the boosting defense"]["rain"].value).toBe(1);
        expect(entries["fight of the boosting defense"]["human"].value).toBe(50);
        expect(entries["fight of the boosting defense"]["elf"].value).toBe(10);
        expect(entries["fight of the boosting defense"]["mist"].value).toBe(1);
        expect(entries["fight of the boosting defense"]["argonian"].value).toBe(50);
        expect(entries["fight of the boosting defense"]["hobbit"].value).toBe(50);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is debuffing the bs attack(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/debuffingAttack.rpg");
        expect(entries["fight of the debuffing attack"]["sun"].value).toBe(0);
        expect(entries["fight of the debuffing attack"]["ghost"].value).toBe(30);
        expect(entries["fight of the debuffing attack"]["dragon"].value).toBe(10);
        expect(entries["fight of the debuffing attack"]["rain"].value).toBe(1);
        expect(entries["fight of the debuffing attack"]["human"].value).toBe(10);
        expect(entries["fight of the debuffing attack"]["elf"].value).toBe(50);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is debuffing the bs defense(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/debuffingDefense.rpg");
        expect(entries["fight of the debuffing defense"]["sun"].value).toBe(0);
        expect(entries["fight of the debuffing defense"]["ghost"].value).toBe(30);
        expect(entries["fight of the debuffing defense"]["dragon"].value).toBe(10);
        expect(entries["fight of the debuffing defense"]["rain"].value).toBe(1);
        expect(entries["fight of the debuffing defense"]["human"].value).toBe(10);
        expect(entries["fight of the debuffing defense"]["elf"].value).toBe(50);
        expect(entries["fight of the debuffing defense"]["mist"].value).toBe(1);
        expect(entries["fight of the debuffing defense"]["argonian"].value).toBe(50);
        expect(entries["fight of the debuffing defense"]["hobbit"].value).toBe(50);
    });

    test('interprete_should_evaluate_environment_values_when_the_instruction_"The e1 is combining with the e2.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/combining.rpg");
        expect(entries["fight of the century"]["sun"].value).toBe(0);
        expect(entries["fight of the century"]["rain"].value).toBe(0);
        expect(entries["fight of the century"]["dust"].value).toBe(0);
        expect(entries["fight of the century"]["wind"].value).toBe(1);
        expect(entries["fight of the century"]["desert"].value).toBe(0);
        expect(entries["fight of the century"]["ocean"].value).toBe(0);
        expect(entries["fight of the century"]["tundra"].value).toBe(1);
        expect(entries["fight of the century"]["jungle"].value).toBe(1);
    });

    test('interprete_should_throw_when_an_incorrect_type_of_variable_is_used_with_the_instruction_"The e1 is combining with the e2.', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/boolean/incorrectTypeCombining.rpg");
        }).toThrow(FormatEnum(InstructionsError.IncorrectVariableType, "dragon", "12", "The dragon is combining with the sun."));
    });

    test('interprete_should_evaluate_environment_values_when_the_instruction_"The e1 is merging with the e2.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/merging.rpg");
        expect(entries["fight merging"]["sun"].value).toBe(1);
        expect(entries["fight merging"]["rain"].value).toBe(0);
        expect(entries["fight merging"]["dust"].value).toBe(1);
        expect(entries["fight merging"]["wind"].value).toBe(1);
        expect(entries["fight merging"]["desert"].value).toBe(0);
        expect(entries["fight merging"]["ocean"].value).toBe(0);
        expect(entries["fight merging"]["tundra"].value).toBe(1);
        expect(entries["fight merging"]["jungle"].value).toBe(1);
    });

    test('interprete_should_throw_when_an_incorrect_type_of_variable_is_used_with_the_instruction_"The e1 is merging with the e2.', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/boolean/incorrectTypeMerging.rpg");
        }).toThrow(FormatEnum(InstructionsError.IncorrectVariableType, "dragon", "12", "The dragon is merging with the sun."));
    });
});

describe('Condition', () => {
    test('interprete_should_throw_an_error_if_an_incorrect_variable_type_is_used_with_the_instruction_"a is wondering the effects of the e.', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/if/incorrectTypeForWondering.rpg");
        }).toThrow(FormatEnum(InstructionsError.IncorrectVariableType, "sun", "10", "The sun is wondering the effects of the sun."));
    });

    test('interprete_should_throw_an_error_if_an_incorrect_variable_type_is_used_with_the_instruction_"a is wondering the effects of the e.', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/if/incorrectTypeForPondering.rpg");
        }).toThrow(FormatEnum(InstructionsError.IncorrectVariableType, "sun", "10", "The sun is pondering the effects of the sun."));
    });

    test('interprete_should_compare_entity_values_when_the_instruction_"a is wondering the effects of the e.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/if/wondering.rpg");
        expect(entries["fight wondering"]["dragon"].value).toBe(60);
        expect(entries["fight wondering"]["ghost"].value).toBe(32);
        expect(entries["fight wondering"]["sun"].value).toBe(1);
        expect(entries["fight wondering"]["rain"].value).toBe(0);
    });

    test('interprete_should_compare_entity_values_when_the_instruction_"a is pondering the effects of the e.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/if/pondering.rpg");
        expect(entries["fight pondering"]["dragon"].value).toBe(50);
        expect(entries["fight pondering"]["ghost"].value).toBe(182);
        expect(entries["fight pondering"]["sun"].value).toBe(1);
        expect(entries["fight pondering"]["human"].value).toBe(10);
        expect(entries["fight pondering"]["elf"].value).toBe(10);
        expect(entries["fight pondering"]["rain"].value).toBe(0);
    });
});

describe('Cast', () => {
    test('interprete_should_cast_the_value_of_an_environment_variable_into_an_entity_one_when_the_instruction_"The a s hidden skill is triggered(under OR inside OR within OR on) the e.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/cast/castEnvToEntity.rpg");
        expect(entries["fight cast env to entity"]["sun"].type).toBe("boolean");
        expect(entries["fight cast env to entity"]["sun"].value).toBe(1);
        expect(entries["fight cast env to entity"]["dragon"].type).toBe("number");
        expect(entries["fight cast env to entity"]["dragon"].value).toBe(1);
        expect(entries["fight cast env to entity"]["rain"].type).toBe("boolean");
        expect(entries["fight cast env to entity"]["rain"].value).toBe(0);
        expect(entries["fight cast env to entity"]["ghost"].type).toBe("number");
        expect(entries["fight cast env to entity"]["ghost"].value).toBe(0);
    });

    test('interprete_should_cast_the_value_of_an_entity_variable_into_an_environment_one_when_the_instruction_"The e triggers the a s hidden skill.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/cast/castEntityToEnv.rpg");
        expect(entries["fight cast entity to env"]["sun"].type).toBe("boolean");
        expect(entries["fight cast entity to env"]["sun"].value).toBe(0);
        expect(entries["fight cast entity to env"]["dragon"].type).toBe("number");
        expect(entries["fight cast entity to env"]["dragon"].value).toBe(0);
        expect(entries["fight cast entity to env"]["rain"].type).toBe("boolean");
        expect(entries["fight cast entity to env"]["rain"].value).toBe(1);
        expect(entries["fight cast entity to env"]["ghost"].type).toBe("number");
        expect(entries["fight cast entity to env"]["ghost"].value).toBe(100);
    });
});

describe('Loop', () => {
    test('interprete_should_allow_a_loop_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/entityLoop.rpg");
        expect(entries["fight entity loop"]["wolf"].value).toBe(0);
        expect(entries["fight entity loop"]["dragon"].value).toBe(5);
    });

    test('interprete_should_allow_multiple_loops_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/entityMultipleLoops.rpg");
        expect(entries["fight entity multiple loop"]["i"].value).toBe(0);
        expect(entries["fight entity multiple loop"]["j"].value).toBe(3);
        expect(entries["fight entity multiple loop"]["k"].value).toBe(3);
        expect(entries["fight entity multiple loop"]["dragon"].value).toBe(27);
    });

    test('interprete_should_allow_a_loop_when_the_instruction_"The e is starting to change / until e is done changing."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/environmentLoop.rpg");
        expect(entries["fight environment loop"]["wolf"].value).toBe(5);
        expect(entries["fight environment loop"]["dragon"].value).toBe(5);
    });
});

describe('Function', () => {
    test('interprete_should_throw_an_error_when_the_fight_function_name_syntax_is_incorrect', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/incorrectFightFunctionSyntax.rpg");
        }).toThrow(FormatEnum(FunctionsError.FightSectionSyntax, "0", "Fight incorrect syntAx"));
    });

    test('interprete_should_throw_an_error_when_the_flashback_function_name_syntax_is_incorrect', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/incorrectFlashbackFunctionSyntax.rpg");
        }).toThrow(FormatEnum(FunctionsError.FlashbackSectionSyntax, "0", "Flashback incorrect syntAx"));
    });

    test('interprete_should_throw_an_error_when_the_fight_function_is_not_closed', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/fightFunctionNotClosed.rpg");
        }).toThrow(FormatEnum(FunctionsError.FunctionNotClosed, "fight not closed", "0"));
    });

    test('interprete_should_throw_an_error_when_the_flashback_function_is_not_closed', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/flashbackFunctionNotClosed.rpg");
        }).toThrow(FormatEnum(FunctionsError.FunctionNotClosed, "flashback not closed", "9"));
    });

    test('interprete_should_throw_an_error_when_the_fight_function_tags_are_inversed', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/fightFunctionTagsInversed.rpg");
        }).toThrow(FormatEnum(FunctionsError.InversedFunctionsTags, "0", "fight of the entity"));
    });

    test('interprete_should_throw_an_error_when_the_flashback_function_tags_are_inversed', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/flashbackFunctionTagsInversed.rpg");
        }).toThrow(FormatEnum(FunctionsError.InversedFunctionsTags, "0", "flashback of the past"));
    });

    test('interprete_should_throw_an_error_when_there_is_no_fight_function', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/noFightFunction.rpg");
        }).toThrow(FunctionsError.AtLeastOneFightFunction);
    });

    test('interprete_should_throw_an_error_when_there_are_more_than_one_fight_function', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/moreThanOneFightFunction.rpg");
        }).toThrow(FunctionsError.OnlyOneFightFunction);
    });

    test('interprete_should_throw_an_error_when_there_a_function_is_incorrectly_closed', () => {
        const interpreter = new Interpreter();
        expect(() => {
            interpreter.execute("src/server/test/data/function/incorrectlyClosedFunction.rpg");
        }).toThrow(FormatEnum(FunctionsError.IncorrectlyClosedFunction, "fight of the entity"));
    });

    test('interprete_should_call_a_subfuction_when_the_instruction_"The a remembers the flashbackX."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/function/callFunctionFromEntity.rpg");
        expect(entries["fight of the entity"]["dragon"].value).toBe(155);
        expect(entries["fight of the entity"]["dragon"].type).toBe("number");
        expect(entries["flashback of the past"]["unicorn"].value).toBe(155);
        expect(entries["flashback of the past"]["unicorn"].type).toBe("number");
    });

    test('interprete_should_call_a_subfuction_when_the_instruction_"The flashback X happened (under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/function/callFunctionFromEnvironment.rpg");
        expect(entries["fight of the entity"]["rain"].value).toBe(1);
        expect(entries["fight of the entity"]["rain"].type).toBe("boolean");
        expect(entries["flashback of the past"]["mist"].value).toBe(1);
        expect(entries["flashback of the past"]["mist"].type).toBe("boolean");
    });
});

describe('Common algorithms', () => {
    test('interprete_should_be_able_to_print_the_fibonacci_sequence', () => {
        const interpreter = new Interpreter();
        const { logs } = interpreter.execute("src/server/test/examples/fibonacci.rpg");
        expect(logs).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181]);
    });

    test('interprete_should_be_able_to_print_the_fizz_buzz_sequence', () => {
        const interpreter = new Interpreter();
        const { logs } = interpreter.execute("src/server/test/examples/FizzBuzz.rpg");
        expect(logs).toEqual(
            [1, 2, 'f', 'i', 'z', 'z', 4, 'b', 'u', 'z', 'z', 'f', 'i', 'z', 'z', 7, 8,
                'f', 'i', 'z', 'z', 'b', 'u', 'z', 'z', 11, 'f', 'i', 'z', 'z', 13, 14,
                'f', 'i', 'z', 'z', 'b', 'u', 'z', 'z']);
    });

    test('interprete_should_be_able_to_print_the_gcd', () => {
        const interpreter = new Interpreter();
        const { logs } = interpreter.execute("src/server/test/examples/gcd.rpg");
        expect(logs).toEqual([3]);
    });
});
