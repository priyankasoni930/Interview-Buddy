import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  return (
    <div className="border border-[#E6D5C1] shadow-sm rounded-lg p-3 bg-[#FFFAF0]/70 backdrop-blur-sm hover:shadow-md transition-all duration-300">
      <h2 className="font-bold text-[#3C2915]">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-[#6B4423]">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-[#A98B73]">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          size="sm"
          variant="outline"
          className="w-full border-[#E6D5C1] text-[#6B4423] hover:bg-[#8B9D77]/10"
          onClick={onFeedbackPress}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-[#8B9D77] hover:bg-[#8B9D77]/90 text-[#FFFAF0]"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;
