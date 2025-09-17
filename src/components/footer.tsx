import { Logo } from "./logo";

export function Footer() {
    return (
        <footer className="border-t py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <Logo />
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kala Saathi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
