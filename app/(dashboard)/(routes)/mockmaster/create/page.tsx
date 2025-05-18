"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/mockmaster/heading';
import { Button } from '@/components/ui/button';

const CreateInterviewPage = () => {
  const router = useRouter();
  
  // Define initial stages
  const initialStages = [
    { id: 'dsa', name: 'Data Structures & Algorithms', selected: true },
    { id: 'system', name: 'System Design', selected: true },
    { id: 'language', name: 'Programming Language', selected: false },
    { id: 'behavioral', name: 'Behavioral Questions', selected: true },
    { id: 'team', name: 'Team Compatibility', selected: false }
  ];
  
  // Form state management
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
  });
  
  const [stages, setStages] = useState(initialStages);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle stage selection
  const handleStageToggle = (stageId: string) => {
    setStages(stages.map(stage => 
      stage.id === stageId ? { ...stage, selected: !stage.selected } : stage
    ));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send data to an API
      console.log({
        ...formData,
        stages: stages.filter(stage => stage.selected).map(stage => stage.id)
      });
      
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate directly to the newly created interview overview
      // In a real app, the ID would come from the API response
      const newInterviewId = Math.floor(Math.random() * 1000) + 1; // Generate a random ID for demo purposes
      router.push(`/mockmaster/interview/${newInterviewId}`);
    } catch (error) {
      console.error('Error generating interview:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="pb-8">
      <Heading 
        title="Create Your Mock Interview"
        description="Generate an AI-powered mock interview based on the job description"
      />
      
      <div className="px-4 lg:px-8">
        <div className="rounded-lg shadow-lg bg-white p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
              <input 
                id="jobTitle"
                name="jobTitle"
                type="text" 
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                placeholder="e.g., Senior Software Engineer" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
              <input 
                id="companyName"
                name="companyName"
                type="text" 
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                placeholder="e.g., Google" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
              <textarea 
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-purple-500 focus:outline-none" 
                placeholder="Paste the job description here..."
                required
              ></textarea>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Select Interview Stages</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stages.map(stage => (
                  <div 
                    key={stage.id} 
                    className={`p-3 border rounded-md flex items-center cursor-pointer ${
                      stage.selected ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                    }`}
                    onClick={() => handleStageToggle(stage.id)}
                  >
                    <input 
                      type="checkbox" 
                      id={`stage-${stage.id}`}
                      checked={stage.selected} 
                      onChange={() => handleStageToggle(stage.id)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" 
                    />
                    <label 
                      htmlFor={`stage-${stage.id}`}
                      className="ml-2 text-sm text-gray-700 w-full cursor-pointer"
                    >
                      {stage.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Generating...' : 'Generate Interview'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateInterviewPage;