import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — AkiliAI" },
      { name: "description", content: "Sign in or create your AkiliAI account to start learning with the multilingual AI tutor." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created — welcome to AkiliAI");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: `${window.location.origin}/dashboard` });
    if (result.error) toast.error(result.error.message);
    else if (!result.redirected) navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-md">
        <div className="glass rounded-3xl p-8 shadow-glow">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">
              {mode === "signin" ? "Welcome back" : "Create account"}
            </h1>
          </div>

          <Button onClick={handleGoogle} variant="outline" className="w-full mb-4 glass border-primary/30">
            Continue with Google
          </Button>

          <div className="text-center text-xs text-muted-foreground my-3">or with email</div>

          <form onSubmit={handleEmail} className="space-y-3">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-gradient-hero text-primary-foreground border-0">
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="block w-full text-center mt-5 text-sm text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>

          <Link to="/" className="block text-center text-xs text-muted-foreground mt-4 hover:text-foreground">← Back to home</Link>
        </div>
      </main>
    </div>
  );
}
