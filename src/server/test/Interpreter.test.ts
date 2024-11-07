import { expect, test } from '@jest/globals';
import { FormatEnum, FunctionsError, InstructionsError, VariablesError } from '../Errors';
import { Interpreter } from '../Interpreter';
import { SimpleVariable } from '../tokens';

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
    const rain: SimpleVariable = entries["fight of the environment and entity variables"]["rain"] as SimpleVariable;
    const sun: SimpleVariable = entries["fight of the environment and entity variables"]["sun"] as SimpleVariable;
    const dragon: SimpleVariable = entries["fight of the environment and entity variables"]["dragon"] as SimpleVariable;
    const wolf: SimpleVariable = entries["fight of the environment and entity variables"]["wolf"] as SimpleVariable;
    expect(rain.type).toBe("boolean");
    expect(rain.value).toBe(1);
    expect(sun.type).toBe("boolean");
    expect(sun.value).toBe(0);
    expect(dragon.type).toBe("number");
    expect(dragon.value).toBe(100);
    expect(wolf.type).toBe("string");
    expect(wolf.value).toBe(50);
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
        const dragon: SimpleVariable = entries["fight protect"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight protect"]["ghost"] as SimpleVariable;

        expect(dragon.value).toBe(100);
        expect(dragon.type).toBe("number");
        expect(ghost.value).toBe(100);
        expect(ghost.type).toBe("number");
    });

    test('interprete_should_allow_random_number_generation_when_the_instruction_"The a meditat(e|es)."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/meditate.rpg");
        const dragon: SimpleVariable = entries["fight meditate"]["dragon"] as SimpleVariable;
        expect(dragon.type).toBe("number");
        expect(dragon.value).toBeGreaterThanOrEqual(0);
        expect(dragon.value).toBeLessThanOrEqual(1);
    });

    test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"The a attac(k|ks) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/attack.rpg");
        const dragon: SimpleVariable = entries["fight attack"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight attack"]["ghost"] as SimpleVariable;
        expect(dragon.value).toBe(100);
        expect(ghost.value).toBe(0);
    });

    test('interprete_should_allow_a_variable_to_decrease_its_value_when_the_instruction_"The a los(e|es) c points."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/losePoints.rpg");
        const dragon: SimpleVariable = entries["fight lose points"]["dragon"] as SimpleVariable;
        expect(dragon.value).toBe(90);
    });

    test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"The a hea(l|ls) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/heals.rpg");
        const dragon: SimpleVariable = entries["fight of the healing"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight of the healing"]["wolf"] as SimpleVariable;
        expect(dragon.value).toBe(100);
        expect(wolf.value).toBe(150);
    });

    test('interprete_should_allow_a_variable_to_increase_its_value_when_the_instruction_"The a hea(l|ls) for c points."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/healsFor.rpg");
        const dragon: SimpleVariable = entries["fight of the self healing"]["dragon"] as SimpleVariable;
        expect(dragon.value).toBe(150);
    });

    test('interprete_should_allow_a_variable_to_divide_its_value_when_the_instruction_"The a critically hi(t|ts) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/criticalHits.rpg");
        const dragon: SimpleVariable = entries["fight of the critical hits"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight of the critical hits"]["wolf"] as SimpleVariable;
        expect(wolf.value).toBe(50);
        expect(dragon.value).toBe(2);
    });

    test('interprete_should_allow_a_variable_to_multiply_its_value_when_the_instruction_"The a dodg(e|es) the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/dodge.rpg");
        const dragon: SimpleVariable = entries["fight dodge"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight dodge"]["wolf"] as SimpleVariable;
        expect(wolf.value).toBe(50);
        expect(dragon.value).toBe(5000);
    });

    test('interprete_should_allow_a_variable_to_modulo_its_value_when_the_instruction_"The a is slowed down by the b."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/slowedDown.rpg");
        const dragon: SimpleVariable = entries["fight slowed down"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight slowed down"]["ghost"] as SimpleVariable;
        expect(ghost.value).toBe(71);
        expect(dragon.value).toBe(145);
    });

    test('interprete_should_allow_a_variable_to_modulo_its_value_when_the_instruction_"The a is slowed down for c turn(s)."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/arithmetic/slowedDownFor.rpg");
        const ghost: SimpleVariable = entries["fight slowed down for"]["ghost"] as SimpleVariable;
        expect(ghost.value).toBe(71);
    });
});

