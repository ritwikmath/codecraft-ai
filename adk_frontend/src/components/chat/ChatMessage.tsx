import styles from "./chat.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

type MessageProps = {
    message: string,
    owner: string
}

export default function ChatMessage({ message, owner }: MessageProps) {
    return <div className={owner == "system" ? styles.systemMessage : styles.userMessage}>
        {
            owner == "system" && <FontAwesomeIcon className={styles.robotIcon} icon={faRobot} />
        }
        <p>{message}</p>
    </div>
}