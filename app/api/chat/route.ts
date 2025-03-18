import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
    try {
        const { message }: { message: string } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: message }],
        });

        return NextResponse.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}