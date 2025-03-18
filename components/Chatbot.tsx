"use client";
import { useState } from "react";

export default function Chatbot() {
    const [message, setMessage] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();
            setResponse(data.reply);
        } catch (error) {
            setResponse("Error: Could not get response");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full p-2 border rounded"
            />
            <button
                onClick={sendMessage}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? "Loading..." : "Send"}
            </button>
            {response && <p className="mt-3 p-2 bg-white border rounded">{response}</p>}
        </div>
    );
}