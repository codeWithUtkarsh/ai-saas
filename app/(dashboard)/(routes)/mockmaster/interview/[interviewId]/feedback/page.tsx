"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckIcon, ZapIcon, MessageSquareIcon, ShieldIcon, XIcon } from 'lucide-react';

interface FeedbackPageProps {
  params: {
    interviewId: string;
  };
}

const InterviewFeedbackPage = ({ params }: FeedbackPageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<any>(null);

  // Fetch feedback data
  useEffect(() => {
    // This would normally be an API call
    setTimeout(() => {
      const mockData = {
        id: parseInt(params.interviewId),
        role: 'Senior Frontend Developer',
        company: 'TechCorp',
        date: 'May 18, 2025',
        metrics: {
          technicalAccuracy: 82,
          communication: 90,
          problemSolving: 75,
        },
        strengths: [
          'Clear explanation of front-end architecture concepts',
          'Strong understanding of state management approaches',
          'Good communication and structured responses'
        ],
        improvements: [
          'Consider performance metrics and measurement in your answers',
          'Provide more specific examples from past experiences'
        ]
      };
      
      setFeedbackData(mockData);
      setLoading(false);
    }, 1000);
  }, [params.interviewId]);

  const handlePracticeAgain = () => {
    router.push(`/mockmaster/interview/${params.interviewId}`);
  };

  const handleViewDetailedReport = () => {
    // This would normally navigate to a detailed report page
    console.log('View detailed report');
    alert('Detailed report would be shown here');
  };

  const handleBackToDashboard = () => {
    router.push('/mockmaster/prep');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-500 rounded-full border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your feedback...</p>
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
          Back to Dashboard
        </Button>
      </div>
      
      <div className="px-4 lg:px-8">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
              <CheckIcon className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">Interview Complete</h2>
            <p className="text-gray-600">Here's how you performed in your mock interview</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-2">
                    <ZapIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="font-bold text-2xl">{feedbackData.metrics.technicalAccuracy}%</p>
                  <p className="text-sm text-gray-600">Technical Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-2">
                    <MessageSquareIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="font-bold text-2xl">{feedbackData.metrics.communication}%</p>
                  <p className="text-sm text-gray-600">Communication</p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-2">
                    <ShieldIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="font-bold text-2xl">{feedbackData.metrics.problemSolving}%</p>
                  <p className="text-sm text-gray-600">Problem Solving</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Strengths</h3>
              <ul className="space-y-2">
                {feedbackData.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Areas for Improvement</h3>
              <ul className="space-y-2">
                {feedbackData.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <XIcon className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleViewDetailedReport}
                className="text-gray-700 border border-gray-300 hover:bg-gray-50"
              >
                View Detailed Report
              </Button>
              <Button
                onClick={handlePracticeAgain}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6"
              >
                Practice Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewFeedbackPage;