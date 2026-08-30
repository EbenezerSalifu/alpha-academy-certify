import jsPDF from "jspdf";
import { format } from "date-fns";
import type { Category } from "./assessment.functions";

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
  let imageUrl = "";
  if (category === "AI FOR STUDENTS") imageUrl = "/certificates/students.png";
  else if (category === "AI FOR ENTREPRENEURS") imageUrl = "/certificates/entrepreneurs.png";
  else if (category === "AI FOR PROFESSIONALS") imageUrl = "/certificates/professionals.png";

  const imgData = await loadImage(imageUrl);

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // A4 Landscape dimensions: 297mm width x 210mm height
  doc.addImage(imgData, "PNG", 0, 0, 297, 210);

  // 1. Candidate Name (Centered over the underline at X = 82.5mm)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(12, 20, 90);
  doc.text(name.toUpperCase(), 82.5, 112, { align: "center" });

  // 2. White rectangle to block out the old hardcoded date "SEPTEMBER 5TH, 2026"
  doc.setFillColor(255, 255, 255);
  // (X=28mm, Y=177mm, Width=80mm, Height=12mm)
  doc.rect(28, 177, 80, 12, "F");

  // 3. Write Today's Date cleanly over the white box
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(12, 20, 90);
  const today = format(new Date(), "MMMM do, yyyy").toUpperCase();
  doc.text(today, 68, 184, { align: "center" });

  // 4. Download PDF
  doc.save(`${name.replace(/\s+/g, "_")}_Alpha_Academy_Certificate.pdf`);
};