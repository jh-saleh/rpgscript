# RPGScript
Created and designed by Jean-Hanna SALEH

### What is RPGScript
RPGScript is an [esoteric langage](https://en.wikipedia.org/wiki/Esoteric_programming_language) that allows you to write code the way a text adventure game would play out the likes of
[Caves of QUD](https://en.wikipedia.org/wiki/Caves_of_Qud), [Darf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) or [SanctuaryRPG](https://en.wikipedia.org/wiki/SanctuaryRPG).
Inspired by other esolang such as [Chef](https://www.dangermouse.net/esoteric/chef.html).

### Example
File extension : ".rpg"

```rpg
Fight of the fibonacci
Entities
dragon: 20hp
human: 0hp
ghost: 1hp
elf: 0hp

Events
The dragon, the human, the ghost and the elf enter combat!
The dragon prepares an attack
The human heals the elf.
The ghost heals the human.
The human protects the ghost.
The ghost protects the elf.
The elf activates a counter attack!
The dragon loses 1 points.
until the dragon is charged up.
End of the fight of the fibonacci.
```
### Instruction Set

| instruction                                                                                     | meaning                                            | domain    | done  |
|-------------------------------------------------------------------------------------------------|----------------------------------------------------|-----------|-------|
| #This is a comment                                                                              | comment                                            | comment   |   ✓   |
| Entities                                                                                        | integer variables section definition               | section   |   ✓   |
| a: (integer)hp                                                                                  | integer variable definition                        | variable  |   ✓   |
| a: (string)mp                                                                                   | char variable definition                           | variable  |   ✓   |
| The token1, ... and tokenN enter combat!                                                        | token1, ..., tokenN can be modified                | starter   |   ✓   |
| The a protect(s) the b.                                                                         | a = b                                              | art       |   ✓   |
| The a meditate(s).                                                                              | a = random(0, 1)                                   | art       |       |
| The a attack(s) the b.                                                                          | b = b - a                                          | art       |   ✓   |
| The a lose(s) c points.                                                                         | a = a - c                                          | art       |   ✓   |
| The a heal(s) the b.                                                                            | b = b + a                                          | art       |   ✓   |
| The a heal(s) for c points.                                                                     | a = a + c                                          | art       |   ✓   |
| The a critically hit(s) the b.                                                                  | b = b / a                                          | art       |   ✓   |
| The a dodge(s) the b.                                                                           | b = b * a                                          | art       |   ✓   |
| The a is slowed down by the b.                                                                  | a = a % b                                          | art       |   ✓   |
| The a is slowed down for c turn(s).                                                             | a = a % c                                          | art       |   ✓   |
| The a activate(s) a counter attack!                                                             | prints a                                           | console   |   ✓   |
| Environments                                                                                    | boolean variables section definition               | section   |   ✓   |
| e: (weak OR strong)                                                                             | boolean variable definition                        | variable  |   ✓   |
| The token1, ... and tokenN (are|is) making up the scene!                                        | token1, ..., tokenN can be modified                | starter   |   ✓   |
| The e is getting (weak or strong).                                                              | e = false OR true                                  | bool      |   ✓   |
| The e1 is absorbing the e2.                                                                     | e1 = e2                                            | bool      |   ✓   |
| The e is vibrating.                                                                             | e = !e                                             | bool      |   ✓   |
| The a is challenging the b (under OR inside OR within OR on) the e.                             | e = a === b                                        | bool      |   ✓   |
| The a is boosting the b's attack (under OR inside OR within OR on) the e.                       | e = a > b                                          | bool      |   ✓   |
| The a is boosting the b's defense (under OR inside OR within OR on) the e.                      | e = a >= b                                         | bool      |   ✓   |
| The a is debuffing the b's attack (under OR inside OR within OR on) the e.                      | e = a < b                                          | bool      |   ✓   |
| The a is debuffing the b's defense (under OR inside OR within OR on) the e.                     | e = a <= b                                         | bool      |   ✓   |
| The e1 is combining with the e2.                                                                | e1 = e1 and e2                                     | bool      |   ✓+T |
| The e1 is merging with the e2.                                                                  | e1 = e1 or e2                                      | bool      |   ✓+T |
| The a is wondering the effects of the e.                                                        | if (e) then pc+=1                                  | bool      |   ✓+T |
| The a is pondering the effects of the e.                                                        | if (e) then pc+=1 else pc+=2                       | bool      |   ✓+T |
| The a's hidden skill is triggered (under OR inside OR within OR on) the e.                      | a = (integer)e                                     | cast      |       |
| The e triggers the a's hidden skill.                                                            | e = (bool)a                                        | cast      |       |
| The a prepare(s) an attack                                                                      | rc = loop start                                    | loop      |   ✓   |
| until the a is charged up.                                                                      | if (a === 0) pc = rc else pc+=1                    | loop      |   ✓   |
| The e is starting to change                                                                     | rc = loop start                                    | loop      |   ✓   |
| until the e is done changing.                                                                   | if (e === false) pc = rc else pc+=1                | loop      |   ✓   |
| Fight X                                                                                         | create fightX function / entry point               | function  |   ✓   |
| End of the fight X.                                                                             | end label for fightX                               | function  |   ✓   |
| Flashback X                                                                                     | create flashbackX function                         | function  |   ✓   |
| End of the flashback X.                                                                         | end label for flashbackX                           | function  |   ✓   |
| The a remembers the flashbackX.                                                                 | a = flashbackX()                                   | function  |   ✓   |
| The flashback X happened (under OR inside OR within OR on) the e.                               | e = flashbackX()                                   | function  |   ✓   |
| The a (flee(s) OR is defeated OR dissapear(s))!                                                 | return a                                           | function  |   ✓   |
| The e (dissapear(s) OR stop(s) OR vanish(es))!                                                  | return e                                           | function  |   ✓   |
| Items                                                                                           | lists section definition                           | section   |       |
| i: ((number)(g OR dmg OR kg OR ql OR tr))+                                                      | lists variable definition                          | variable  |       |
| The a equip(s) the token1, ... and the tokenN.                                                  | token1, ..., tokenN can be modified                | lists     |       |
| The a inspect(s) the i.                                                                         | a = i.length                                       | lists     |       |
| The a use(s) the i.                                                                             | a = i[last element index]                          | lists     |       |
| The a use(s) the i on the b.                                                                    | a = i[b]                                           | lists     |       |
| The a use(s) the i for (number)turns(s) on the b.                                               | a = i[turns]                                       | lists     |       |
| The i is currently level (number).                                                              | i[last element index + 1] = level                  | lists     |       |
| The a upgrade(s) the i by (number)level(s).                                                     | i[a] = levels                                      | lists     |       |
| The a upgrade(s) the i by (number)level(s) in (number)min(s).                                   | i[mins] = levels                                   | lists     |       |
| The a combine(s) the i1 and the i2.                                                             | i1 = concat(i1, i2)                                | lists     |       |
| The i's (effectiveness OR attack OR durability) is decreased.                                   | delete i[last element index]                       | lists     |       |
| The i (break(s) OR shatter(s) OR vanishe(s)) after the a use(s) it.                             | delete i[a]                                        | lists     |       |
| The i's (effectiveness OR attack OR durability) is decreased by (number)points.                 | delete i[points]                                   | lists     |       |
| The i ((in OR de)creased) the a's (attack OR defense OR health OR stamina) for (number)turns.   | swap i[a] with i[turns]                            | lists     |       |
| The i ((in OR de)creased) the a and the b's (attack OR defense OR health OR stamina).           | swap i[a] with i[b]                                | lists     |       |
| The a (consume(s) OR drop(s) OR repair(s)) the i.                                               | clear i                                            | lists     |       |
| The a bless(s) the i!                                                                           | prints i as an array of strings                    | lists     |       |
| The a curse(s) the i!                                                                           | prints i as an array of integers                   | lists     |       |