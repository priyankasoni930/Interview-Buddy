"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, [params.interviewId]); // Add dependency to re-fetch when ID changes

  const GetFeedback = async () => {
    try {
      setLoading(true);
      // Get all answers for this interview
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId));

      // Remove duplicates by keeping only the latest answer for each question
      const uniqueFeedback = result.reduce((acc, current) => {
        const existingIndex = acc.findIndex(
          (item) => item.question === current.question
        );

        if (existingIndex === -1) {
          // Question not found, add it
          acc.push(current);
        } else {
          // Question exists, compare dates and keep the latest
          const existing = acc[existingIndex];
          const existingDate = new Date(
            existing.createdAt.split("-").reverse().join("-")
          );
          const currentDate = new Date(
            current.createdAt.split("-").reverse().join("-")
          );

          if (currentDate > existingDate) {
            // Replace with newer answer
            acc[existingIndex] = current;
          }
        }
        return acc;
      }, []);

      // Sort by ID to maintain question order
      uniqueFeedback.sort((a, b) => a.id - b.id);

      setFeedbackList(uniqueFeedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#FFFDF7]/70 rounded w-1/4"></div>
          <div className="h-6 bg-[#FFFDF7]/70 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-[#FFFDF7]/70 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="font-bold text-xl text-gray-500">
            No Interview Feedback Record Found
          </h2>
          <Button onClick={() => router.replace("/dashboard")} className="mt-4">
            Go Home
          </Button>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations!
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-sm text-gray-500 mb-6">
            Find below interview questions with correct answers, your answers,
            and feedback for improvement
          </h2>

          <div className="space-y-4">
            {feedbackList.map((feedback, index) => (
              <div
                key={`${feedback.id}-${index}`}
                className="mb-5 p-4 rounded-lg bg-[#FFFDF7]/70 backdrop-blur-sm border border-[#E8E2D7]"
              >
                <Collapsible>
                  <CollapsibleTrigger className="p-4 bg-[#FFFDF7]/90 rounded-lg flex justify-between items-center w-full hover:bg-[#FFFDF7]">
                    <span className="font-medium text-left">
                      Question {index + 1}: {feedback.question}
                    </span>
                    <ChevronsUpDown className="h-5 w-5 shrink-0" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-3">
                    <div className="p-3 border rounded-lg bg-blue-50/50">
                      <strong className="text-primary block mb-1">
                        Rating:
                      </strong>
                      <span className="text-primary">{feedback.rating}</span>
                    </div>
                    <div className="p-3 border rounded-lg bg-yellow-50/50">
                      <strong className="block mb-1">Your Answer:</strong>
                      <span className="text-gray-700">{feedback.userAns}</span>
                    </div>
                    <div className="p-3 border rounded-lg bg-green-50/50">
                      <strong className="block mb-1">Correct Answer:</strong>
                      <span className="text-gray-700">
                        {feedback.correctAns}
                      </span>
                    </div>
                    <div className="p-3 border rounded-lg bg-purple-50/50">
                      <strong className="block mb-1">Feedback:</strong>
                      <span className="text-gray-700">{feedback.feedback}</span>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button
              onClick={() => router.replace("/dashboard")}
              className="bg-primary hover:bg-primary/90"
            >
              Return to Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
