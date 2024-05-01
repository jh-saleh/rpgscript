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

| instruction                                                            | meaning                                                   | type      |
|------------------------------------------------------------------------|-----------------------------------------------------------|-----------|
| The token1, ... and tokenN enter combat!                               | token1, ..., tokenN can be modified                       | starter   |
| a attack[s] b.                                                         | b = b - a                                                 | art       |
| a lose[s] c points.                                                    | a = a - c                                                 | art       |
| a heal[s] b.                                                           | b = b + a                                                 | art       |
| a heal[s] for c points.                                                | a = a + c                                                 | art       |
| a critically hit[s] b.                                                 | b = b / a                                                 | art       |
| a dodge[s] b.                                                          | b = b * a                                                 | art       |
| a activate[s] a counter attack!                                        | prints a                                                  | console   |
| The token1, ... and tokenN (are|is) making up the scene!                    | token1, ..., tokenN can be modified                       | art       |
| The e is getting (weak or strong).                                     | e = false OR true                                         | art       |
| The e (surrounds or withdraws from) the scene when (bool or bool_leaf) | e = (leaf_bool OR bool)                                   | art       |
| a is boosting b's attack                                               | a > b                                                     | leaf_bool |
| a is boosting b's defense                                              | a >= b                                                    | leaf_bool |
| a is debuffing b's attack                                              | a < b                                                     | leaf_bool |
| a is debuffing b's defense                                             | a <= b                                                    | leaf_bool |
| (leaf_bool) and (leaf_bool)                                            | (leaf_bool) and (leaf_bool)                               | bool      |
| (leaf_bool) or (leaf_bool)                                             | (leaf_bool) or (leaf_bool)                                | bool      |
| a wonders if (bool or leaf_bool)                                       | if (condition) then pc+=1                                 | example   |
| a ponders if (bool or leaf_bool)                                       | if (condition) then pc+=1 else pc+=2                      | example   |
| a ponders if (bool or leaf_bool)                                       | if (condition) then pc+=1 else pc+=2                      | example   |
| a absorbs the experience of the fight                                  | a = fight()                                               | example   |
| e is infused with the experience of the fight                          | e = fight()                                               | example   |
| a prepares an attack                                                   | rc = loop start                                           | example   |
| until a is charged up                                                  | if (a === 0) pc = line(loopToken) else pc+=1              | example   |
| e is vibrating                                                         | rc = loop start                                           | example   |
| until e is vibrating                                                   | if (e === false) pc = line(loopToken) else pc+=1          | example   |
| a [flees OR is defeated OR dissapears]!                                | N/A                                                       | example   |
| It's[(super OR not OR very) effective ].                               | N/A                                                       | example   |
| a protect[s] b.                                                        | N/A                                                       | example   |
| a activate[s] a special skills.                                        | N/A                                                       | example   |