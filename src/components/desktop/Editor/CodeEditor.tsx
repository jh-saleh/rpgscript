import { useWindows } from '@/components/hooks/Windows.hook';
import { Interpreter, InterpreterOutput } from '@/server/Interpreter';
import axiosInstance from '@/server/axios/axiosClient';
import { absorbing, attack, bless, boostingAttack, boostingDefense, breaks, castEntityToEnv, castEnvToEntity, challenging, combine, combining, comment, consume, counter, criticalHit, currentLevel, debuffingAttack, debuffingDefense, decreaseDurability, decreaseDurabilityByPoints, dissapears, dodge, editStats, editStatsByTurn, enchant, enchantAlongside, enchantMin, endOfFightSection, endOfFlashbackSection, enter, environmentChanging, equip, fightSection, flashbackSection, flees, happened, heal, healFor, increaseDurability, increaseDurabilityAlongside, increaseDurabilityByPoints, inspect, loopEntityCondition, loopEntityLabel, loopEnvironmentCondition, loopEnvironmentLabel, lose, makingUpTheScene, meditate, merging, pondering, protect, reach, remember, slowedDown, slowedDownFor, upgradeLevel, upgradeStaticLevel, useElement, useLast, useStaticElement, vibrating, wondering } from '@/server/tokens';
import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import { Window } from "../../window/Window";
import { Console } from './Console';
import { bubblesort, fibonacci, fizzBuzz, gcd } from './Files';
import { EditorLayout } from './style';