test('interprete_should_print_the_variable_s_value_when_the_instruction_"The a activat(e|es) a counter!"_exists', () => {
    const interpreter = new Interpreter();
    const { logs, entries } = interpreter.execute("src/server/test/data/counter.rpg");
    const dragon: SimpleVariable = entries["fight counter"]["dragon"] as SimpleVariable;
    const ghost: SimpleVariable = entries["fight counter"]["ghost"] as SimpleVariable;
    expect(dragon.value).toBe(65);
    expect(ghost.value).toBe(103);
    expect(logs).toEqual([65, "g"]);
});

describe('Boolean', () => {
    test('interprete_should_allow_environment_variables_to_change_their_value_when_the_instruction_"The token1, ... and tokenN (are|is) making up the scene!"_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/makingUpTheScene.rpg");
        const sun: SimpleVariable = entries["fight making up the scene"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight making up the scene"]["rain"] as SimpleVariable;
        expect(sun.protected).toBe(false);
        expect(rain.protected).toBe(false);
        expect(sun.value).toBe(1);
        expect(rain.value).toBe(0);
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
        const sun: SimpleVariable = entries["fight changing environment"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight changing environment"]["rain"] as SimpleVariable;
        expect(sun.protected).toBe(false);
        expect(rain.protected).toBe(false);
        expect(sun.value).toBe(0);
        expect(rain.value).toBe(1);
    });

    test('interprete_should_allow_an_environment_variable_to_store_the_value_of_another_variable_when_the_instruction_"The e1 is absorbing the e2."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/absorbing.rpg");
        const sun: SimpleVariable = entries["fight absorbing"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight absorbing"]["rain"] as SimpleVariable;
        expect(sun.value).toBe(1);
        expect(sun.type).toBe("boolean");
        expect(rain.value).toBe(1);
        expect(rain.type).toBe("boolean");
    });

    test('interprete_should_inverse_the_environment_value_when_the_instruction_"The e is vibrating."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/vibrating.rpg");
        const sun: SimpleVariable = entries["fight vibrating"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight vibrating"]["rain"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(rain.value).toBe(1);
    });

    test('interprete_should_compare_entity_values_when_the_instruction_"The a is challenging the b (under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/challenging.rpg");
        const sun: SimpleVariable = entries["fight challenging"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight challenging"]["rain"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight challenging"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight challenging"]["wolf"] as SimpleVariable;
        const human: SimpleVariable = entries["fight challenging"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight challenging"]["elf"] as SimpleVariable;
        expect(sun.value).toBe(1);
        expect(dragon.value).toBe(5);
        expect(wolf.value).toBe(5);
        expect(rain.value).toBe(0);
        expect(human.value).toBe(2);
        expect(elf.value).toBe(15);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is boosting the bs attack(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/boostingAttack.rpg");
        const sun: SimpleVariable = entries["fight of the boosting attack"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight of the boosting attack"]["rain"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight of the boosting attack"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight of the boosting attack"]["ghost"] as SimpleVariable;
        const human: SimpleVariable = entries["fight of the boosting attack"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight of the boosting attack"]["elf"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(ghost.value).toBe(10);
        expect(dragon.value).toBe(30);
        expect(rain.value).toBe(1);
        expect(human.value).toBe(50);
        expect(elf.value).toBe(10);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is boosting the bs defense(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/boostingDefense.rpg");
        const sun: SimpleVariable = entries["fight of the boosting defense"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight of the boosting defense"]["rain"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight of the boosting defense"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight of the boosting defense"]["ghost"] as SimpleVariable;
        const human: SimpleVariable = entries["fight of the boosting defense"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight of the boosting defense"]["elf"] as SimpleVariable;
        const mist: SimpleVariable = entries["fight of the boosting defense"]["mist"] as SimpleVariable;
        const argonian: SimpleVariable = entries["fight of the boosting defense"]["argonian"] as SimpleVariable;
        const hobbit: SimpleVariable = entries["fight of the boosting defense"]["hobbit"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(ghost.value).toBe(10);
        expect(dragon.value).toBe(30);
        expect(rain.value).toBe(1);
        expect(human.value).toBe(50);
        expect(elf.value).toBe(10);
        expect(mist.value).toBe(1);
        expect(argonian.value).toBe(50);
        expect(hobbit.value).toBe(50);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is debuffing the bs attack(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/debuffingAttack.rpg");
        const sun: SimpleVariable = entries["fight of the debuffing attack"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight of the debuffing attack"]["rain"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight of the debuffing attack"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight of the debuffing attack"]["ghost"] as SimpleVariable;
        const human: SimpleVariable = entries["fight of the debuffing attack"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight of the debuffing attack"]["elf"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(ghost.value).toBe(30);
        expect(dragon.value).toBe(10);
        expect(rain.value).toBe(1);
        expect(human.value).toBe(10);
        expect(elf.value).toBe(50);
    });

    test('interprete_should_allow_a_environment_variable_to_change_its_value_when_the_instruction_"The a is debuffing the bs defense(under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/debuffingDefense.rpg");
        const sun: SimpleVariable = entries["fight of the debuffing defense"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight of the debuffing defense"]["rain"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight of the debuffing defense"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight of the debuffing defense"]["ghost"] as SimpleVariable;
        const human: SimpleVariable = entries["fight of the debuffing defense"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight of the debuffing defense"]["elf"] as SimpleVariable;
        const mist: SimpleVariable = entries["fight of the debuffing defense"]["mist"] as SimpleVariable;
        const argonian: SimpleVariable = entries["fight of the debuffing defense"]["argonian"] as SimpleVariable;
        const hobbit: SimpleVariable = entries["fight of the debuffing defense"]["hobbit"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(ghost.value).toBe(30);
        expect(dragon.value).toBe(10);
        expect(rain.value).toBe(1);
        expect(human.value).toBe(10);
        expect(elf.value).toBe(50);
        expect(mist.value).toBe(1);
        expect(argonian.value).toBe(50);
        expect(hobbit.value).toBe(50);
    });

    test('interprete_should_evaluate_environment_values_when_the_instruction_"The e1 is combining with the e2.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/boolean/combining.rpg");
        const sun: SimpleVariable = entries["fight combining"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight combining"]["rain"] as SimpleVariable;
        const dust: SimpleVariable = entries["fight combining"]["dust"] as SimpleVariable;
        const wind: SimpleVariable = entries["fight combining"]["wind"] as SimpleVariable;
        const desert: SimpleVariable = entries["fight combining"]["desert"] as SimpleVariable;
        const ocean: SimpleVariable = entries["fight combining"]["ocean"] as SimpleVariable;
        const tundra: SimpleVariable = entries["fight combining"]["tundra"] as SimpleVariable;
        const jungle: SimpleVariable = entries["fight combining"]["jungle"] as SimpleVariable;
        expect(sun.value).toBe(0);
        expect(rain.value).toBe(0);
        expect(dust.value).toBe(0);
        expect(wind.value).toBe(1);
        expect(desert.value).toBe(0);
        expect(ocean.value).toBe(0);
        expect(tundra.value).toBe(1);
        expect(jungle.value).toBe(1);
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
        const sun: SimpleVariable = entries["fight merging"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight merging"]["rain"] as SimpleVariable;
        const dust: SimpleVariable = entries["fight merging"]["dust"] as SimpleVariable;
        const wind: SimpleVariable = entries["fight merging"]["wind"] as SimpleVariable;
        const desert: SimpleVariable = entries["fight merging"]["desert"] as SimpleVariable;
        const ocean: SimpleVariable = entries["fight merging"]["ocean"] as SimpleVariable;
        const tundra: SimpleVariable = entries["fight merging"]["tundra"] as SimpleVariable;
        const jungle: SimpleVariable = entries["fight merging"]["jungle"] as SimpleVariable;
        expect(sun.value).toBe(1);
        expect(rain.value).toBe(0);
        expect(dust.value).toBe(1);
        expect(wind.value).toBe(1);
        expect(desert.value).toBe(0);
        expect(ocean.value).toBe(0);
        expect(tundra.value).toBe(1);
        expect(jungle.value).toBe(1);
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
        const dragon: SimpleVariable = entries["fight wondering"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight wondering"]["ghost"] as SimpleVariable;
        const sun: SimpleVariable = entries["fight wondering"]["sun"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight wondering"]["rain"] as SimpleVariable;
        expect(dragon.value).toBe(60);
        expect(ghost.value).toBe(32);
        expect(sun.value).toBe(1);
        expect(rain.value).toBe(0);
    });

    test('interprete_should_compare_entity_values_when_the_instruction_"a is pondering the effects of the e.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/if/pondering.rpg");
        const dragon: SimpleVariable = entries["fight pondering"]["dragon"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight pondering"]["ghost"] as SimpleVariable;
        const sun: SimpleVariable = entries["fight pondering"]["sun"] as SimpleVariable;
        const human: SimpleVariable = entries["fight pondering"]["human"] as SimpleVariable;
        const elf: SimpleVariable = entries["fight pondering"]["elf"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight pondering"]["rain"] as SimpleVariable;
        expect(dragon.value).toBe(50);
        expect(ghost.value).toBe(182);
        expect(sun.value).toBe(1);
        expect(human.value).toBe(10);
        expect(elf.value).toBe(10);
        expect(rain.value).toBe(0);
    });
});

describe('Cast', () => {
    test('interprete_should_cast_the_value_of_an_environment_variable_into_an_entity_one_when_the_instruction_"The a s hidden skill is triggered(under OR inside OR within OR on) the e.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/cast/castEnvToEntity.rpg");
        const sun: SimpleVariable = entries["fight cast env to entity"]["sun"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight cast env to entity"]["dragon"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight cast env to entity"]["rain"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight cast env to entity"]["ghost"] as SimpleVariable;
        expect(sun.type).toBe("boolean");
        expect(sun.value).toBe(1);
        expect(dragon.type).toBe("number");
        expect(dragon.value).toBe(1);
        expect(rain.type).toBe("boolean");
        expect(rain.value).toBe(0);
        expect(ghost.type).toBe("number");
        expect(ghost.value).toBe(0);
    });

    test('interprete_should_cast_the_value_of_an_entity_variable_into_an_environment_one_when_the_instruction_"The e triggers the a s hidden skill.', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/cast/castEntityToEnv.rpg");
        const sun: SimpleVariable = entries["fight cast entity to env"]["sun"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight cast entity to env"]["dragon"] as SimpleVariable;
        const rain: SimpleVariable = entries["fight cast entity to env"]["rain"] as SimpleVariable;
        const ghost: SimpleVariable = entries["fight cast entity to env"]["ghost"] as SimpleVariable;
        expect(sun.type).toBe("boolean");
        expect(sun.value).toBe(0);
        expect(dragon.type).toBe("number");
        expect(dragon.value).toBe(0);
        expect(rain.type).toBe("boolean");
        expect(rain.value).toBe(1);
        expect(ghost.type).toBe("number");
        expect(ghost.value).toBe(100);
    });
});

describe('Loop', () => {
    test('interprete_should_allow_a_loop_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/entityLoop.rpg");
        const dragon: SimpleVariable = entries["fight entity loop"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight entity loop"]["wolf"] as SimpleVariable;
        expect(wolf.value).toBe(0);
        expect(dragon.value).toBe(5);
    });

    test('interprete_should_allow_multiple_loops_when_the_instruction_"The a prepare(s) an attack / until the a is charged up."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/entityMultipleLoops.rpg");
        const i: SimpleVariable = entries["fight entity multiple loop"]["i"] as SimpleVariable;
        const j: SimpleVariable = entries["fight entity multiple loop"]["j"] as SimpleVariable;
        const k: SimpleVariable = entries["fight entity multiple loop"]["k"] as SimpleVariable;
        const dragon: SimpleVariable = entries["fight entity multiple loop"]["dragon"] as SimpleVariable;
        expect(i.value).toBe(0);
        expect(j.value).toBe(3);
        expect(k.value).toBe(3);
        expect(dragon.value).toBe(27);
    });

    test('interprete_should_allow_a_loop_when_the_instruction_"The e is starting to change / until e is done changing."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/loop/environmentLoop.rpg");
        const dragon: SimpleVariable = entries["fight environment loop"]["dragon"] as SimpleVariable;
        const wolf: SimpleVariable = entries["fight environment loop"]["wolf"] as SimpleVariable;
        expect(wolf.value).toBe(5);
        expect(dragon.value).toBe(5);
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
        const dragon: SimpleVariable = entries["fight of the entity"]["dragon"] as SimpleVariable;
        const unicorn: SimpleVariable = entries["flashback of the past"]["unicorn"] as SimpleVariable;
        expect(dragon.value).toBe(155);
        expect(dragon.type).toBe("number");
        expect(unicorn.value).toBe(155);
        expect(unicorn.type).toBe("number");
    });

    test('interprete_should_call_a_subfuction_when_the_instruction_"The flashback X happened (under OR inside OR within OR on) the e."_exists', () => {
        const interpreter = new Interpreter();
        const { entries } = interpreter.execute("src/server/test/data/function/callFunctionFromEnvironment.rpg");
        const rain: SimpleVariable = entries["fight of the entity"]["rain"] as SimpleVariable;
        const mist: SimpleVariable = entries["flashback of the past"]["mist"] as SimpleVariable;
        expect(rain.value).toBe(1);
        expect(rain.type).toBe("boolean");
        expect(mist.value).toBe(1);
        expect(mist.type).toBe("boolean");
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
