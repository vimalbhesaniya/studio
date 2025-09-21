import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function FormattingToolbar() {
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const formatBlock = (tag: string) => {
    document.execCommand('formatBlock', false, tag);
  };

  const tools = [
    { id: 'bold', icon: Bold, tip: 'Bold', action: () => handleFormat('bold') },
    {
      id: 'italic',
      icon: Italic,
      tip: 'Italic',
      action: () => handleFormat('italic'),
    },
    {
      id: 'underline',
      icon: Underline,
      tip: 'Underline',
      action: () => handleFormat('underline'),
    },
    {
      id: 'strikethrough',
      icon: Strikethrough,
      tip: 'Strikethrough',
      action: () => handleFormat('strikethrough'),
    },
    { id: 'separator-1' },
    {
      id: 'h1',
      icon: Heading1,
      tip: 'Heading 1',
      action: () => formatBlock('h1'),
    },
    {
      id: 'h2',
      icon: Heading2,
      tip: 'Heading 2',
      action: () => formatBlock('h2'),
    },
    {
      id: 'h3',
      icon: Heading3,
      tip: 'Heading 3',
      action: () => formatBlock('h3'),
    },
    {
      id: 'blockquote',
      icon: Quote,
      tip: 'Blockquote',
      action: () => formatBlock('blockquote'),
    },
    { id: 'separator-2' },
    {
      id: 'ul',
      icon: List,
      tip: 'Bulleted List',
      action: () => handleFormat('insertUnorderedList'),
    },
    {
      id: 'ol',
      icon: ListOrdered,
      tip: 'Numbered List',
      action: () => handleFormat('insertOrderedList'),
    },
    { id: 'separator-3' },
    {
      id: 'alignLeft',
      icon: AlignLeft,
      tip: 'Align Left',
      action: () => handleFormat('justifyLeft'),
    },
    {
      id: 'alignCenter',
      icon: AlignCenter,
      tip: 'Align Center',
      action: () => handleFormat('justifyCenter'),
    },
    {
      id: 'alignRight',
      icon: AlignRight,
      tip: 'Align Right',
      action: () => handleFormat('justifyRight'),
    },
    {
      id: 'alignJustify',
      icon: AlignJustify,
      tip: 'Justify',
      action: () => handleFormat('justifyFull'),
    },
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-1 bg-muted p-1 rounded-md">
        {tools.map((tool, index) => {
          if (tool.id.startsWith('separator')) {
            return (
              <Separator
                key={tool.id}
                orientation="vertical"
                className="h-6 mx-1"
              />
            );
          }
          const Icon = tool.icon!;
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={tool.action}
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