"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import styles from "./page.module.css";
import Navigation from "@/components/Navigation";
import { useParams } from "next/navigation";



export default function Chat() {
    const params = useParams();
    const session = params.session;
    console.log(session)
    return <div className={styles.chatPage}>
        <Navigation />
        <ChatContainer />
    </div>
}