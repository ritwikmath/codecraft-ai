"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import styles from "../page.module.css";
import Navigation from "@/components/Navigation";
import { useParams } from "next/navigation";
import { useChat } from "@/hooks/useChat";
import { useEffect } from "react";

export default function Chat() {
    const params = useParams();
    const session = params.session as string;
    
    const { messages, loading, sendMessage } = useChat([])

    useEffect(() => {
        const message = localStorage.getItem("message")
        localStorage.removeItem("message")
        if (message) {
            sendMessage(message, session)
        }
    })
    return <div className={styles.chatPage}>
        <Navigation />
        <ChatContainer messages={messages} sessionId={session} sendMessage={sendMessage} messageLoading={loading}   />
    </div>
}