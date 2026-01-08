"use client";

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';

export default function AboutHelpPage() {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen text-text-DEFAULT">
      <GlassCard className="max-w-2xl w-full p-8 mb-8">
        <h1 className="text-4xl font-bold mb-6 text-center">About & Help</h1>

        {/* App Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">About TaskFlow Pro</h2>
          <p className="text-lg text-text-DEFAULT text-opacity-80 mb-4">
            TaskFlow Pro is a modern and intuitive task management application designed to help you organize your daily
            tasks efficiently and boost your productivity. With a sleek UI/UX, animated backgrounds, and smooth
            transitions, managing your tasks has never been more enjoyable.
          </p>
          <p className="text-sm text-text-DEFAULT text-opacity-60">
            Version: 1.0.0 (UI/UX Overhaul)
          </p>
        </section>

        {/* User Guide */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">User Guide</h2>
          <p className="text-lg text-text-DEFAULT text-opacity-80 mb-4">
            Get started with TaskFlow Pro by exploring our comprehensive user guide. Learn how to create, manage, and
            track your tasks effectively.
          </p>
          <Link href="/docs/user-guide" passHref>
            <AnimatedButton className="w-full sm:w-auto">
              View User Guide
            </AnimatedButton>
          </Link>
        </section>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {/* Example FAQ Item */}
            <details className="p-4 rounded-lg bg-background/50 cursor-pointer">
              <summary className="font-semibold text-lg">How do I create a new task?</summary>
              <p className="mt-2 text-text-DEFAULT text-opacity-70">
                You can create a new task by clicking the "Create New Task" button on the Dashboard.
                Fill in the details in the modal window and save.
              </p>
            </details>
            <details className="p-4 rounded-lg bg-background/50 cursor-pointer">
              <summary className="font-semibold text-lg">Can I drag and drop tasks?</summary>
              <p className="mt-2 text-text-DEFAULT text-opacity-70">
                Yes, tasks on the Dashboard can be easily reordered or moved between columns using drag and drop functionality.
              </p>
            </details>
          </div>
        </section>

        {/* Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Contact Us</h2>
          <p className="text-lg text-text-DEFAULT text-opacity-80">
            Have questions or need support? Reach out to us at:
          </p>
          <p className="text-lg text-secondary mt-2">support@taskflowpro.com</p>
        </section>
      </GlassCard>
    </div>
  );
}
