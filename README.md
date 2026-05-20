# [FR] - RPGScript
Créé et conçu par Jean-Hanna SALEH

## Qu'est-ce que RPGScript ?
RPGScript est un [langage ésotérique](https://en.wikipedia.org/wiki/Esoteric_programming_language) qui vous permet d'écrire du code à la manière d'un jeu d'aventure textuel, dans le style de [Caves of QUD](https://en.wikipedia.org/wiki/Caves_of_Qud), [Dwarf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) ou [SanctuaryRPG](https://en.wikipedia.org/wiki/SanctuaryRPG).
Il est inspiré d'autres esolangs tels que [Chef](https://www.dangermouse.net/esoteric/chef.html).

Vous pouvez exécuter du code RPGScript via l'interface inspirée de **Windows XP**, en cliquant sur l'icône "**RPG Script**", puis sur l'option "**Run**".
Vous pouvez sélectionner des exemples de code depuis "**Examples**", écrire votre propre code dans l'éditeur, effacer la sortie du terminal en cliquant sur "**Clear Output**", et sauvegarder le fichier de code sur lequel vous travaillez.

L'éditeur de texte utilise les mêmes raccourcis que VS Code ; vous pouvez ainsi afficher tous les snippets pour chaque instruction en tapant (Ctrl+Espace).
Une coloration syntaxique spécifique à RPG Script est également disponible.
Le jeu d'instructions est disponible dans le fichier **Specs.md** ; vous pouvez également y accéder depuis l'application web en cliquant sur l'icône "**RPG Script Specs**".

## Exemple
Extension de fichier : ".rpg"

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
## Lancer l'application
### Lancer avec Docker
```sh
docker compose -f docker-compose.dev.yml up -d --build rpgscript
```
```sh
docker compose -f docker-compose.prod.yml up -d --build rpgscript-prod
```
### Lancer avec npm
```sh
npm run dev
```
```sh
npm run build
```
### Arrêter
```sh
docker compose -f docker-compose.dev.yml down rpgscript
```
### Accéder aux logs
```sh
docker compose -f docker-compose.dev.yml logs rpgscript -f
```
### Lancer les tests
```sh
npx jest 
```
```sh
npx jest --coverage 
```
### Accéder au conteneur
```sh
docker compose -f docker-compose.dev.yml exec rpgscript /bin/sh
```
```sh
docker compose -f docker-compose.prod.yml exec rpgscript-prod /bin/sh
```

# [EN] - RPGScript
Created and designed by Jean-Hanna SALEH

## What is RPGScript
RPGScript is an [esoteric langage](https://en.wikipedia.org/wiki/Esoteric_programming_language) that allows you to write code the way a text adventure game would play out the likes of
[Caves of QUD](https://en.wikipedia.org/wiki/Caves_of_Qud), [Darf Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) or [SanctuaryRPG](https://en.wikipedia.org/wiki/SanctuaryRPG).
Inspired by other esolang such as [Chef](https://www.dangermouse.net/esoteric/chef.html).

You can run RPGScript code through the **Windows XP**'s theme interface, by clicking the "**RPG Script**" icon, then the "**Run**" option.
You can select code samples from "**Examples**", write your own code in the editor, clear the terminal output by clicking "**Clear Output**"
and save the current code file you're working on.

The text editor has the same shortcuts as VS Code, as such you can display every snippet for every instruction by typing (Ctrl+Space).
There's also code highlight tailored for RPG Script.

The instruction set is available in the **Specs.md file**, you can also access it within the web application by clicking on the "**RPG Script Specs**" icon.

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