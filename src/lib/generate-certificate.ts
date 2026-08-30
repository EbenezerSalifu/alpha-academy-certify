import jsPDF from "jspdf";
import { format } from "date-fns";
import QRCode from "qrcode";
import type { Category } from "./assessment.functions";

// Function that creates a unique ID like "AA-EBENSALI-K9X2P"
const createUniqueCertId = (name: string): string => {
  const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
  const cleanName = name.replace(/[^a-zA-Z]/g, "").slice(0, 6).toUpperCase();
  return `AA-${cleanName}-${randomString}`;
};

export const downloadCertificate = async (name: string, category: Category) => {
  // 1. Pick background image
  let imageUrl = "";
  if (category === "AI FOR STUDENTS") imageUrl = "/certificates/students.png";
  else if (category === "AI FOR ENTREPRENEURS") imageUrl = "/certificates/entrepreneurs.png";
  else if (category === "AI FOR PROFESSIONALS") imageUrl = "/certificates/professionals.png";

  const imgData = await fetch(imageUrl).then(res => res.blob()).then(blob => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  });

  // 2. Create Unique Certificate ID & Link
  const certId = createUniqueCertId(name);
  const verifyUrl = `https://alphaacademy.com/verify?id=${certId}`;

  // 3. Convert that link into a QR Code image
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 200,
    margin: 1,
    color: {
      dark: "#0C145A", // Matching dark blue
      light: "#FFFFFF",
    },
  });

  // 4. Create the PDF
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  // Draw Background Image
  doc.addImage(imgData, "PNG", 0, 0, 297, 210);

  // Write Student Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(12, 20, 90);
  doc.text(name.toUpperCase(), 82.5, 112, { align: "center" });

  // Cover old hardcoded date with white rectangle
  doc.setFillColor(255, 255, 255);
  doc.rect(28, 177, 80, 12, "F");

  // Write Today's Date
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(12, 20, 90);
  const today = format(new Date(), "MMMM do, yyyy").toUpperCase();
  doc.text(today, 68, 184, { align: "center" });

  // Add QR Code (Positioned between Date and Founder Signature)
  const qrSize = 22; // 22mm x 22mm
  doc.addImage(qrDataUrl, "PNG", 137, 168, qrSize, qrSize);

  // Write the Certificate ID text directly under the QR code
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(`ID: ${certId}`, 148, 193, { align: "center" });

  // Save the PDF
  doc.save(`${name.replace(/\s+/g, "_")}_Alpha_Academy_Certificate.pdf`);
};