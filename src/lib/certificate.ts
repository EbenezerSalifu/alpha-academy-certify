/** Client-side rendering of the candidate's name onto the official template. */
export async function renderCertificate(
  templateDataUrl: string,
  fullName: string,
): Promise<HTMLCanvasElement> {
  const image = new Image();
  image.src = templateDataUrl;
  await image.decode();

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth * scale;
  canvas.height = image.naturalHeight * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported in this browser.");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // The blank name line sits under "THIS IS TO CERTIFY THAT" (template is 1080x763).
  const centerX = (332 / 1080) * canvas.width;
  const baselineY = (404 / 763) * canvas.height;
  const maxWidth = (430 / 1080) * canvas.width;

  let fontSize = (34 / 763) * canvas.height;
  ctx.fillStyle = "#0a1046";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const setFont = (size: number) => {
    ctx.font = `600 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
  };
  setFont(fontSize);
  while (ctx.measureText(fullName).width > maxWidth && fontSize > 10) {
    fontSize -= 1;
    setFont(fontSize);
  }
  ctx.fillText(fullName, centerX, baselineY, maxWidth);

  return canvas;
}

export function downloadCanvasAsPng(canvas: HTMLCanvasElement, fileName: string) {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = `${fileName}.png`;
  link.click();
}

export async function downloadCanvasAsPdf(canvas: HTMLCanvasElement, fileName: string) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: canvas.width >= canvas.height ? "landscape" : "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
    compress: true,
  });
  pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${fileName}.pdf`);
}
