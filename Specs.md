# Language specifications
## Instruction Set

| instruction                                                                                     | meaning                                            | domain     | done  |
|-------------------------------------------------------------------------------------------------|----------------------------------------------------|------------|-------|
| #This is a comment                                                                              | comment                                            | comment    |   ✓   |
| Entities                                                                                        | integer variables section definition               | section    |   ✓   |
| a: (integer)hp                                                                                  | integer variable definition                        | variable   |   ✓   |
| a: (integer)mp                                                                                  | char variable definition                           | variable   |   ✓   |
| The token1, ... and tokenN enter(s) combat!                                                     | token1, ..., tokenN can be modified                | starter    |   ✓   |
| The a protect(s) the b.                                                                         | a = b                                              | arithmetic |   ✓+T |
| The a meditate(s).                                                                              | a = random(0, 1)                                   | arithmetic |   ✓+T |
| The a attack(s) the b.                                                                          | b = b - a                                          | arithmetic |   ✓+T |
| The a lose(s) c points.                                                                         | a = a - c                                          | arithmetic |   ✓+T |
| The a heal(s) the b.                                                                            | b = b + a                                          | arithmetic |   ✓+T |
| The a heal(s) for c points.                                                                     | a = a + c                                          | arithmetic |   ✓+T |
| The a critically hit(s) the b.                                                                  | b = b / a                                          | arithmetic |   ✓+T |
| The a dodge(s) the b.                                                                           | b = b * a                                          | arithmetic |   ✓+T |
| The a is slowed down by the b.                                                                  | a = a % b                                          | arithmetic |   ✓+T |
| The a is slowed down for c turn(s).                                                             | a = a % c                                          | arithmetic |   ✓+T |
| The a activate(s) a counter attack!                                                             | prints a                                           | console    |   ✓   |
| Environments                                                                                    | boolean variables section definition               | section    |   ✓   |
| e: (weak OR strong)                                                                             | boolean variable definition                        | variable   |   ✓   |
| The token1, ... and tokenN (are OR is) making up the scene!                                     | token1, ..., tokenN can be modified                | starter    |   ✓   |
| The e is getting (weak or strong).                                                              | e = false OR true                                  | bool       |   ✓+T |
| The e1 is absorbing the e2.                                                                     | e1 = e2                                            | bool       |   ✓+T |
| The e is vibrating.                                                                             | e = !e                                             | bool       |   ✓+T |
| The a is challenging the b (under OR inside OR within OR on) the e.                             | e = a === b                                        | bool       |   ✓+T |
| The a is boosting the b's attack (under OR inside OR within OR on) the e.                       | e = a > b                                          | bool       |   ✓+T |
| The a is boosting the b's defense (under OR inside OR within OR on) the e.                      | e = a >= b                                         | bool       |   ✓+T |
| The a is debuffing the b's attack (under OR inside OR within OR on) the e.                      | e = a < b                                          | bool       |   ✓+T |
| The a is debuffing the b's defense (under OR inside OR within OR on) the e.                     | e = a <= b                                         | bool       |   ✓+T |
| The e1 is combining with the e2.                                                                | e1 = e1 and e2                                     | bool       |   ✓+T |
| The e1 is merging with the e2.                                                                  | e1 = e1 or e2                                      | bool       |   ✓+T |
| The a is wondering the effects of the e.                                                        | if (e) then pc+=1                                  | bool       |   ✓+T |
| The a is pondering the effects of the e.                                                        | if (e) then pc+=1 else pc+=2                       | bool       |   ✓+T |
| The a's hidden skill is triggered (under OR inside OR within OR on) the e.                      | a = (integer)e                                     | cast       |   ✓+T |
| The e triggers the a's hidden skill.                                                            | e = (bool)a                                        | cast       |   ✓+T |
| The a prepare(s) an attack                                                                      | rc = loop start                                    | loop       |   ✓+T |
| until the a is charged up.                                                                      | if (a === 0) pc = rc else pc+=1                    | loop       |   ✓+T |
| The e is starting to change                                                                     | rc = loop start                                    | loop       |   ✓+T |
| until the e is done changing.                                                                   | if (e === false) pc = rc else pc+=1                | loop       |   ✓+T |
| Fight X                                                                                         | create fightX function / entry point               | function   |   ✓   |
| End of the fight X.                                                                             | end label for fightX                               | function   |   ✓   |
| Flashback X                                                                                     | create flashbackX function                         | function   |   ✓   |
| End of the flashback X.                                                                         | end label for flashbackX                           | function   |   ✓   |
| The a remembers the flashbackX.                                                                 | a = flashbackX()                                   | function   |   ✓+T |
| The flashback X happened (under OR inside OR within OR on) the e.                               | e = flashbackX()                                   | function   |   ✓+T |
| The a (flee(s) OR is defeated OR dissapear(s))!                                                 | return a                                           | function   |   ✓+T |
| The e (dissapear(s) OR stop(s) OR vanish(es))!                                                  | return e                                           | function   |   ✓+T |
| Items                                                                                           | lists section definition                           | section    |   ✓   |
| i: ((number)(g OR dmg OR kg OR ql OR tr))+                                                      | lists variable definition                          | variable   |   ✓   |
| The a equip(s) the token1, ... and the tokenN.                                                  | token1, ..., tokenN can be modified                | starter    |   ✓   |
| The a inspect(s) the i.                                                                         | a = i.length                                       | lists      |   ✓+T |
| The a use(s) the i.                                                                             | a = i[last element index]                          | lists      |   ✓+T |
| The a use(s) the i on the b.                                                                    | a = i[b]                                           | lists      |   ✓+T |
| The a use(s) the i for (number)turns(s) on the b.                                               | a = i[turns]                                       | lists      |   ✓+T |
| The i is currently level (number).                                                              | i[last element index] = level                      | lists      |   ✓+T |
| The a upgrade(s) the i by (number)level(s).                                                     | i[a] = levels                                      | lists      |   ✓+T |
| The a upgrade(s) the i by (number)level(s) in (number)min(s).                                   | i[mins] = levels                                   | lists      |   ✓+T |
| The a enchant(s) the i.                                                                         | i[last element index] = a                          | lists      |   ✓+T |
| The a enchant(s) alongside the b the i.                                                         | i[b] = a                                           | lists      |   ✓+T |
| The a enchant(s) the i in (number)min(s).                                                       | i[mins] = a                                        | lists      |   ✓+T |
| The a combine(s) the i1 and the i2.                                                             | i1 = concat(i1, i2)                                | lists      |       |
| The i's (effectiveness OR attack OR durability) is increased.                                   | push i[lengh + 1]                                  | lists      |       |
| The i is strengthed after the a use(s) it.                                                      | push i[a]                                          | lists      |       |
| The i's (effectiveness OR attack OR durability) is increased by (number)points.                 | push i[points]                                     | lists      |       |
| The i's (effectiveness OR attack OR durability) is decreased.                                   | delete i[last element index]                       | lists      |       |
| The i (break(s) OR shatter(s) OR vanishe(s)) after the a use(s) it.                             | delete i[a]                                        | lists      |       |
| The i's (effectiveness OR attack OR durability) is decreased by (number)points.                 | delete i[points]                                   | lists      |       |
| The i ((in OR de)creased) the a's (attack OR defense OR health OR stamina) for (number)turns.   | swap i[a] with i[turns]                            | lists      |       |
| The i ((in OR de)creased) the a and the b's (attack OR defense OR health OR stamina).           | swap i[a] with i[b]                                | lists      |       |
| The a (consume(s) OR drop(s) OR repair(s)) the i.                                               | clear i                                            | lists      |       |
| The a bless(s) the i!                                                                           | prints i as an array of strings                    | lists      |       |
| The a curse(s) the i!                                                                           | prints i as an array of integers                   | lists      |       |