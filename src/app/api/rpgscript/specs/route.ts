import { readFileSync } from "fs";
import { NextResponse } from "next/server";

export interface Specification {
    instruction: string;
    meaning: string;
    domain: string;
    status: string;
}

export async function GET() {
    const file = readFileSync("./Specs.md", { encoding: 'utf-8' });
    let lines = file.split("\n");
    const specs: Specification[] = lines.slice(5)
        .map((line) => {
            const specsElt = line.split("|");
            return {
                instruction: specsElt[1].trim(),
                meaning: specsElt[2].trim(),
                domain: specsElt[3].trim(),
                status: specsElt[4].trim()
            }
        }).filter((spec) => spec.status !== "");

    return NextResponse.json({ specs }, { status: 200 });
}