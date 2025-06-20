import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./chat.module.css";

export default function ChatInput() {
    return <div className={styles.inputContainer}>
        <textarea className={styles.inputField}></textarea>
        <div className={styles.submitButton}>
            <FontAwesomeIcon icon={faArrowUp} />
        </div>
    </div>
}