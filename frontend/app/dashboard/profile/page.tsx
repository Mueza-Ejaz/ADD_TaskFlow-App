"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard'; // Glassmorphism card
import StatisticsCard from '@/components/ui/StatisticsCard'; // Animated statistics
import { Input } from '@/components/ui/Input'; // Assuming Input component exists
import AnimatedButton from '@/components/ui/AnimatedButton'; // Animated button
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import("@/components/ui/Modal").then((mod) => mod.Modal), {
  loading: () => <p className="hidden">Loading modal...</p>,
  ssr: false,
});

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userName, setUserName] = useState(session?.user?.name || '');
  const [userEmail, setUserEmail] = useState(session?.user?.email || '');
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme preference

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-text-DEFAULT">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend API
    console.log("Profile updated:", { userName, userEmail });
    setIsEditModalOpen(false);
    // Optionally, refresh session or update local state
    // For now, just close modal
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Here, you would typically dispatch an action to a global theme context
    // or update a global state/localStorage to persist the theme.
    console.log("Theme toggled. Dark mode:", !isDarkMode);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen text-text-DEFAULT">
      <GlassCard className="max-w-xl w-full text-center p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">User Profile</h1>
        <p className="text-xl mb-2"><strong>Name:</strong> {session.user?.name || 'N/A'}</p>
        <p className="text-xl mb-6"><strong>Email:</strong> {session.user?.email || 'N/A'}</p>
        
        <AnimatedButton onClick={() => setIsEditModalOpen(true)} className="mt-4 mr-2">
          Edit Profile
        </AnimatedButton>

        {/* Theme Preferences Toggle */}
        <AnimatedButton onClick={toggleTheme} className="mt-4 ml-2">
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </AnimatedButton>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        <StatisticsCard label="Total Tasks" value={120} /> {/* Placeholder values */}
        <StatisticsCard label="Completed Tasks" value={95} /> {/* Placeholder values */}
        <StatisticsCard label="Pending Tasks" value={25} /> {/* Placeholder values */}
      </div>

      <DynamicModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Profile">
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-DEFAULT text-opacity-80 mb-1">Name</label>
            <Input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-background/50 border-gray-700 text-text-DEFAULT placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-DEFAULT text-opacity-80 mb-1">Email</label>
            <Input
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
              className="w-full bg-background/50 border-gray-700 text-text-DEFAULT placeholder-gray-400"
            />
          </div>
          <AnimatedButton type="submit" className="w-full">
            Save Changes
          </AnimatedButton>
        </form>
      </DynamicModal>
    </div>
  );
}