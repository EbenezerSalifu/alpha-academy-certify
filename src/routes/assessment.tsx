import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Start Assessment | Alpha Academy" },
      { name: "description", content: "Begin your Alpha Academy AI Skills Assessment." },
    ],
  }),
  component: AssessmentStart,
});

function AssessmentStart() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-bold">Start Assessment</h1>
        <p className="mt-4 text-muted-foreground">
          The assessment flow will be built here. Choose your track and begin your 30-question exam.
        </p>
      </div>
    </main>
  );
}
