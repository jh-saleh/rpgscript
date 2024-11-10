# RPGScript
Created and designed by Jean-Hanna SALEH

## What is RPGScript
RPGScript is an [esoteric langage](https://en.wikipedia.org/wiki/Esoteric_programming_language) that allows you to write code the way a text adventure game would play out the likes of
[Caves of QUD](https://en.wikipedia.org/wiki/Caves_of_Qud), [Darf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) or [SanctuaryRPG](https://en.wikipedia.org/wiki/SanctuaryRPG).
Inspired by other esolang such as [Chef](https://www.dangermouse.net/esoteric/chef.html).

## Example
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

## Running the app
### Run using Docker
```sh
docker compose -f docker-compose.dev.yml up -d --build rpgscript
```

```sh
docker compose -f docker-compose.prod.yml up -d --build rpgscript-prod
```

### Run using npm
```sh
npm run dev
```

```sh
npm run build
```

### Stop
```sh
docker compose -f docker-compose.dev.yml down rpgscript
```

### Access logs
```sh
docker compose -f docker-compose.dev.yml logs rpgscript -f
```

### Run tests
```sh
npx jest 
```

```sh
npx jest --coverage 
```

### Accessing the container
```sh
docker compose -f docker-compose.dev.yml exec rpgscript /bin/sh
```

```sh
docker compose -f docker-compose.prod.yml exec rpgscript-prod /bin/sh
```