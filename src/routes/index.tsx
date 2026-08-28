import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, BadgeCheck, ClipboardList, ShieldCheck, Timer } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Academy | AI Skills Assessment & Certification" },
      {
        name: "description",
        content:
          "Take the Alpha Academy AI Skills Assessment — 30 professional questions, instant scoring, and an official certificate when you pass.",
      },
      { property: "og:title", content: "Alpha Academy | AI Skills Assessment & Certification" },
      {
        property: "og:description",
        content:
          "Test your AI knowledge. Prove your skills. Earn your official Alpha Academy certificate.",
      },
    ],
  }),
  component: Landing,
});

const steps = [
  {
    icon: ClipboardList,
    title: "Register & choose",
    body: "Enter your details and select one of three professional AI assessment tracks.",
  },
  {
    icon: Timer,
    title: "30 questions",
    body: "Answer 30 multiple-choice questions in a focused examination interface.",
  },
  {
    icon: BadgeCheck,
    title: "Instant scoring",
    body: "Your assessment is scored automatically and securely the moment you submit.",
  },
  {
    icon: Award,
    title: "Earn your certificate",
    body: "Score above 50% and download your personalised Alpha Academy certificate.",
  },
];

function Landing() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-hero text-navy-foreground">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:py-28">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-foreground/10 font-display text-xl font-bold ring-1 ring-navy-foreground/20">
              A
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg font-bold tracking-tight">ALPHA ACADEMY</p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-navy-foreground/70">
                From Learning to Leading
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-navy-foreground/20 bg-navy-foreground/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]">
              Official certification
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] sm:text-6xl">AI SKILLS ASSESSMENT</h1>
            <p className="mt-5 max-w-2xl text-lg text-navy-foreground/80 sm:text-xl">
              Test your AI knowledge. Prove your skills. Earn your certificate.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
              Each candidate completes a 30-question multiple-choice assessment in their chosen
              track. Your score is calculated automatically, and candidates who score above 50%
              receive a personalised, verifiable Alpha Academy certificate of completion.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/assessment"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-gradient px-8 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-elevated transition-transform hover:-translate-y-0.5"
              >
                Start Assessment
              </Link>
              <span className="inline-flex items-center gap-2 text-sm text-navy-foreground/70">
                <ShieldCheck className="h-4 w-4" /> Pass mark: above 50%
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-2xl font-bold sm:text-3xl">How the assessment works</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-primary">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {["AI FOR STUDENTS", "AI FOR ENTREPRENEURS", "AI FOR PROFESSIONALS"].map((track) => (
            <div
              key={track}
              className="rounded-2xl border border-border bg-secondary/60 p-6 text-center"
            >
              <p className="font-display text-sm font-bold tracking-wide text-navy">{track}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                30 questions
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-navy py-8 text-navy-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm sm:flex-row">
          <p className="font-display font-semibold">ALPHA ACADEMY</p>
          <p className="text-navy-foreground/60">From Learning to Leading</p>
          <Link to="/auth" className="text-navy-foreground/60 transition-colors hover:text-navy-foreground">
            Administrator
          </Link>
        </div>
      </footer>
    </main>
  );
}
