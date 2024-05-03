# RPGScript
Created and designed by Jean-Hanna SALEH

### What is RPGScript
RPGScript is an [esoteric langage](https://en.wikipedia.org/wiki/Esoteric_programming_language) that allows you to write code the way a text adventure game would play out the likes of
[Caves of QUD](https://en.wikipedia.org/wiki/Caves_of_Qud), [Darf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) or [SanctuaryRPG](https://en.wikipedia.org/wiki/SanctuaryRPG).
Inspired by other esolang such as [Chef](https://www.dangermouse.net/esoteric/chef.html).

### Example
File extension : ".rpg"

```rpg
Entities
dragon: 100hp
wolf: 50hp
human: 100hp

Environment:
mist: strong
wind: weak
sun: weak
clouds: strong
rain: strong

Fight Of The Century
The dragon, wolf and human enter combat !
The dragon attacks the wolf !
The wolf dodge the dragon's attack.
The human heals the wolf for 60 points.
```
### Instruction Set

| instruction                                                                         | meaning                                            | domain    | done  |
|-------------------------------------------------------------------------------------|----------------------------------------------------|-----------|-------|
| The token1, ... and tokenN enter combat!                                            | token1, ..., tokenN can be modified                | starter   |   ✓   |
| The a attack[s] the b.                                                              | b = b - a                                          | art       |   ✓   |
| The a lose[s] c points.                                                             | a = a - c                                          | art       |   ✓   |
| The a heal[s] the b.                                                                | b = b + a                                          | art       |   ✓   |
| The a heal[s] for c points.                                                         | a = a + c                                          | art       |   ✓   |
| The a critically hit[s] the b.                                                      | b = b / a                                          | art       |   ✓   |
| The a dodge[s] the b.                                                               | b = b * a                                          | art       |   ✓   |
| The a activate[s] a counter attack!                                                 | prints a                                           | console   |   ✓   |
| The token1, ... and tokenN (are|is) making up the scene!                            | token1, ..., tokenN can be modified                | art       |   ✓   |
| The e is getting (weak or strong).                                                  | e = false OR true                                  | bool      |   ✓   |
| The e (surround(s) or withdraw(s) from) the scene when a is boosting b's attack.    | e = a > b                                          | bool      |       |
| The e (surround(s) or withdraw(s) from) the scene when a is boosting b's defense.   | e = a >= b                                         | bool      |       |
| The e (surround(s) or withdraw(s) from) the scene when a is debuffing b's attack.   | e = a < b                                          | bool      |       |
| The e (surround(s) or withdraw(s) from) the scene when a is debuffing b's defense.  | e = a <= b                                         | bool      |       |
| The e1 is combining with the e2                                                     | e1 = e1 and e2                                     | bool      |       |
| The e1 is absorbing the e2                                                          | e1 = e1 or e2                                      | bool      |       |
| The a is wondering the effects of the e.                                            | if (e) then pc+=1                                  | bool      |   ✓+T |
| The a is pondering the effects of the e.                                            | if (e) then pc+=1 else pc+=2                       | bool      |   ✓+T |
| The a prepare(s) an attack                                                          | rc = loop start                                    | loop      |   ✓   |
| until the a is charged up.                                                          | if (a === 0) pc = line(loopToken) else pc+=1       | loop      |   ✓   |
| The e is starting to change                                                         | rc = loop start                                    | loop      |       |
| until e is done changing.                                                           | if (e === false) pc = line(loopToken) else pc+=1   | loop      |       |
| a absorbs the experience of the fight                                               | a = fight()                                        | function  |       |
| e is infused with the experience of the fight                                       | e = fight()                                        | function  |       |
| a [flees OR is defeated OR dissapears]!                                             | N/A                                                | example   |       |
| It's[(super OR not OR very) effective].                                             | N/A                                                | example   |       |
| a protect[s] b.                                                                     | N/A                                                | example   |       |
| a activate[s] a special skills.                                                     | N/A                                                | example   |       |