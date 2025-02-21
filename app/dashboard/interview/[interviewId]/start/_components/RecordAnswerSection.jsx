"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { sql } from "drizzle-orm";

function RecordAnswerSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    timeout: 10000000,
    crossBrowser: true,
    speechRecognitionProperties: {
      interimResults: true,
      continuous: true,
    },
  });

  useEffect(() => {
    if (error) {
      toast.error("Error with recording. Please try again.");
      console.error(error);
      setButtonDisabled(false);
      setIsProcessing(false);
    }
  }, [error]);

  // Handle recording results
  useEffect(() => {
    if (isRecording && results?.length > 0) {
      const latestResult = results[results.length - 1]?.transcript || "";
      setUserAnswer((prev) => {
        if (!prev.includes(latestResult)) {
          return (prev + " " + latestResult).trim();
        }
        return prev;
      });
    }
  }, [results, isRecording]);

  // Handle recording state changes
  useEffect(() => {
    const handleRecordingStateChange = async () => {
      if (!isRecording && userAnswer?.length > 10 && !isProcessing) {
        setIsProcessing(true);
        await UpdateUserAnswer();
      }
      setButtonDisabled(false);
    };

    handleRecordingStateChange();
  }, [isRecording]);

  const StartStopRecording = useCallback(async () => {
    try {
      setButtonDisabled(true);

      if (isRecording) {
        await stopSpeechToText();
      } else {
        setUserAnswer("");
        setResults([]);
        setIsProcessing(false);
        await startSpeechToText();
      }

      // Add a small delay before enabling the button
      setTimeout(() => setButtonDisabled(false), 1000);
    } catch (err) {
      toast.error("Failed to toggle recording. Please try again.");
      console.error(err);
      setButtonDisabled(false);
    }
  }, [isRecording, startSpeechToText, stopSpeechToText]);

  const UpdateUserAnswer = async () => {
    if (!userAnswer?.trim()) {
      setIsProcessing(false);
      return;
    }

    try {
      setLoading(true);
      const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ",Depends on question and user answer for give interview question " +
        " please give us rating for answer and feedback as area of improvmenet if any " +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      // First try to find if an answer already exists for this question
      const existingAnswer = await db.select().from(UserAnswer)
        .where(sql`${UserAnswer.mockIdRef} = ${interviewData?.mockId} 
          AND ${UserAnswer.question} = ${mockInterviewQuestion[activeQuestionIndex]?.question}
          AND ${UserAnswer.userEmail} = ${user?.primaryEmailAddress?.emailAddress}`);

      let resp;

      if (existingAnswer && existingAnswer.length > 0) {
        // Update existing answer
        resp = await db.update(UserAnswer).set({
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          createdAt: moment().format("DD-MM-yyyy"),
        }).where(sql`${UserAnswer.mockIdRef} = ${interviewData?.mockId} 
            AND ${UserAnswer.question} = ${mockInterviewQuestion[activeQuestionIndex]?.question}
            AND ${UserAnswer.userEmail} = ${user?.primaryEmailAddress?.emailAddress}`);

        toast.success("Answer updated successfully");
      } else {
        // Insert new answer
        resp = await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp?.feedback,
          rating: JsonFeedbackResp?.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        });

        toast.success("New answer recorded successfully");
      }

      if (resp) {
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      toast.error("Failed to process answer. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
      setIsProcessing(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-[#3C2915] rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 500,
            width: 500,
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={buttonDisabled || loading || isProcessing}
        variant="outline"
        className={`my-10 ${
          isRecording
            ? "bg-red-50 text-red-600"
            : "bg-[#FFFAF0]/70 text-[#6B4423] border-[#E6D5C1]"
        }`}
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
      {(isProcessing || loading) && (
        <p className="text-sm text-gray-500 animate-pulse">
          {loading ? "Processing your answer..." : "Stopping recording..."}
        </p>
      )}
      {userAnswer && (
        <div className="mt-4 p-4 bg-[#FFFAF0]/70 backdrop-blur-sm rounded-lg max-w-2xl w-full border border-[#E6D5C1]">
          <p className="text-sm text-[#6B4423]">Current Answer:</p>
          <p className="text-sm text-[#3C2915]">{userAnswer}</p>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;
