"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation";

export default function Chat() {
    return <div className={styles.chatPage}>
        <Navigation />
        <ChatContainer />
    </div>
}