import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI();

const generateSpeech = async (input: string) => {
    try {
        const mp3 = await openai.audio.speech.create({
            model: "gpt-4o-mini-tts",
            voice: "echo",
            input,
        });

        const audioBuffer = Buffer.from(await mp3.arrayBuffer());
        return audioBuffer;
    } catch (error) {
        console.error("Error generating speech:", error);
        throw new Error("Failed to generate speech");
    }
};

export async function POST(req: Request) {
    const { input } = await req.json();

    if (!input) {
        return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    try {
        const audioBuffer = await generateSpeech(input);

        const response = new NextResponse(audioBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": audioBuffer.length.toString(),
            },
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}