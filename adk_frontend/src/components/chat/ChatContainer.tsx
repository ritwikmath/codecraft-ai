import Image from 'next/image';
import styles from "./chat.module.css";
import ChatMessage from "./ChatMessage";
import ChatInput from './ChatInput';

type MessageProps = {
    text: string,
    owner: 'user' | 'system'
}

type ChatMessages = {
    messages?: MessageProps[],
    sessionId?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendMessage?: any
    messageLoading?: boolean
}

export default function ChatContainer({ messages, sessionId, sendMessage, messageLoading }: ChatMessages) {
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
                    messages && messages.length > 0 && messages.map((message, index) => {
                        return <ChatMessage key={index} owner={message.owner} message={message.text} />
                    })
                }
            </div>
            <ChatInput sessionId={sessionId} sendMessage={sendMessage} messageLoading={messageLoading} />
        </div>
}