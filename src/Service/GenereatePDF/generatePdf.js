import { PDFDocument, rgb } from 'pdf-lib';
import demo_pdf from "../../assets/demo_pdf.pdf"

export async function modifyPdf() {
  // Fetch the original PDF (replace with the actual path to your uploaded PDF)
  const existingPdfBytes = await fetch('src\assets\demo_pdf.pdf').then(res => res.arrayBuffer());

  // Load the existing PDF
  const existingPdf = await PDFDocument.load(existingPdfBytes);

  // Create a new PDF document
  const newPdfDoc = await PDFDocument.create();

  // Copy pages from the existing PDF into the new PDF
  const [copiedPage] = await newPdfDoc.copyPages(existingPdf, [0]);

  // Add the copied page to the new document
  newPdfDoc.addPage(copiedPage);

  // Get the first page of the new document
  const pages = newPdfDoc.getPages();
  const firstPage = pages[0];

  // Modify existing fields (Override name, internship domain, etc.)
  firstPage.drawText('Name: John Doe', { x: 50, y: 550, size: 24, color: rgb(0, 0, 0) });
  firstPage.drawText('Internship Domain: Web Development', { x: 50, y: 500, size: 20, color: rgb(0, 0, 0) });

  // Add new fields (Start Date, End Date, Certificate ID)
  firstPage.drawText('Start Date: 01/01/2024', { x: 50, y: 450, size: 20, color: rgb(0, 0, 0) });
  firstPage.drawText('End Date: 01/06/2024', { x: 50, y: 400, size: 20, color: rgb(0, 0, 0) });
  firstPage.drawText('Certificate ID: ABC12345', { x: 50, y: 350, size: 20, color: rgb(0, 0, 0) });

  // Serialize the new PDFDocument to bytes (Uint8Array)
  const pdfBytes = await newPdfDoc.save();

  // Trigger the download of the new modified PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'new-modified-certificate.pdf';
  link.click();
}



