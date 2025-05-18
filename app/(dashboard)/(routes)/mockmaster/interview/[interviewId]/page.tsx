"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/mockmaster/heading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface InterviewPageProps {
  params: {
    interviewId: string;
  };
}

const InterviewPage = ({ params }: InterviewPageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [interviewData, setInterviewData] = useState<any>(null);

  
  // Fetch interview data
  useEffect(() => {
    // This would normally be an API call
    setTimeout(() => {
      const mockData = {
        id: parseInt(params.interviewId),
        role: 'Senior Frontend Developer',
        company: 'TechCorp',
        progress: 70,
        currentStage: 'System Design',
        generatedDate: 'May 18, 2025',
        questions: [
          { id: 1, question: 'Design a distributed caching system for a high-traffic e-commerce application.', category: 'System Design' },
          { id: 2, question: 'Implement a solution for detecting a cycle in a linked list.', category: 'DSA' },
          { id: 3, question: 'Describe a situation where you had to make a difficult technical decision with limited information.', category: 'Behavioral' }
        ]
      };
      
      setInterviewData(mockData);
      setLoading(false);
    }, 1000);
  }, [params.interviewId]);
  
  const handleBackToDashboard = () => {
    router.push('/mockmaster/prep');
  };
  
  const handleStartInterview = () => {
    console.log('Starting mock interview session');
    // Navigate to the active interview session
    router.push(`/mockmaster/interview/${params.interviewId}/session`);
  };
  
  const handleModifyInterview = () => {
    console.log('Modifying interview');
    // Logic to modify the interview would go here
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading interview session...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="pb-8">
      <div className="px-4 lg:px-8 mb-4">
        <Button 
          variant="outline" 
          onClick={handleBackToDashboard}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="px-4 lg:px-8">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <h2 className="text-2xl font-bold mb-2">{interviewData.role}</h2>
          <p className="text-gray-600 mb-6">{interviewData.company} · Interview Generated {interviewData.generatedDate}</p>
          
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <p className="text-sm text-purple-800">
                Based on the job description, we've created a customized interview with questions focusing on front-end frameworks, 
                UI/UX principles, and performance optimization.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-px bg-gray-300 flex-grow"></div>
                <span className="px-4 text-gray-500 font-medium">Generated Questions</span>
                <div className="h-px bg-gray-300 flex-grow"></div>
              </div>
              
              {interviewData.questions.map(q => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-2">{q.category}</span>
                      <p className="font-medium">{q.question}</p>
                    </div>
                    <button className="text-purple-600 hover:text-purple-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleModifyInterview}
                className="text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                Modify Interview
              </Button>
              <Button
                onClick={handleStartInterview}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Start Mock Interview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;