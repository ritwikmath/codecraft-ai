"use client;"

import { useSession } from "@/hooks/useSession"
import Link from "next/link"
import { useEffect } from "react"

type MenuItem = {
    id: string
}

export default function NavigationMenuItem({ id }: MenuItem) {
    const { fetchOne } = useSession()
    const { fetchSessionDetails, loading, response } = fetchOne

    useEffect(() => {
        fetchSessionDetails("u_123", id)
    }, [fetchSessionDetails, id])

    return !loading &&
    <Link href={`/chat/${id}`}>{response?.state?.name}</Link>
}