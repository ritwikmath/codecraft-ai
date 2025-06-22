import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link'
import styles from "./navigation.module.css";
import { useSession } from "@/hooks/useSession";
import { useEffect, memo } from "react";
import NavigationMenuItem from "./NavigationMenuItem";


const Navigation = memo(function Navigation() {

    const { fetchAll } = useSession();
    const { fetchSessions, response } = fetchAll

    useEffect(() => {
        fetchSessions("u_123")
    }, [fetchSessions])
    

    return <div className={styles.leftMenu}>
            <div className={styles.topMenu}>
                <Link href="/chat">
                    <div className={styles.menuText}>
                        <FontAwesomeIcon icon={faPlus} />
                        New Chat
                    </div>
                </Link>
                <div className={styles.menuText}>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Search Chat</span>
                </div>
            </div>
            <div className={styles.bottomMenu}>
                <h4>Chats</h4>
                <div className={styles.chatList}>
                    {
                        response && response.map((session, index) => {
                            return <NavigationMenuItem key={index} id={session?.id} />
                        })
                    }
                </div>
            </div>
        </div>
})

export default Navigation;