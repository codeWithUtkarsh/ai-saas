"use client";

import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronRight } from "lucide-react";

interface InterviewCardProps {
  id: number;
  role: string;
  company: string;
  progress: number;
  date: string;
  onContinue?: (id: number) => void;
  onView?: (id: number) => void;
}

export const InterviewCard = ({
  id,
  role,
  company,
  progress,
  date,
  onContinue,
  onView
}: InterviewCardProps) => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{role}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <span>{date}</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Preparation Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-purple-600 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onView?.(id)}>
          View Details
        </Button>
        <Button onClick={() => onContinue?.(id)} className="gap-1">
          Continue <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};