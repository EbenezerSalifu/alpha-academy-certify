import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { BrandHeader } from "@/components/BrandHeader";

export const Route = createFileRoute("/verify/$certId")({
  component: VerifyPage,
});

type Certificate = {
  id: string;
  full_name: string;
  category: string;
  issued_at: string;
};

function VerifyPage() {
  const { certId } = Route.useParams();
  const [cert, setCert] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchCert() {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("id", certId)
        .maybeSingle();

      if (error || !data) {
        setNotFound(true);
      } else {
        setCert(data as Certificate);
      }
      setLoading(false);
    }
    fetchCert();
  }, [certId]);

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader subtitle="Certificate Verification" />
      <main className="mx-auto max-w-xl px-6 py-16 text-center">
        {loading && <p className="text-muted-foreground">Verifying Certificate...</p>}

        {!loading && notFound && (
          <div className="space-y-4 rounded-2xl border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-destructive">Invalid Certificate</h1>
            <p className="text-muted-foreground">
              No valid certificate was found for ID: <strong>{certId}</strong>
            </p>
          </div>
        )}

        {!loading && cert && (
          <div className="space-y-6 rounded-2xl border bg-card p-8 shadow-sm">
            <div className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-green-700">
              ✓ Verified Authentic
            </div>
            <h1 className="font-display text-3xl font-bold">{cert.full_name}</h1>
            <p className="text-lg text-muted-foreground">
              has successfully completed the
              <br />
              <strong className="text-primary">{cert.category}</strong> Masterclass.
            </p>
            <div className="border-t pt-4 text-xs text-muted-foreground space-y-1">
              <p>
                <strong>Date Issued:</strong>{" "}
                {new Date(cert.issued_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p><strong>Certificate ID:</strong> {cert.id}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}