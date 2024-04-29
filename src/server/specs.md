# RPGScript
file.rpg
code example
```
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
instruction set

|instruction                             | meaning                                                   | example   |
|----------------------------------------|-----------------------------------------------------------|-----------|
|The token1, ... and tokenN enter combat!| token1, ..., tokenN is added in that order onto the stack | example   |
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