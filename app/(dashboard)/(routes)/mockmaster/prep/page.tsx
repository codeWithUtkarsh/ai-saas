"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/mockmaster/heading';
import { Button } from '@/components/ui/button';
import { PlusIcon, CheckIcon, PlusCircleIcon } from 'lucide-react';

const InterviewPrepPage = () => {
  const router = useRouter();
  
  // Sample data
  const activeInterviews = [
    { id: 1, role: 'Senior Frontend Developer', company: 'TechCorp', progress: 70, date: 'May 20, 2025' },
    { id: 2, role: 'Data Scientist', company: 'AnalyticsPro', progress: 30, date: 'May 25, 2025' }
  ];
  
  const recentActivities = [
    { 
      id: 1, 
      type: 'completed', 
      title: 'Completed System Design practice', 
      time: '2 hours ago',
      icon: CheckIcon
    },
    { 
      id: 2, 
      type: 'created', 
      title: 'Created new mock interview', 
      time: 'Yesterday',
      icon: PlusCircleIcon
    }
  ];
  
  const handleContinuePrep = (id: number) => {
    console.log(`Continue preparation for interview ${id}`);
    // Navigate directly to the interview overview
    router.push(`/mockmaster/interview/${id}`);
  };
  
  const handleCreateNewInterview = () => {
    router.push('/mockmaster/create');
  };
  
  return (
    <div className="pb-8">
      <Heading 
        title="Interview Preparation"
        description="Track and manage your interview preparations"
      />
      
      <div className="px-4 lg:px-8">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Interview Prep</h2>
            <Button 
              onClick={handleCreateNewInterview}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              New Interview
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Active Preparations</h3>
              <div className="space-y-4">
                {activeInterviews.map(interview => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow transition">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{interview.role}</h4>
                        <p className="text-sm text-gray-600">{interview.company} · Interview on {interview.date}</p>
                      </div>
                      <Button 
                        onClick={() => handleContinuePrep(interview.id)}
                        variant="outline"
                        className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 py-1 px-3 rounded-md text-sm h-auto"
                      >
                        Continue
                      </Button>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{interview.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${interview.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Recent Activity</h3>
              <div className="border border-gray-200 rounded-lg divide-y">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="p-3 flex items-center">
                    <div className={`${activity.type === 'completed' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} p-2 rounded`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrepPage;