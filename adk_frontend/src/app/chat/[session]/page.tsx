"use client";

import ChatContainer from "@/components/chat/ChatContainer";
import styles from "../page.module.css";
import Navigation from "@/components/Navigation";
import { useParams } from "next/navigation";


type MessageProps = {
    message: string,
    owner: string
}


const chats: MessageProps[] = [
    {
        owner: "user",
        message: "In nextjs props I accept a message key as string. Sample code"
    },
    {
        owner: "system",
        message: "In Next.js, you'd typically pass props to a component, and that component would then accept a message key as a string. Here's a sample of how you'd do that, covering both a page component and a regular React component."
    }
]

export default function Chat() {
    const params = useParams();
    const session = params.session as string;
    console.log(session)
    return <div className={styles.chatPage}>
        <Navigation />
        <ChatContainer messages={chats} sessionId={session}  />
    </div>
}