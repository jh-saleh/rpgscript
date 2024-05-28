import { Specification } from "@/app/api/rpgscript/specs/route";
import { useWindows } from "@/components/hooks/Windows.hook";
import axiosInstance from "@/server/axios/axiosClient";
import { useEffect, useState } from "react";
import { Window } from "../../window/Window";
import { InstructionLayout, InstructionsWrapperLayout, MotivationLayout, SpecificationsLayout, TitleLayout } from "./style";

export const Specifications = () => {
    const { windows } = useWindows();
    const { state } = windows["rpgscriptspecs"];
    const URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const portfolioURL = process.env.NEXT_PUBLIC_PORTFOLIO_URL ?? "";
    const linkedinURL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
    const [specs, setSpecs] = useState<Specification[]>([]);

    useEffect(() => {
        axiosInstance.get(`${URL}/api/rpgscript/specs`)
            .then(({ data: { specs } }) => {
                setSpecs(() => specs as Specification[]);
            })
    }, []);

    return <Window id="rpgscriptspecs">
        <SpecificationsLayout $state={state}>
            <TitleLayout>
                Motivation
            </TitleLayout>
            <MotivationLayout>
                <p>
                    RPGScript is an <a href="https://en.wikipedia.org/wiki/Esoteric_programming_language" target="_blank">esoteric</a> pseudo assembly language
                    written and designed by <a href={linkedinURL}>Jean-Hanna SALEH</a>. An esoteric programming language or an esolang is "designed to test the boundaries of computer programming language design" - Wikipedia.
                </p>
                <p>
                    RPGScript allows you to write code in the way a text adventure game would play out the likes of <a href="https://en.wikipedia.org/wiki/Caves_of_Qud" target="_blank">Caves of QUD</a>, <a href="https://en.wikipedia.org/wiki/Dwarf_Fortress" target="_blank">Dwarf Fortress</a> or <a href="https://en.wikipedia.org/wiki/SanctuaryRPG" target="_blank">SanctuaryRPG</a>.
                    It is inspired by other esolang such as <a href="https://www.dangermouse.net/esoteric/chef.html" target="_blank">Chef</a>.
                </p>
                <p>
                    If you liked this website, checkout my <a href={portfolioURL} target="_blank">portfolio !</a>
                </p>
                <p>
                    The text editor has the same shortcuts as vscode ! <a href="https://code.visualstudio.com/docs/getstarted/keybindings#_basic-editing" target="_blank">Check them out here.</a>
                </p>
            </MotivationLayout>
            <TitleLayout>
                Instruction set
            </TitleLayout>
            <InstructionsWrapperLayout>
                <thead>
                    <tr>
                        <th>
                            Instruction
                        </th>
                        <th>
                            Meaning
                        </th>
                        <th>
                            Domain
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {specs.map((spec) => <InstructionLayout>
                        <td>
                            {spec.instruction}
                        </td>
                        <td>
                            {spec.meaning}
                        </td>
                        <td>
                            {spec.domain}
                        </td>
                    </InstructionLayout>)}
                </tbody>
            </InstructionsWrapperLayout>
        </SpecificationsLayout>
    </Window>;
}