export const CodeEditor = () => {
    const [code, setCode] = useState<string>(fizzBuzz);
    const [outputs, setOutputs] = useState<string[]>([]);
    const monaco = useMonaco();
    const URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const { windows } = useWindows();

    const editorOptions = {
        selectOnLineNumbers: true,
        smoothScrolling: false,
        minimap: { enabled: false },
        overviewRulerLanes: 0,
        overviewRulerBorder: false,
    };

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
                        [/((-?\d+(\.\d+)?)[a-z]{1,3}\s?)+ ((-?\d+(\.\d+)?)[a-z]{1,3})/, 'rpg-array'],
                        [/(Entities|Environments|Items|Events)/, 'rpg-section'],
                        // comments
                        [comment, 'rpg-comment'],
                        // functions
                        [fightSection, 'rpg-fight-section'],
                        [endOfFightSection, 'rpg-end-fight-section'],
                        [flashbackSection, 'rpg-flashback-section'],
                        [endOfFlashbackSection.regExp, 'rpg-end-flashback-section'],
                        // instructions
                        [enter.regExp, 'rpg-instruction-enter'],
                        [reach.regExp, 'rpg-instruction-reach'],
                        [protect.regExp, 'rpg-instruction-protect'],
                        [meditate.regExp, 'rpg-instruction-meditate'],
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
                        [castEnvToEntity.regExp, 'rpg-instruction-castEnvToEntity'],
                        [castEntityToEnv.regExp, 'rpg-instruction-castEntityToEnv'],
                        [loopEntityLabel.regExp, 'rpg-instruction-loopEntityLabel'],
                        [loopEntityCondition.regExp, 'rpg-instruction-loopEntityCondition'],
                        [loopEnvironmentLabel.regExp, 'rpg-instruction-loopEnvironmentLabel'],
                        [loopEnvironmentCondition.regExp, 'rpg-instruction-loopEnvironmentCondition'],
                        [remember.regExp, 'rpg-instruction-remember'],
                        [happened.regExp, 'rpg-instruction-happened'],
                        [flees.regExp, 'rpg-instruction-flees'],
                        [dissapears.regExp, 'rpg-instruction-dissapears'],
                        [equip.regExp, 'rpg-instruction-equip'],
                        [inspect.regExp, 'rpg-instruction-inspect'],
                        [useLast.regExp, 'rpg-instruction-useLast'],
                        [useElement.regExp, 'rpg-instruction-useElement'],
                        [useStaticElement.regExp, 'rpg-instruction-useStaticElement'],
                        [currentLevel.regExp, 'rpg-instruction-currentLevel'],
                        [upgradeLevel.regExp, 'rpg-instruction-upgradeLevel'],
                        [upgradeStaticLevel.regExp, 'rpg-instruction-upgradeStaticLevel'],
                        [enchant.regExp, 'rpg-instruction-enchant'],
                        [enchantAlongside.regExp, 'rpg-instruction-enchantAlongside'],
                        [enchantMin.regExp, 'rpg-instruction-enchantMin'],
                        [combine.regExp, 'rpg-instruction-combine'],
                        [increaseDurability.regExp, 'rpg-instruction-increaseDurability'],
                        [increaseDurabilityByPoints.regExp, 'rpg-instruction-increaseDurabilityByPoints'],
                        [increaseDurabilityAlongside.regExp, 'rpg-instruction-increaseDurabilityAlongside'],
                        [decreaseDurability.regExp, 'rpg-instruction-decreaseDurability'],
                        [breaks.regExp, 'rpg-instruction-breaks'],
                        [decreaseDurabilityByPoints.regExp, 'rpg-instruction-decreaseDurabilityByPoints'],
                        [editStatsByTurn.regExp, 'rpg-instruction-editStatsByTurn'],
                        [editStats.regExp, 'rpg-instruction-editStats'],
                        [consume.regExp, 'rpg-instruction-consume'],
                        [bless.regExp, 'rpg-instruction-bless'],
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
                    { token: "rpg-array", foreground: "#4997f0" },
                    { token: "rpg-section", foreground: "#2b4ee9" },
                    { token: "rpg-comment", foreground: "#39a153" },
                    { token: "rpg-fight-section", foreground: "#a18539" },
                    { token: "rpg-end-fight-section", foreground: "#a18539" },
                    { token: "rpg-flashback-section", foreground: "#a18539" },
                    { token: "rpg-end-flashback-section", foreground: "#a18539" },
                    { token: 'rpg-instruction-enter', foreground: instructionColor },
                    { token: 'rpg-instruction-reach', foreground: instructionColor },
                    { token: 'rpg-instruction-protect', foreground: instructionColor },
                    { token: 'rpg-instruction-meditate', foreground: instructionColor },
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
                    { token: 'rpg-instruction-castEnvToEntity', foreground: instructionColor },
                    { token: 'rpg-instruction-castEntityToEnv', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEntityLabel', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEntityCondition', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEnvironmentLabel', foreground: instructionColor },
                    { token: 'rpg-instruction-loopEnvironmentCondition', foreground: instructionColor },
                    { token: 'rpg-instruction-remember', foreground: instructionColor },
                    { token: 'rpg-instruction-happened', foreground: instructionColor },
                    { token: 'rpg-instruction-flees', foreground: instructionColor },
                    { token: 'rpg-instruction-dissapears', foreground: instructionColor },
                    { token: 'rpg-instruction-equip', foreground: instructionColor },
                    { token: 'rpg-instruction-inspect', foreground: instructionColor },
                    { token: 'rpg-instruction-useLast', foreground: instructionColor },
                    { token: 'rpg-instruction-useElement', foreground: instructionColor },
                    { token: 'rpg-instruction-useStaticElement', foreground: instructionColor },
                    { token: 'rpg-instruction-currentLevel', foreground: instructionColor },
                    { token: 'rpg-instruction-upgradeLevel', foreground: instructionColor },
                    { token: 'rpg-instruction-upgradeStaticLevel', foreground: instructionColor },
                    { token: 'rpg-instruction-enchant', foreground: instructionColor },
                    { token: 'rpg-instruction-enchantAlongside', foreground: instructionColor },
                    { token: 'rpg-instruction-enchantMin', foreground: instructionColor },
                    { token: 'rpg-instruction-combine', foreground: instructionColor },
                    { token: 'rpg-instruction-increaseDurability', foreground: instructionColor },
                    { token: 'rpg-instruction-increaseDurabilityByPoints', foreground: instructionColor },
                    { token: 'rpg-instruction-increaseDurabilityAlongside', foreground: instructionColor },
                    { token: 'rpg-instruction-decreaseDurability', foreground: instructionColor },
                    { token: 'rpg-instruction-breaks', foreground: instructionColor },
                    { token: 'rpg-instruction-decreaseDurabilityByPoints', foreground: instructionColor },
                    { token: 'rpg-instruction-editStatsByTurn', foreground: instructionColor },
                    { token: 'rpg-instruction-editStats', foreground: instructionColor },
                    { token: 'rpg-instruction-consume', foreground: instructionColor },
                    { token: 'rpg-instruction-bless', foreground: instructionColor },
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
                            label: "reach",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} reaches level ${2:var2}.",
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
                            label: "meditates",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} meditates.",
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
                            label: "castEnvToEntity",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1}'s hidden skill is triggered under the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "castEntityToEnv",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var1} triggers the ${2:var2}'s hidden skill.",
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
                        {
                            label: "equip",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} equips the ${2:var2}!",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "inspect",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} inspects the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "useLast",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} uses the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "useElement",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} uses the ${2:var2} on the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "useStaticElement",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} uses the ${2:var2} for ${3:turns} turns on the ${4:var4}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "currentLevel",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} is currently level ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "upgradeLevel",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} upgrades the ${2:var2} by ${3:levels} levels.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "upgradeStaticLevel",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} upgrades the ${2:var2} by ${3:levels} levels in ${4:mins} mins.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "enchant",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} enchants the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "enchantAlongside",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} enchants alongside the ${2:var2} the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "enchantMin",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} enchants the ${2:var2} in ${3:mins} mins.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "combine",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} combines the ${2:var2} and the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "increaseDurability",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} increases the ${2:var2}'s durability.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "increaseDurabilityByPoints",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} increases the ${2:var2}'s durability by ${3:points} points.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "increaseDurabilityAlongside",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} increases the ${2:var2}'s durability alongside the ${3:var3}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "decreaseDurability",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var}'s durability is decreased.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "breaks",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} breaks after the ${2:var2} uses it.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "decreaseDurabilityByPoints",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var}'s durability is decreased by ${2:var2} points.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "editStatsByTurn",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} decreased the ${2:var2}'s attack for ${3:turns} turns.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "editStats",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} decreased the ${2:var2} and the ${3:var3}'s attack.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "consume",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} consumes the ${2:var2}.",
                            insertTextRules:
                                monaco.languages.CompletionItemInsertTextRule
                                    .InsertAsSnippet,
                            range: range,
                        },
                        {
                            label: "bless",
                            kind: monaco.languages.CompletionItemKind.Snippet,
                            insertText: "The ${1:var} blesses the ${2:var2}!",
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

    const downloadCode = () => {
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:attachment/text,' + encodeURI(code);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'code.rpg';
        hiddenElement.click();
    }

    const executeCodeOld = () => {
        const formData = new FormData();
        formData.append("code", code);
        axiosInstance.post(`${URL}/api/rpgscript/execute`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(({ data }) => {
            const { logs }: InterpreterOutput = data;
            const line: string = logs.join("");
            setOutputs((value) => [...value, line]);
        }).catch((error) => {
            console.log(error.response.data.error);
            setOutputs((value) => [...value, error.response.data.error]);
        });
    }

    const executeCode = () => {
        try {
            const interpreter = new Interpreter();
            let data = code.split("\n").map((instruction) => instruction.trim());
            const { logs }: InterpreterOutput = interpreter.execute(undefined, data);
            const line: string = logs.join("");
            setOutputs((value) => [...value, line]);
        } catch (e) {
            setOutputs((value) => [...value, String(e)]);
        }
    }

    const clearOutput = () => {
        setOutputs(() => []);
    }

    return <Window id="rpgscript" menu={{
        "File": [
            {
                label: "New File...",
                onClick: () => setCode(() => "")
            },
            {
                label: "Save",
                onClick: () => downloadCode()
            },
        ],
        "Run": {
            onClick: () => executeCode()
        },
        "Clear Output": {
            onClick: () => clearOutput()
        },
        "Examples": [
            {
                label: "Fizz Buzz",
                onClick: () => setCode(() => fizzBuzz)
            },
            {
                label: "Fibonacci",
                onClick: () => setCode(() => fibonacci)
            },
            {
                label: "Greatest Common Divider",
                onClick: () => setCode(() => gcd)
            },
            {
                label: "Bubble sort",
                onClick: () => setCode(() => bubblesort)
            }
        ]
    }}>
        <EditorLayout $state={windows["rpgscript"].state}>
            {monaco && <Editor
                height={"100%"}
                width={"100%"}
                language="rpgscript"
                theme="rpgTheme"
                value={code}
                options={editorOptions}
                onChange={(value) => { setCode(() => value ?? ""); }}
            />}
        </EditorLayout>
        <Console outputs={outputs} />
    </Window>;
}