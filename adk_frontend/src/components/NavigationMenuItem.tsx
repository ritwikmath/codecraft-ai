"use client;"

import { useSession } from "@/hooks/useSession"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import Styles from "./navigation.module.css"

type MenuItem = {
    id: string
}

export default function NavigationMenuItem({ id }: MenuItem) {
    const params = useParams();
    const session = params.session as string;

    const { fetchOne } = useSession()
    const { fetchSessionDetails, loading, response } = fetchOne

    useEffect(() => {
        const username = localStorage.getItem("username")
        if (username)
            fetchSessionDetails(username, id)
    }, [fetchSessionDetails, id])

    return !loading &&
    <Link href={`/chat/${id}`} className={session == id ? Styles.Active : ""}>{response?.state?.name}</Link>
}