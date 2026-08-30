import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { loadCandidate } from "@/lib/assessment-session";
import { downloadCertificate } from "@/lib/generate-certificate";
import { Button } from "@/components/ui/button";
import { BrandHeader } from "@/components/BrandHeader";

// Note: If the file you found is a .lazy.tsx file, change "createFileRoute" to "createLazyFileRoute" in the import and below!
export const Route = createFileRoute("/quiz")({
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<{ fullName: string; category: any } | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Load the candidate details we saved on the previous page
    const user = loadCandidate();
    if (!user) {
      navigate({ to: "/assessment" }); // kick them back to start if no data
    } else {
      setCandidate(user);
    }
  }, [navigate]);

  // A quick function to fake a passing score so we can test the certificate
  const handleCompleteTestQuiz = () => {
    setScore(18); // 18/30 is passing (>16)
  };

  const handleDownload = async () => {
    if (!candidate) return;
    setIsGenerating(true);
    try {
      await downloadCertificate(candidate.fullName, candidate.category);
    } catch (error) {
      console.error("Error generating certificate", error);
      alert("Failed to generate certificate. Please ensure images are in the public/certificates folder.");
    }
    setIsGenerating(false);
  };

  if (!candidate) return null;

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader subtitle={`${candidate.category} Assessment`} />
      
      <main className="mx-auto max-w-2xl px-6 py-12 text-center">
        {score === null ? (
          // --- QUIZ VIEW ---
          <div className="space-y-8 mt-10">
            <h1 className="font-display text-3xl font-bold">Welcome, {candidate.fullName}!</h1>
            <p className="text-muted-foreground">
              You selected the <strong>{candidate.category}</strong> track. 
              <br/>(This is a placeholder page. Click below to simulate completing and passing the assessment).
            </p>
            
            <Button onClick={handleCompleteTestQuiz} size="lg" className="mt-8">
              Simulate Passing Score (18/30)
            </Button>
          </div>
        ) : (
          // --- RESULTS VIEW ---
          <div className="space-y-8 mt-10 p-10 border rounded-2xl bg-card shadow-sm">
            <h1 className="font-display text-4xl font-bold text-primary">Congratulations!</h1>
            <h2 className="text-2xl font-semibold">You scored {score} / 30</h2>
            <p className="text-muted-foreground">
              You successfully passed the {candidate.category} Masterclass. 
              Your certificate of completion is ready.
            </p>

            <Button 
              onClick={handleDownload} 
              size="lg" 
              className="mt-6 text-lg px-8 py-6"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating PDF..." : "Download My Certificate"}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}