"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/mockmaster/heading';
import { InterviewCard } from '@/components/mockmaster/interview-card';
import { Button } from '@/components/ui/button';

const MockMasterScreens = () => {
  const router = useRouter();
  
  // Sample data
  const stages = [
    { id: 'dsa', name: 'Data Structures & Algorithms', selected: true },
    { id: 'system', name: 'System Design', selected: true },
    { id: 'language', name: 'Programming Language', selected: false },
    { id: 'behavioral', name: 'Behavioral Questions', selected: true },
    { id: 'team', name: 'Team Compatibility', selected: false }
  ];
  
  const activeInterviews = [
    { id: 1, role: 'Senior Frontend Developer', company: 'TechCorp', progress: 70, date: 'May 20, 2025' },
    { id: 2, role: 'Data Scientist', company: 'AnalyticsPro', progress: 30, date: 'May 25, 2025' }
  ];
  
  const questions = [
    { id: 1, question: 'Design a distributed caching system for a high-traffic e-commerce application.', category: 'System Design' },
    { id: 2, question: 'Implement a solution for detecting a cycle in a linked list.', category: 'DSA' },
    { id: 3, question: 'Describe a situation where you had to make a difficult technical decision with limited information.', category: 'Behavioral' }
  ];
  
  const handleContinueInterview = (id: number) => {
    console.log(`Continue interview ${id}`);
    router.push(`/mockmaster/interview/${id}`);
  };
  
  const handleViewInterview = (id: number) => {
    console.log(`View interview ${id}`);
    // Navigation logic would go here
  };
  
  const handleCreateInterview = () => {
    router.push('/mockmaster/create');
  };
  
  return (
    <div className="flex flex-col space-y-12 w-full h-full p-6 bg-gray-50">
      {/* Welcome Section */}
      <div className="rounded-lg shadow-lg bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to MockMaster</h2>
        <div className="mx-auto max-w-md">
          <div className="flex justify-center mb-8">
            <img src="/api/placeholder/200/200" alt="MockMaster Logo" className="rounded-full bg-blue-100 p-4" />
          </div>
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-medium">Ace your next interview with personalized AI preparation</h3>
            <p className="text-gray-600">Create customized mock interviews based on real job descriptions</p>
            <div className="flex flex-col space-y-3">
              <Button onClick={handleCreateInterview} className="bg-purple-600 hover:bg-purple-700 text-white">Create New Interview</Button>
              <Button 
                variant="outline" 
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
                onClick={() => router.push('/mockmaster/prep')}
              >
                Continue Preparation
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Active Interviews Section */}
      {activeInterviews.length > 0 && (
        <div className="rounded-lg shadow-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-6">Your Active Interviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                id={interview.id}
                role={interview.role}
                company={interview.company}
                progress={interview.progress}
                date={interview.date}
                onContinue={handleContinueInterview}
                onView={handleViewInterview}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Recent Questions Section */}
      {questions.length > 0 && (
        <div className="rounded-lg shadow-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Practice Questions</h2>
          <div className="space-y-4">
            {questions.map((question) => (
              <div key={question.id} className="p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{question.question}</p>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">{question.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MockMasterPage = () => {
  return (
    <div>
      <Heading 
        title="MockMaster" 
        description="Your AI-powered interview preparation assistant"
      />
      <MockMasterScreens />
    </div>
  );
};

export default MockMasterPage;