"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import AnimatedButton from "@/components/ui/AnimatedButton"; // Use AnimatedButton
import AnimatedBackground from "@/components/ui/AnimatedBackground"; // Import AnimatedBackground
import ParticleEffect from "@/components/ui/ParticleEffect"; // Import ParticleEffect

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Call your backend signup API
    const res = await fetch("http://localhost:8001/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, full_name: fullName }),
    });

    if (res.ok) {
      // If signup is successful, try to sign in immediately
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
    } else {
      const errorData = await res.json();
      setError(errorData.detail || "Signup failed");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <AnimatedBackground> {/* Use AnimatedBackground as the main container */}
      <ParticleEffect count={50} /> {/* Add ParticleEffect */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4"> {/* Center content */}
        <div className="w-full max-w-md rounded-lg bg-surface backdrop-blur-md border border-opacity-20 border-white-500 shadow-lg p-8 text-text-DEFAULT"> {/* Use glassmorphism classes */}
          <h1 className="mb-6 text-center text-3xl font-bold">Sign Up</h1>
          <form onSubmit={handleSignUp}>
            {error && <p className="mb-4 text-center text-red-500">{error}</p>}
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Full Name (Optional)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-background/50 border-gray-700 text-text-DEFAULT placeholder-gray-400" // Apply dark theme input styles
              />
            </div>
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
              Sign Up
            </AnimatedButton>
          </form>
          <p className="mt-4 text-center text-sm text-text-DEFAULT text-opacity-80"> {/* Use text-text-DEFAULT */}
            Already have an account?{" "}
            <a href="/login" className="text-secondary hover:underline"> {/* Use secondary color */}
              Log In
            </a>
          </p>
        </div>
      </div>
    </AnimatedBackground>
  );
}
