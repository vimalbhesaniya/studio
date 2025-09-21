import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function FormattingToolbar() {
    const handleFormat = (format: string) => {
        // In a real app, this would use document.execCommand or a library to format selected text.
        // For now, it's a placeholder.
        console.log(`Formatting action: ${format}`);
    };

    const tools = [
        { id: 'h1', icon: Heading1, tip: 'Heading 1' },
        { id: 'h2', icon: Heading2, tip: 'Heading 2' },
        { id: 'separator-1' },
        { id: 'bold', icon: Bold, tip: 'Bold' },
        { id: 'italic', icon: Italic, tip: 'Italic' },
        { id: 'separator-2' },
        { id: 'ul', icon: List, tip: 'Bulleted List' },
        { id: 'ol', icon: ListOrdered, tip: 'Numbered List' },
        { id: 'quote', icon: Quote, tip: 'Blockquote' },
    ];

    return (
        <TooltipProvider>
            <div className="flex items-center gap-1">
                {tools.map(tool => {
                    if (tool.id.startsWith('separator')) {
                        return <Separator key={tool.id} orientation="vertical" className="h-6 mx-1" />;
                    }
                    const Icon = tool.icon!;
                    return (
                        <Tooltip key={tool.id}>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => handleFormat(tool.id)} aria-label={tool.tip}>
                                    <Icon className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tool.tip}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}
