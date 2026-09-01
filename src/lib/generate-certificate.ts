import jsPDF from "jspdf";
import { format } from "date-fns";
import QRCode from "qrcode";
import type { Category } from "./assessment.functions";
import { supabase } from "./supabase";

const createUniqueCertId = (name: string): string => {
  const randomString = Math.random().toString(36).substring(2, 7).toUpperCase();
  const cleanName = name.replace(/[^a-zA-Z]/g, "").slice(0, 6).toUpperCase();
  return `AA-${cleanName}-${randomString}`;
};

export const downloadCertificate = async (
  name: string,
  category: Category,
  email?: string
) => {
  let imageUrl = "";
  if (category === "AI FOR STUDENTS") imageUrl = "/certificates/students.png";
  else if (category === "AI FOR ENTREPRENEURS") imageUrl = "/certificates/entrepreneurs.png";
  else if (category === "AI FOR PROFESSIONALS") imageUrl = "/certificates/professionals.png";

  const imgData = await fetch(imageUrl)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        })
    );

  const certId = createUniqueCertId(name);
  const websiteUrl = window.location.origin;
  const verifyUrl = `${websiteUrl}/verify/${certId}`;

  // Save student record to Supabase database
  try {
    await supabase.from("certificates").insert({
      id: certId,
      full_name: name,
      email: email || "",
      category,
      issued_at: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Could not save certificate record to database", err);
  }

  // Generate QR Code
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 200,
    margin: 1,
    color: {
      dark: "#0C145A",
      light: "#FFFFFF",
    },
  });

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

  // Cover hardcoded date with white rectangle
  doc.setFillColor(255, 255, 255);
  doc.rect(28, 177, 80, 12, "F");

  // Write Today's Date
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(12, 20, 90);
  const today = format(new Date(), "MMMM do, yyyy").toUpperCase();
  doc.text(today, 68, 184, { align: "center" });

  // Add QR Code
  const qrSize = 22;
  doc.addImage(qrDataUrl, "PNG", 137, 168, qrSize, qrSize);

  // Add Certificate ID under QR
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text(`ID: ${certId}`, 148, 193, { align: "center" });

  // Download PDF
  doc.save(`${name.replace(/\s+/g, "_")}_Alpha_Academy_Certificate.pdf`);
};