import Image from 'next/image';
import styles from "./chat.module.css";
import ChatMessage from "./ChatMessage";
import ChatInput from './ChatInput';

type MessageProps = {
    message: string,
    owner: string
}

type ChatMessages = {
    messages?: MessageProps[],
    sessionId?: string
}

export default function ChatContainer({ messages, sessionId }: ChatMessages) {
    return <div className={styles.chatBox}>
            <div className={styles.mainMenu}>
                <div className={styles.logo}>
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={200}
                        height={70} 
                    />
                </div>
            </div>
            <div className={styles.messageContainer}>
                {
                    messages && messages.map((messages, index) => {
                        return <ChatMessage key={index} owner={messages.owner} message={messages.message} />
                    })
                }
            </div>
            <ChatInput sessionId={sessionId} />
        </div>
}