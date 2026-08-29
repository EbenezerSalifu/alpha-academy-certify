import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Briefcase, GraduationCap, Lightbulb } from "lucide-react";
import { BrandHeader } from "@/components/BrandHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES, type Category } from "@/lib/assessment.functions";
import { saveCandidate } from "@/lib/assessment-session";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Start Assessment | Alpha Academy" },
      {
        name: "description",
        content:
          "Register and choose your Alpha Academy AI assessment track — Students, Entrepreneurs or Professionals.",
      },
      { property: "og:title", content: "Start Assessment | Alpha Academy" },
      {
        property: "og:description",
        content: "Register and choose your Alpha Academy AI assessment track.",
      },
    ],
  }),
  component: AssessmentStart,
});

const tracks: { category: Category; icon: typeof GraduationCap; blurb: string }[] = [
  {
    category: "AI FOR STUDENTS",
    icon: GraduationCap,
    blurb: "Study smarter with AI research, writing and learning tools.",
  },
  {
    category: "AI FOR ENTREPRENEURS",
    icon: Lightbulb,
    blurb: "Build, market and scale a venture with practical AI systems.",
  },
  {
    category: "AI FOR PROFESSIONALS",
    icon: Briefcase,
    blurb: "Apply AI to workplace productivity, analysis and strategy.",
  },
];

function AssessmentStart() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; category?: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    const name = fullName.trim();
    const mail = email.trim();
    if (name.length < 2) next.fullName = "Please enter your full name (as it should appear on the certificate).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) next.email = "Please enter a valid email address.";
    if (!category) next.category = "Select an assessment track to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    saveCandidate({ fullName: name, email: mail, category: category as Category });
    navigate({ to: "/quiz" });
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandHeader subtitle="Candidate Registration" />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Start your assessment
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Enter your details, choose a track, and answer 30 multiple-choice questions. You need more
          than 50% (at least 16 correct) to earn your certificate.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-10" noValidate>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ama Boateng"
                autoComplete="name"
              />
              {errors.fullName ? (
                <p className="text-sm text-destructive">{errors.fullName}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
            </div>
          </div>

          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">Choose your track</legend>
            <div className="grid gap-4 md:grid-cols-3">
              {tracks.map(({ category: value, icon: Icon, blurb }) => {
                const selected = category === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setCategory(value)}
                    aria-pressed={selected}
                    className={`rounded-2xl border p-5 text-left transition ${
                      selected
                        ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/40"
                        : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <p className="mt-3 font-display text-sm font-bold tracking-tight">{value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
                  </button>
                );
              })}
            </div>
            {errors.category ? <p className="text-sm text-destructive">{errors.category}</p> : null}
            <p className="sr-only">{CATEGORIES.join(", ")}</p>
          </fieldset>

          <Button type="submit" size="lg">
            Begin assessment
          </Button>
        </form>
      </main>
    </div>
  );
}
