import jsPDF from "jspdf";
import { format } from "date-fns";
import type { Category } from "./assessment.functions";

// Helper to load the image file as data so jsPDF can use it
const loadImage = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
};

export const downloadCertificate = async (name: string, category: Category) => {
  // 1. Determine which background image to load (Now using .png)
  let imageUrl = "";
  if (category === "AI FOR STUDENTS") imageUrl = "/certificates/students.png";
  else if (category === "AI FOR ENTREPRENEURS") imageUrl = "/certificates/entrepreneurs.png";
  else if (category === "AI FOR PROFESSIONALS") imageUrl = "/certificates/professionals.png";

  const imgData = await loadImage(imageUrl);

  // 2. Create the PDF (A4 size, Landscape)
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // A4 Landscape dimensions: 297mm width x 210mm height
  // Changed "JPEG" to "PNG" here!
  doc.addImage(imgData, "PNG", 0, 0, 297, 210);

  // 3. Add the User's Name onto the blank line
  doc.setFont("helvetica", "bold");
  doc.setFontSize(36);
  doc.setTextColor(12, 20, 90); // Dark blue text
  
  // (297 / 2 = 148.5 which is the exact center of the page). 
  // 112 is the Y-coordinate (height). 
  doc.text(name.toUpperCase(), 148.5, 112, { align: "center" }); 

  // 4. Overwrite the hardcoded "SEPTEMBER 5TH, 2026" date
  // Draw a white rectangle over the old date
  doc.setFillColor(255, 255, 255);
  // (X=40, Y=172, Width=70, Height=10) 
  doc.rect(40, 172, 70, 10, "F"); 

  // 5. Write Today's Date
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  const today = format(new Date(), "MMMM do, yyyy").toUpperCase();
  doc.text(today, 75, 179, { align: "center" });

  // 6. Download the PDF!
  doc.save(`${name.replace(/\s+/g, "_")}_Alpha_Academy_Certificate.pdf`);
};