import { useWindows } from '@/components/hooks/Windows.hook';
import { absorbing, attack, boostingAttack, boostingDefense, challenging, combining, comment, counter, criticalHit, debuffingAttack, debuffingDefense, dissapears, dodge, endOfFightSection, endOfFlashbackSection, enter, environmentChanging, fightSection, flashbackSection, flees, happened, heal, healFor, loopEntityCondition, loopEntityLabel, loopEnvironmentCondition, loopEnvironmentLabel, lose, makingUpTheScene, merging, pondering, protect, remember, slowedDown, slowedDownFor, vibrating, wondering } from '@/server/tokens';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { Window } from "../../window/Window";
import { ConsoleLayout } from './style';

export const CodeEditor = () => {
    const { windows } = useWindows();
    const [results, setResults] = useState<string[]>(["wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "wow", "hello world"])
    const code = `Fight of the fizz buzz
Entities
bard: 10hp
elf: 0hp
wolf: 0hp
ghost: 0hp
dragon: 15hp

Environments
sun: weak
rain: weak
mist: weak
wind: weak

Events
The bard, the elf, the wolf, the ghost and the dragon enter combat!
The sun, the rain, the mist and the wind are making up the scene!

The dragon prepares an attack
The wolf heals for 1 point.

The ghost protects the wolf.
The ghost is slowed down for 3 turns.
The ghost is challenging the elf under the sun.
The bard is wondering the effects of the sun.
The bard remembers the flashback of the fizz.

The ghost protects the wolf.
The ghost is slowed down for 5 turns.
The ghost is challenging the elf under the rain.
The bard is wondering the effects of the rain.
The bard remembers the flashback of the buzz.

The sun is vibrating.
The rain is vibrating.
The sun is combining with the rain.
The bard is wondering the effects of the sun.
The wolf activates a counter attack!

The dragon loses 1 point.
until the dragon is charged up.
End of the fight of the fizz buzz.



Flashback of the fizz
Entities
f: 102mp
i: 105mp
z: 122mp

Events
The f, the i and the z enter combat!
The f activates a counter attack!
The i activates a counter attack!
The z activates a counter attack!
The z activates a counter attack!
End of the flashback of the fizz.



Flashback of the buzz
Entities
b: 98mp
u: 117mp
z: 122mp

Events
The b, the u and the z enter combat!
The b activates a counter attack!
The u activates a counter attack!
The z activates a counter attack!
The z activates a counter attack!
End of the flashback of the buzz.`;
    const options = {
        selectOnLineNumbers: true,
        smoothScrolling: false,
        minimap: { enabled: false },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
    };
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (consoleRef !== null && consoleRef.current !== null) {
            consoleRef.current?.scrollTo({ top: consoleRef.current?.scrollHeight });
        }
    }, [results.length]);

    const monaco = useMonaco();
    useEffect(() => {
        if (monaco) {
            monaco.languages.register({ id: 'rpgscript' });
            monaco.languages.setLanguageConfiguration("rpgscript", {
                comments: {
                    lineComment: '#',
                },
            });
            monaco.languages.setMonarchTokensProvider("rpgscript", {
                defaultToken: '',
                tokenPostfix: '.rpg',
                keywords: [
                    'Entities',
                    'Environments',
                    'Events',
                    'strong',
                    'weak',
                    'hp',
                    'mp'
                ],
                digits: /\d+(_+\d+)*/,
                tokenizer: {
                    // identifiers and keywords
                    root: [
                        // types
                        [/\d+hp/, 'rpg-number'],
                        [/\d+mp/, 'rpg-string'],
                        [/(strong|weak)/, 'rpg-boolean'],
                        [/(Entities|Environments|Events)/, 'rpg-section'],
                        // comments
                        [comment, 'rpg-comment'],
                        // functions
                        [fightSection, 'rpg-fight-section'],
                        [endOfFightSection, 'rpg-end-fight-section'],
                        [flashbackSection, 'rpg-flashback-section'],
                        [endOfFlashbackSection.regExp, 'rpg-end-flashback-section'],
                        // instructions
                        [enter.regExp, 'rpg-instruction-enter'],
                        [protect.regExp, 'rpg-instruction-protect'],
                        [attack.regExp, 'rpg-instruction-attack'],
                        [lose.regExp, 'rpg-instruction-lose'],
                        [heal.regExp, 'rpg-instruction-heal'],
                        [healFor.regExp, 'rpg-instruction-healFor'],
                        [criticalHit.regExp, 'rpg-instruction-criticalHit'],
                        [dodge.regExp, 'rpg-instruction-dodge'],
                        [slowedDown.regExp, 'rpg-instruction-slowedDown'],
                        [slowedDownFor.regExp, 'rpg-instruction-slowedDownFor'],
                        [counter.regExp, 'rpg-instruction-counter'],
                        [makingUpTheScene.regExp, 'rpg-instruction-makingUpTheScene'],
                        [environmentChanging.regExp, 'rpg-instruction-environmentChanging'],
                        [absorbing.regExp, 'rpg-instruction-absorbing'],
                        [vibrating.regExp, 'rpg-instruction-vibrating'],
                        [challenging.regExp, 'rpg-instruction-challenging'],
                        [boostingAttack.regExp, 'rpg-instruction-boostingAttack'],
                        [boostingDefense.regExp, 'rpg-instruction-boostingDefense'],
                        [debuffingAttack.regExp, 'rpg-instruction-debuffingAttack'],
                        [debuffingDefense.regExp, 'rpg-instruction-debuffingDefense'],
                        [combining.regExp, 'rpg-instruction-combining'],
                        [merging.regExp, 'rpg-instruction-merging'],
                        [wondering.regExp, 'rpg-instruction-wondering'],
                        [pondering.regExp, 'rpg-instruction-pondering'],
                        [loopEntityLabel.regExp, 'rpg-instruction-loopEntityLabel'],
                        [loopEntityCondition.regExp, 'rpg-instruction-loopEntityCondition'],
                        [loopEnvironmentLabel.regExp, 'rpg-instruction-loopEnvironmentLabel'],
                        [loopEnvironmentCondition.regExp, 'rpg-instruction-loopEnvironmentCondition'],
                        [remember.regExp, 'rpg-instruction-remember'],
                        [happened.regExp, 'rpg-instruction-happened'],
                        [flees.regExp, 'rpg-instruction-flees'],
                        [dissapears.regExp, 'rpg-instruction-dissapears'],
                    ],
                },
            });
            const instructionColor = "#b62538";
            monaco.editor.defineTheme("rpgTheme", {
                base: "vs",
                inherit: false,
                rules: [
                    { token: "rpg-number", foreground: "#4997f0" },
                    { token: "rpg-string", foreground: "#4997f0" },
                    { token: "rpg-boolean", foreground: "#4997f0" },
                    { token: "rpg-section", foreground: "#2b4ee9" },
                    { token: "rpg-comment", foreground: "#39a153" },
                    { token: "rpg-fight-section", foreground: "#a18539" },
                    { token: "rpg-end-fight-section", foreground: "#a18539" },
                    { token: "rpg-flashback-section", foreground: "#a18539" },
                    { token: "rpg-end-flashback-section", foreground: "#a18539" },
                    { token: 'rpg-instruction-enter', foreground: instructionColor },
                    { token: 'rpg-instruction-protect', foreground: instructionColor },
                    { token: 'rpg-instruction-attack', foreground: instructionColor },
                    { token: 'rpg-instruction-lose', foreground: instructionColor },
                    { token: 'rpg-instruction-heal', foreground: instructionColor },
                    { token: 'rpg-instruction-healFor', foreground: instructionColor },
                    { token: 'rpg-instruction-criticalHit', foreground: instructionColor },
                    { token: 'rpg-instruction-dodge', foreground: instructionColor },
                    { token: 'rpg-instruction-slowedDown', foreground: instructionColor },
                    { token: 'rpg-instruction-slowedDownFor', foreground: instructionColor },
                    { token: 'rpg-instruction-counter', foreground: instructionColor },
                    { token: 'rpg-instruction-makingUpTheScene', foreground: instructionColor },
                    { token: 'rpg-instruction-environmentChanging', foreground: instructionColor },
                    { token: 'rpg-instruction-absorbing', foreground: instructionColor },
                    { token: 'rpg-instruction-vibrating', foreground: instructionColor },
                    { token: 'rpg-instruction-challenging', foreground: instructionColor },
                    { token: 'rpg-instruction-boostingAttack', foreground: instructionColor },
                    { token: 'rpg-instruction-boostingDefense', foreground: instructionColor },
                    { token: 'rpg-instruction-debuffingAttack', foreground: instructionColor },
                    { token: 'rpg-instruction-debuffingDefense', foreground: instructionColor },
                    { token: 'rpg-instruction-combining', foreground: instructionColor },
                    { token: 'rpg-instruction-merging', foreground: instructionColor },
                    { token: 'rpg-instruction-wondering', foreground: instructionColor },
                    { token: 'rpg-instruction-pondering', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEntityLabel', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEntityCondition', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEnvironmentLabel', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEnvironmentCondition', foreground: instructionColor },
                    { token: 'rpg-instruction-remember', foreground: instructionColor },
                    { token: 'rpg-instruction-happened', foreground: instructionColor },
                    { token: 'rpg-instruction-flees', foreground: instructionColor },
                    { token: 'rpg-instruction-dissapears', foreground: instructionColor },
                ],
                colors: {
                    "editor.foreground": "#000000",
                },
            });
            monaco.languages.registerCompletionItemProvider("rpgscript", {
                provideCompletionItems: (model, position) => {
                    var word = model.getWordUntilPosition(position);
                    var range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    };
                    var suggestions = [
                        {
                            label: "Entities",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "Entities",
                            range: range,
                        },
                        {
                            label: "Environments",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "Environments",
                            range: range,
                        },
                        {
                            label: "Events",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "Events",
                            range: range,
                        },
                        {
                            label: "variable",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "${1:variable}: $0",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "number",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "${1:number}hp",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "string",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "${1:number}mp",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "strong",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "strong",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "weak",
                            kind: monaco.languages.CompletionItemKind.Keyword,
                            insertText: "weak",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "fight",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: [
                                "Fight ${1:name}",
                                "End of the fight ${1:name}.",
                            ].join("\n"),
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "flashback",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: [
                                "Flashback ${1:name}",
                                "End of the flashback ${1:name}.",
                            ].join("\n"),
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "enters",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} enters combat!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "protects",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} protects the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "attacks",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} attacks the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "loses",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} loses ${2:number} points.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "heals",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} heals the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "healsFor",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} heals for ${2:number} points.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "criticalHits",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} critically hits the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "dodges",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} dodges the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "slowedDownBy",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is slowed down by the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "slowedDownFor",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is slowed down for ${2:number} turns.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "counter",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} activates a counter attack!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "makingUpTheScene",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is making up the scene!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "environmentChanging",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is getting ${2:boolean}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "absorbing",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is absorbing the ${2:number}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "vibrating",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is vibrating.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "challenging",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is challenging the ${2:var2} under the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "boostingAttack",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is boosting the ${2:var2}'s attack under the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "boostingDefense",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is boosting the ${2:var2}'s defense under the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "debuffingAttack",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is debuffing the ${2:var2}'s attack under the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "debuffingDefense",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is debuffing the ${2:var2}'s defense under the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "combining",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is combining with the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "merging",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is merging with the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "wondering",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is wondering the effects of the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "pondering",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} is pondering the effects of the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "loopEntity",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: [
                                "The ${1:var} prepares an attack",
                                "until the ${1:var} is charged up.",
                            ].join("\n"),
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "loopEnvironment",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: [
                                "The ${1:var} is starting to change",
                                "until the ${1:var} is done changing.",
                            ].join("\n"),
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "remembers",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} remembers the flashback ${2:name}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "happened",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The flashback ${1:name} happened under the ${2:var}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "flees",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} flees!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "dissapears",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} dissapears!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                    ];
                    return { suggestions: suggestions };
                }
            });
        }
    }, [monaco]);

    return <Window id="rpgscript" menu={{
        "Run": {
            onClick: () => console.log("Code running.")
        },
        "Save": {
            onClick: () => console.log("Code saved.")
        },
        "Examples": {
            onClick: () => console.log("Examples.")
        }
    }}>
        <Editor
            height={300}
            width={"100%"}
            language="rpgscript"
            theme="rpgTheme"
            value={""}
            options={options}
        />
        <ConsoleLayout ref={consoleRef}>
            <div>
                Output
            </div>
            <div>
                {results.map((result, index) => {
                    return (<div key={`output_n°${index}`}>
                        ${result}
                    </div>);
                })}
            </div>
        </ConsoleLayout>
    </Window>;
}