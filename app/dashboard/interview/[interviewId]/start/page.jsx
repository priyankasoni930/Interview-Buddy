"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInterviewDetails();
  }, [params.interviewId]); // Added dependency

  const parseInterviewData = (jsonString) => {
    try {
      // Remove any leading/trailing whitespace and clean the JSON string
      const cleanedString = jsonString
        .trim()
        .replace(/^\s*```json\s*/, "") // Remove leading ```json
        .replace(/\s*```\s*$/, ""); // Remove trailing ```

      const parsedData = JSON.parse(cleanedString);

      // Validate the structure of the parsed data
      if (!Array.isArray(parsedData)) {
        throw new Error("Interview data must be an array of questions");
      }

      return parsedData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.log("Raw JSON string:", jsonString);
      throw new Error("Failed to parse interview questions");
    }
  };

  const getInterviewDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (!result || result.length === 0) {
        throw new Error("Interview not found");
      }

      const jsonMockResp = parseInterviewData(result[0].jsonMockResp);

      // Validate that we have questions
      if (jsonMockResp.length === 0) {
        throw new Error("No questions found for this interview");
      }

      setMockInterviewQuestion(jsonMockResp);
      setInterviewData(result[0]);
    } catch (error) {
      console.error("Error fetching interview data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircle className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading interview questions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
        <p className="mb-4">
          There was an error loading the interview questions.
        </p>
        <Link href="/dashboard">
          <Button variant="secondary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  if (!mockInterviewQuestion || !interviewData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <p>No interview data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/Audio Recording Section */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
            variant="outline"
          >
            Previous Question
          </Button>
        )}

        {activeQuestionIndex < mockInterviewQuestion.length - 1 ? (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        ) : (
          <Link href={`/dashboard/interview/${interviewData.mockId}/feedback`}>
            <Button className="bg-green-600 hover:bg-green-700">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
