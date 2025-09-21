import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function FormattingToolbar() {
    const handleFormat = (format: string, value?: string) => {
        document.execCommand(format, false, value);
    };

    const tools = [
        { id: 'heading', icon: Heading1, tip: 'Heading 1', value: '<h1>' },
        { id: 'heading', icon: Heading2, tip: 'Heading 2', value: '<h2>' },
        { id: 'separator-1' },
        { id: 'bold', icon: Bold, tip: 'Bold' },
        { id: 'italic', icon: Italic, tip: 'Italic' },
        { id: 'separator-2' },
        { id: 'insertUnorderedList', icon: List, tip: 'Bulleted List' },
        { id: 'insertOrderedList', icon: ListOrdered, tip: 'Numbered List' },
        { id: 'formatBlock', icon: Quote, tip: 'Blockquote', value: '<blockquote>' },
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
                        <Tooltip key={tool.id + tool.value}>
                            <TooltipTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleFormat(tool.id, tool.value)} 
                                  aria-label={tool.tip}
                                  onMouseDown={(e) => e.preventDefault()}
                                >
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
