'use client';

import { BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    onLogoClick: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
    return (
        <header className="py-4 px-4 md:px-6 border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="container mx-auto flex items-center justify-between">
                <Button variant="ghost" className="flex items-center gap-2 text-xl font-bold p-0 h-auto hover:bg-transparent" onClick={onLogoClick}>
                    <BookMarked className="h-7 w-7 text-primary" />
                    <span className="font-headline">DocumentAI</span>
                </Button>
            </div>
        </header>
    );
}
