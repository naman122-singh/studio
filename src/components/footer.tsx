import { Logo } from "./logo";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kala Saathi. All rights reserved.</p>
                        <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
