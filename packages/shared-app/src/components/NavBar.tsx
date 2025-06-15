'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

interface NavBarProps {
    title: string
}

export default function NavBar({ title }: NavBarProps) {
    const { theme, setTheme } = useTheme()

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
            <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="m-8 font-bold text-lg">
                    {title}
                </Link>
                <button
                    aria-label="Alternar tema"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded hover:bg-accent"
                >
                    {theme === 'dark' ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
                </button>
            </div>
        </header>
    )
} 