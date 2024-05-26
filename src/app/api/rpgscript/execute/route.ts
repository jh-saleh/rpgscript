import { Interpreter, InterpreterOutput } from "@/server/Interpreter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const code = formData.get('code') as unknown as string | null;

    if (!code) {
        return NextResponse.json({ error: "Empty file." }, { status: 400 });
    }

    const interpreter = new Interpreter();
    const data = code.split("\n").map((instruction) => instruction.trim());

    try {
        const result: InterpreterOutput = interpreter.execute(undefined, data);
        return NextResponse.json(result, { status: 200 });
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
    }
}