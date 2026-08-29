import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In | Alpha Academy" },
      { name: "description", content: "Sign in to the Alpha Academy admin dashboard." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-sm rounded-2xl border border-border bg-card p-8 shadow-card">
        <h1 className="text-2xl font-bold">Administrator</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Admin authentication will be built here.
        </p>
      </div>
    </main>
  );
}
