'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';

interface PromptFormProps {
    onGenerate: (prompt: string, template: string) => void;
}

const templates = [
    { value: 'general', label: 'General Document' },
    { value: 'technical_report', label: 'Technical Report' },
    { value: 'research_summary', label: 'Research Summary' },
    { value: 'marketing_copy', label: 'Marketing Copy' },
    { value: 'contract', label: 'Contract Template' },
];

export default function PromptForm({ onGenerate }: PromptFormProps) {
    const [prompt, setPrompt] = useState('');
    const [template, setTemplate] = useState('general');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            setIsLoading(true);
            await onGenerate(prompt, template);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full pt-8 md:pt-16">
            <Card className="w-full max-w-3xl shadow-lg border-none bg-transparent">
                <CardHeader className="text-center">
                    <CardTitle className="text-4xl md:text-5xl font-bold font-headline">
                        Start Your Document
                    </CardTitle>
                    <CardDescription className="text-lg text-muted-foreground pt-2">
                        Describe what you want to create, and let AI handle the draft.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="p-2 bg-card rounded-lg border shadow-sm">
                            <Textarea
                                placeholder="e.g., Generate a 5-page technical report about renewable energy trends, including sections on solar, wind, and geothermal power."
                                className="min-h-[120px] text-base border-none focus-visible:ring-0 shadow-none resize-none"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select onValueChange={setTemplate} defaultValue={template} disabled={isLoading}>
                                <SelectTrigger className="w-full sm:w-[220px]">
                                    <SelectValue placeholder="Select a template" />
                                </SelectTrigger>
                                <SelectContent>
                                    {templates.map(t => (
                                        <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type="submit" className="w-full sm:flex-1" disabled={isLoading || !prompt.trim()}>
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-4 w-4" />
                                )}
                                Generate
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
