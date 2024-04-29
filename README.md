# RPGScript
By Jean-Hanna SALEH

### What is RPGScript
RPGScript is an [esoteric langage](https://en.wikipedia.org/wiki/Esoteric_programming_language) that allows you to write code the way an rpg would play out !
Inspired by other eso lang like [Chef](https://www.dangermouse.net/esoteric/chef.html)

### Example
File extension : ".rpg"

```rpg
Entities
dragon: 100hp
wolf: 50hp
human: 100hp

Fight Of The Century
The dragon, wolf and human enter combat !
The dragon attacks the wolf !
The wolf dodge the dragon's attack.
The human heals the wolf for 60 points.

```
### Instruction Set

|instruction                             | meaning                                                   | example   |
|----------------------------------------|-----------------------------------------------------------|-----------|
|The token1, ... and tokenN enter combat!| token1, ..., tokenN can be modified                       | example   |
|a attack[s] b.                          | b = b - a                                                 | example   |
|a lose[s] c points.                     | a = a - c                                                 | example   |
|a heals[s] b.                           | b = b + a                                                 | example   |
|a heals[s] for c points.                | a = a + c                                                 | example   |
|a critically hit[s] b.                  | b = b / a                                                 | example   |
|a dodge[s] b.                           | b = b * a                                                 | example   |
|a activate[s] a counter!                | prints a                                                  | example   |
|a [flees OR is defeated OR dissapears]! | N/A                                                       | example   |
|It's[(super OR not OR very) effective ].| N/A                                                       | example   |
|a protect[s] b.                         | N/A                                                       | example   |
|a activate[s] a special skills.         | N/A                                                       | example   |