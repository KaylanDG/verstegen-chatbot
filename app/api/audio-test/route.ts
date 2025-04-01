import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI();

export async function GET() {
    try {
        const filePath = "./public/test2.m4a";
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });

        return NextResponse.json({ text: transcription.text });
    } catch (error) {
        return NextResponse.json({ error: "Transcription failed" }, { status: 500 });
    }
}