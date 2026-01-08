"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard'; // Glassmorphism card
import AnimatedButton from '@/components/ui/AnimatedButton'; // Animated button
import { Input } from '@/components/ui/Input'; // Assuming Input component exists

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('dark'); // 'dark' or 'light'

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen text-text-DEFAULT">
        <p className="text-lg">Loading settings...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Settings saved:", { notificationsEnabled, selectedTheme });
    // In a real app, send to backend
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen text-text-DEFAULT">
      <GlassCard className="max-w-2xl w-full p-8 mb-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Settings</h1>

        <form onSubmit={handleSaveChanges} className="space-y-8">
          {/* Account Settings */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-DEFAULT text-opacity-80 mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={session.user?.email || ''}
                  disabled
                  className="w-full bg-background/30 border-gray-700 text-text-DEFAULT placeholder-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <AnimatedButton onClick={() => console.log('Change password clicked')} className="w-full sm:w-auto">
                  Change Password
                </AnimatedButton>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Notification Preferences</h2>
            <div className="flex items-center justify-between">
              <label htmlFor="notifications" className="text-lg font-medium">Enable Notifications</label>
              <input
                type="checkbox"
                id="notifications"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="toggle toggle-primary" // Assuming you have a custom toggle style or use a library
              />
            </div>
          </section>

          {/* Theme Customization */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Theme Customization</h2>
            <div className="flex items-center space-x-4">
              <label htmlFor="theme" className="text-lg font-medium">Select Theme:</label>
              <select
                id="theme"
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="p-2 rounded-md bg-background/50 border border-gray-700 text-text-DEFAULT"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>
          </section>

          {/* Export/Import Functionality (Placeholder) */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Data Management</h2>
            <p className="text-text-DEFAULT text-opacity-70 mb-4">
              Manage your task data. Export your tasks for backup or import new tasks.
            </p>
            <div className="flex space-x-4">
              <AnimatedButton onClick={() => console.log('Export clicked')}>
                Export Data
              </AnimatedButton>
              <AnimatedButton onClick={() => console.log('Import clicked')}>
                Import Data
              </AnimatedButton>
            </div>
          </section>

          <AnimatedButton type="submit" className="w-full">
            Save Changes
          </AnimatedButton>
        </form>
      </GlassCard>
    </div>
  );
}
