'use client';

import { useRef, useState } from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Copy,
  Download,
  FileText,
  FileType,
  FileDown,
  FileCode,
  ImageIcon,
} from 'lucide-react';
import FormattingToolbar from './formatting-toolbar';
import { useToast } from '@/hooks/use-toast';
import TurndownService from 'turndown';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface EditorProps {
  document: string;
}

export default function Editor({ document: initialDocument }: EditorProps) {
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [document, setDocument] = useState(initialDocument);

  const handleCopyToClipboard = () => {
    if (editorRef.current) {
      navigator.clipboard
        .writeText(editorRef.current.innerText)
        .then(() => {
          toast({ title: 'Copied to clipboard!' });
        })
        .catch((err) => {
          toast({
            title: 'Failed to copy',
            description: 'Could not copy content to clipboard.',
            variant: 'destructive',
          });
          console.error('Failed to copy text: ', err);
        });
    }
  };

  const handleExport = async (format: 'Markdown' | 'HTML' | 'PDF' | 'DOCX') => {
    if (!editorRef.current) return;

    const content = editorRef.current.innerHTML;
    const title = 'document';

    try {
      switch (format) {
        case 'Markdown': {
          const turndownService = new TurndownService();
          const markdown = turndownService.turndown(content);
          const blob = new Blob([markdown], { type: 'text/markdown' });
          saveAs(blob, `${title}.md`);
          break;
        }
        case 'HTML': {
          const blob = new Blob([content], { type: 'text/html' });
          saveAs(blob, `${title}.html`);
          break;
        }
        case 'PDF': {
          const canvas = await html2canvas(editorRef.current, { 
            scale: 2,
            useCORS: true,
            backgroundColor: window.document.documentElement.classList.contains('dark') ? '#020817' : '#FFFFFF',
          });
          const imgData = canvas.toDataURL('image/png');
        
          const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [canvas.width, canvas.height],
          });
        
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`${title}.pdf`);
          break;
        }
        case 'DOCX': {
          const response = await fetch('/api/export/docx', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ htmlContent: content }),
          });

          if (!response.ok) {
            throw new Error('Failed to generate DOCX file');
          }

          const blob = await response.blob();
          saveAs(blob, `${title}.docx`);
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
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const img = window.document.createElement('img');
          img.src = src;
          img.style.maxWidth = '100%';
          range.insertNode(img);
        } else if (editorRef.current) {
            const img = window.document.createElement('img');
            img.src = src;
            img.style.maxWidth = '100%';
            editorRef.current.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full">
      <header className="p-4 border-b bg-card">
        <div className="flex items-center justify-between">
          <FormattingToolbar />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mr-2 h-4 w-4" /> Add Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <Button variant="outline" onClick={handleCopyToClipboard}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
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
        </div>
      </header>
      <div className="flex-grow flex justify-center p-4 sm:p-8 bg-muted/40 overflow-y-auto">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div
              ref={editorRef}
              className="document-content max-w-none prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: document }}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onInput={(e) => setDocument(e.currentTarget.innerHTML)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
