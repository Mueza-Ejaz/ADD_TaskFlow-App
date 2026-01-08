"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import AnimatedButton from "@/components/ui/AnimatedButton"; // Use AnimatedButton

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative z-10 flex w-full h-screen items-center justify-center p-4"> {/* Center content */}
      <div className="w-full max-w-md rounded-lg bg-surface backdrop-blur-md border border-opacity-20 border-white-500 shadow-lg p-8 text-text-DEFAULT"> {/* Use glassmorphism classes */}
          <h1 className="mb-6 text-center text-3xl font-bold">Log In</h1>
          <form onSubmit={handleSignIn}>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-gray-700 text-text-DEFAULT placeholder-gray-400" // Apply dark theme input styles
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50 border-gray-700 text-text-DEFAULT placeholder-gray-400" // Apply dark theme input styles
              />
            </div>
            <AnimatedButton type="submit" className="w-full"> {/* Use AnimatedButton */}
              Log In
            </AnimatedButton>
          </form>
          <p className="mt-4 text-center text-sm text-text-DEFAULT text-opacity-80"> {/* Use text-text-DEFAULT */}
            Don't have an account?{" "}
            <a href="/signup" className="text-secondary hover:underline"> {/* Use secondary color */}
              Sign Up
            </a>
          </p>
        </div>
      </div>
  );
}
