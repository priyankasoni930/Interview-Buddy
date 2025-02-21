import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function InterviewItemCard({ interview, onDelete }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedbackPress = () => {
    router.push("/dashboard/interview/" + interview.mockId + "/feedback");
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await db
        .delete(MockInterview)
        .where(eq(MockInterview.mockId, interview.mockId));

      toast.success("Interview deleted successfully");
      onDelete && onDelete(interview.mockId);
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Failed to delete interview");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <div className="border border-[#E6D5C1] shadow-sm rounded-lg p-3 bg-[#FFFAF0]/70 backdrop-blur-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="font-bold text-[#3C2915]">
              {interview?.jobPosition}
            </h2>
            <h2 className="text-sm text-[#6B4423]">
              {interview?.jobExperience} Years of Experience
            </h2>
            <h2 className="text-xs text-[#A98B73]">
              Created At: {interview.createdAt}
            </h2>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => setShowDeleteDialog(true)}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
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

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#FFFAF0]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Interview</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this interview? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#FFFAF0] text-[#6B4423] border-[#E6D5C1]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default InterviewItemCard;
