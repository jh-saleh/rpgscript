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

| instruction                                                                   | meaning                                            | domain    | done  |
|-------------------------------------------------------------------------------|----------------------------------------------------|-----------|-------|
| The token1, ... and tokenN enter combat!                                      | token1, ..., tokenN can be modified                | starter   |   ✓   |
| The a protect(s) the b.                                                       | a = b                                              | art       |   ✓   |
| The a attack(s) the b.                                                        | b = b - a                                          | art       |   ✓   |
| The a lose(s) c points.                                                       | a = a - c                                          | art       |   ✓   |
| The a heal(s) the b.                                                          | b = b + a                                          | art       |   ✓   |
| The a heal(s) for c points.                                                   | a = a + c                                          | art       |   ✓   |
| The a critically hit(s) the b.                                                | b = b / a                                          | art       |   ✓   |
| The a dodge(s) the b.                                                         | b = b * a                                          | art       |   ✓   |
| The a is slowed down by the b.                                                | a = a % b                                          | art       |   ✓   |
| The a is slowed down for c turn(s).                                           | a = a % c                                          | art       |   ✓   |
| The a activate(s) a counter attack!                                           | prints a                                           | console   |   ✓   |
| The token1, ... and tokenN (are|is) making up the scene!                      | token1, ..., tokenN can be modified                | starter   |   ✓   |
| The e is getting (weak or strong).                                            | e = false OR true                                  | bool      |   ✓   |
| The e1 is absorbing the e2.                                                   | e1 = e2                                            | bool      |   ✓   |
| The e is vibrating.                                                           | e = !e                                             | bool      |   ✓   |
| The a is challenging the b (under OR inside OR within OR on) the e.           | e = a === b                                        | bool      |   ✓   |
| The a is boosting the b's attack (under OR inside OR within OR on) the e.     | e = a > b                                          | bool      |   ✓   |
| The a is boosting the b's defense (under OR inside OR within OR on) the e.    | e = a >= b                                         | bool      |   ✓   |
| The a is debuffing the b's attack (under OR inside OR within OR on) the e.    | e = a < b                                          | bool      |   ✓   |
| The a is debuffing the b's defense (under OR inside OR within OR on) the e.   | e = a <= b                                         | bool      |   ✓   |
| The e1 is combining with the e2.                                              | e1 = e1 and e2                                     | bool      |   ✓+T |
| The e1 is merging with the e2.                                                | e1 = e1 or e2                                      | bool      |   ✓+T |
| The a is wondering the effects of the e.                                      | if (e) then pc+=1                                  | bool      |   ✓+T |
| The a is pondering the effects of the e.                                      | if (e) then pc+=1 else pc+=2                       | bool      |   ✓+T |
| The a prepare(s) an attack                                                    | rc = loop start                                    | loop      |   ✓   |
| until the a is charged up.                                                    | if (a === 0) pc = rc else pc+=1                    | loop      |   ✓   |
| The e is starting to change                                                   | rc = loop start                                    | loop      |   ✓   |
| until the e is done changing.                                                 | if (e === false) pc = rc else pc+=1                | loop      |   ✓   |
| Fight X                                                                       | create fightX function / entry point               | function  |   ✓   |
| End of the fight X.                                                           | end label for fightX                               | function  |   ✓   |
| Flashback X                                                                   | create flashbackX function                         | function  |   ✓   |
| End of the flashback X.                                                       | end label for flashbackX                           | function  |   ✓   |
| The a remembers the flashbackX.                                               | a = flashbackX()                                   | function  |   ✓   |
| The flashback X happened (under OR inside OR within OR on) the e.             | e = flashbackX()                                   | function  |   ✓   |
| The a (flee(s) OR is defeated OR dissapear(s))!                               | return a                                           | function  |   ✓   |
| The e (dissapear(s) OR stop(s) OR vanish(es))!                                | return e                                           | function  |   ✓   |
| #This is a comment                                                            | comment                                            | comment   |   ✓   |
| a activate(s) a special skills.                                               | N/A                                                | example   |       |