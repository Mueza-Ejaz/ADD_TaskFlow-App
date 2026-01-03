"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button"; // Assuming Button component exists

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading dashboard...</div>;
  }

  if (!session) {
    router.push("/login"); // Redirect if not authenticated, though middleware should handle this
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard, {session.user?.name || session.user?.email}!</h1>
        <p className="text-gray-700 mb-6">This is a protected area. You are logged in.</p>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">User Information:</h2>
          <p><strong>Email:</strong> {session.user?.email}</p>
          <p><strong>User ID:</strong> {session.user?.id}</p>
          {session.accessToken && <p><strong>Access Token (partial):</strong> {session.accessToken.substring(0, 10)}...</p>}
        </div>

        <Button onClick={() => signOut({ callbackUrl: "/login" })} className="bg-red-500 hover:bg-red-600">
          Log Out
        </Button>
      </div>
    </div>
  );
}
