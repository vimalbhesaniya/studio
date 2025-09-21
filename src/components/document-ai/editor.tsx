'use client';

import { useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Download, FileText, FileType, FileDown, FileCode } from 'lucide-react';
import FormattingToolbar from './formatting-toolbar';
import { useToast } from '@/hooks/use-toast';

interface EditorProps {
    document: string;
}

export default function Editor({ document }: EditorProps) {
    const { toast } = useToast();
    const editorRef = useRef<HTMLDivElement>(null);

    const handleCopyToClipboard = () => {
        if (editorRef.current) {
            navigator.clipboard.writeText(editorRef.current.innerText)
                .then(() => {
                    toast({ title: 'Copied to clipboard!' });
                })
                .catch(err => {
                    toast({ title: 'Failed to copy', description: 'Could not copy content to clipboard.', variant: 'destructive' });
                    console.error('Failed to copy text: ', err);
                });
        }
    };
    
    const handleExport = (format: 'Markdown' | 'HTML' | 'PDF' | 'DOCX') => {
        toast({
            title: 'Export not implemented',
            description: `Exporting to ${format} is not yet available.`,
        });
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-muted/30">
                    <FormattingToolbar />
                    <div className="flex items-center gap-2">
                         <Button variant="outline" onClick={handleCopyToClipboard}><Copy className="mr-2 h-4 w-4" /> Copy</Button>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button><Download className="mr-2 h-4 w-4" /> Export</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleExport('Markdown')}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    <span>Markdown</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport('HTML')}>
                                    <FileType className="mr-2 h-4 w-4" />
                                    <span>HTML</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport('PDF')}>
                                    <FileDown className="mr-2 h-4 w-4" />
                                    <span>PDF</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleExport('DOCX')}>
                                    <FileCode className="mr-2 h-4 w-4" />
                                    <span>DOCX</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-8 md:p-12 bg-card">
                    <div
                        ref={editorRef}
                        className="document-content max-w-none"
                        dangerouslySetInnerHTML={{ __html: document }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
