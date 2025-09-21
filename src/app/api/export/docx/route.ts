import { NextResponse } from 'next/server';
import htmlToDocx from 'html-to-docx';

export async function POST(request: Request) {
  try {
    const { htmlContent } = await request.json();

    if (!htmlContent) {
      return new NextResponse('Bad Request: htmlContent is required', { status: 400 });
    }

    const fileBuffer = await htmlToDocx(htmlContent, undefined, {
      footer: true,
      header: true,
      pageNumber: true,
    });

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename=document.docx',
      },
    });
  } catch (error) {
    console.error('Failed to generate DOCX:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
