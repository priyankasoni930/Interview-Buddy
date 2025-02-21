"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

function InterviewList() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(
          eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(MockInterview.id));

      setInterviewList(result);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (mockId) => {
    setInterviewList((prev) =>
      prev.filter((interview) => interview.mockId !== mockId)
    );
  };

  if (loading) {
    return (
      <div>
        <h2 className="font-bold text-xl text-[#3C2915]">
          Previous Mock Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[100px] w-full bg-[#FFFAF0]/50 animate-pulse rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (!loading && interviewList.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="font-bold text-xl text-[#3C2915] mb-6">
          Previous Mock Interviews
        </h2>
        <div className="max-w-md mx-auto p-6 border rounded-lg bg-[#FFFAF0]/70 backdrop-blur-sm border-[#E6D5C1]">
          <PlusCircle className="w-12 h-12 text-[#6B4423] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#3C2915] mb-2">
            No Previous Interviews
          </h3>
          <p className="text-[#6B4423] mb-4">
            You haven't created any mock interviews yet. Create your first
            interview to get started!
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-[#FFFAF0] bg-[#8B9D77] hover:bg-[#8B9D77]/90"
          >
            Create New Interview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-xl text-[#3C2915]">
        Previous Mock Interviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList.map((interview) => (
          <InterviewItemCard
            interview={interview}
            key={interview.id}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default InterviewList;
