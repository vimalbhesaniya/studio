'use client';

import { useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Copy, Download, FileText, FileType, FileDown, FileCode } from 'lucide-react';
import FormattingToolbar from './formatting-toolbar';
import { useToast } from '@/hooks/use-toast';
import TurndownService from 'turndown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import htmlToDocx from 'html-to-docx';

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
    
    const handleExport = async (format: 'Markdown' | 'HTML' | 'PDF' | 'DOCX') => {
        if (!editorRef.current) return;

        const content = editorRef.current.innerHTML;
        const title = "document";

        try {
            switch (format) {
                case 'Markdown': {
                    const turndownService = new TurndownService();
                    const markdown = turndownService.turndown(content);
                    const blob = new Blob([markdown], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${title}.md`;
                    a.click();
                    URL.revokeObjectURL(url);
                    break;
                }
                case 'HTML': {
                    const blob = new Blob([content], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${title}.html`;
                    a.click();
                    URL.revokeObjectURL(url);
                    break;
                }
                case 'PDF': {
                    const canvas = await html2canvas(editorRef.current);
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF({
                        orientation: 'p',
                        unit: 'px',
                        format: [canvas.width, canvas.height]
                    });
                    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                    pdf.save(`${title}.pdf`);
                    break;
                }
                case 'DOCX': {
                    const fileBuffer = await htmlToDocx(content, undefined, {
                        footer: true,
                        header: true,
                        pageNumber: true,
                    });
                    const blob = new Blob([fileBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${title}.docx`;
                    a.click();
                    URL.revokeObjectURL(url);
                    break;
                }
            }
            toast({ title: `Exported as ${format}` });
        } catch (error) {
            console.error(`Failed to export as ${format}:`, error);
            toast({
                title: 'Export Failed',
                description: `There was an error exporting the document to ${format}.`,
                variant: 'destructive',
            });
        }
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
