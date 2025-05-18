"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, User, ArrowRight } from 'lucide-react';

interface Message {
  id: number;
  sender: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

interface InterviewSessionPageProps {
  params: {
    interviewId: string;
  };
}

const InterviewSessionPage = ({ params }: InterviewSessionPageProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [interviewData, setInterviewData] = useState<any>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompleteButton, setShowCompleteButton] = useState(false);
  
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
          { id: 1, question: 'Design a front-end architecture for a large-scale e-commerce application that needs to support millions of products and users. Consider performance optimization, state management, and component structure.', category: 'System Design' },
          { id: 2, question: 'Implement a solution for detecting a cycle in a linked list.', category: 'DSA' },
          { id: 3, question: 'Describe a situation where you had to make a difficult technical decision with limited information.', category: 'Behavioral' }
        ]
      };
      
      setInterviewData(mockData);
      
      // Initialize the chat with the first question
      setMessages([
        {
          id: 1,
          sender: 'ai',
          content: mockData.questions[0].question,
          timestamp: new Date()
        }
      ]);
      
      setLoading(false);
      
      // Show the complete button after 5 messages (for demo purposes)
      setTimeout(() => {
        setShowCompleteButton(true);
      }, 5000);
    }, 1000);
  }, [params.interviewId]);
  
  const handleBackToOverview = () => {
    router.push(`/mockmaster/interview/${params.interviewId}`);
  };
  
  const handleCompleteInterview = () => {
    router.push(`/mockmaster/interview/${params.interviewId}/feedback`);
  };
  
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Add user message to chat
      const userMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: userInput,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setUserInput('');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add AI response
      let aiResponse: string;
      
      if (messages.length === 1) {
        aiResponse = "Good start. Can you elaborate on how you would handle state management for such a large application?";
      } else if (messages.length === 3) {
        aiResponse = "That's a solid approach. What about performance optimization techniques specific to React components?";
      } else {
        aiResponse = "Excellent point. How would you implement code-splitting and lazy loading in this architecture?";
      }
      
      const aiMessage: Message = {
        id: messages.length + 2,
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Update progress
      const newProgress = Math.min(100, Math.round(((messages.length + 2) / 8) * 100));
      setInterviewData({
        ...interviewData,
        progress: newProgress
      });
      
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
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
      <div className="px-4 lg:px-8 mb-4 flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBackToOverview}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Interview Overview
        </Button>
        
        {showCompleteButton && (
          <Button 
            onClick={handleCompleteInterview}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
          >
            Complete Interview
          </Button>
        )}
      </div>
      
      <div className="px-4 lg:px-8">
        <div className="rounded-lg shadow-lg bg-white p-8 h-[600px] flex flex-col">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">Mock Interview: {interviewData.currentStage}</h2>
            <p className="text-sm text-gray-600">{interviewData.role} at {interviewData.company}</p>
          </div>
          
          <div className="flex-grow overflow-auto mb-4 space-y-4 p-2">
            {messages.map((message) => (
              message.sender === 'ai' ? (
                <div key={message.id} className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 p-2 rounded-full">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="ml-3 bg-gray-100 rounded-lg p-3 max-w-3xl">
                    <p className="text-gray-800">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div key={message.id} className="flex items-start justify-end">
                  <div className="mr-3 bg-purple-600 text-white rounded-lg p-3 max-w-3xl">
                    <p>{message.content}</p>
                  </div>
                  <div className="bg-gray-200 p-2 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              )
            ))}
          </div>
          
          <div className="border-t pt-4 flex">
            <input 
              type="text" 
              className="flex-grow p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-500 focus:outline-none" 
              placeholder="Type your response..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSubmitting}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!userInput.trim() || isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 rounded-r-md"
            >
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSessionPage;