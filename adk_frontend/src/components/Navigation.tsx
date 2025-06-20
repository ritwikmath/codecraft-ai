import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import styles from "./navigation.module.css";


export default function Navigation() {
    return <div className={styles.leftMenu}>
            <div className={styles.topMenu}>
                <div className={styles.menuText}>
                    <FontAwesomeIcon icon={faPlus} />
                    <span>New Chat</span>
                </div>
                <div className={styles.menuText}>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search Chat</span>
                </div>
            </div>
            <div className={styles.bottomMenu}>
                <h4>Chats</h4>
                <div className={styles.chatList}>
                    <Link href="/chat/1">Using Font Awesome React</Link>
                    <Link href="/chat/2">GADK Git Code Enhancement</Link>
                    <Link href="/chat/3">Multi-Agent GenAI Projects</Link>
                </div>
            </div>
        </div>
}