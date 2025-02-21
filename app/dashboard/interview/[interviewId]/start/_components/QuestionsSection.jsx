import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, Your browser does not support text to speech");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="p-5 border border-[#E6D5C1] rounded-lg my-10 bg-[#FFFAF0]/70 backdrop-blur-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                className={`p-2 border border-[#E6D5C1] rounded-full
                text-xs md:text-sm text-center cursor-pointer
                ${
                  activeQuestionIndex == index
                    ? "bg-[#8B9D77] text-[#FFFAF0]"
                    : "bg-[#FFFAF0]/50 text-[#6B4423]"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg text-[#3C2915]">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>
        <Volume2
          className="cursor-pointer text-[#6B4423]"
          onClick={() =>
            textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)
          }
        />

        <div className="border border-[#E6D5C1] rounded-lg p-5 bg-[#FFFAF0]/50 mt-20">
          <h2 className="flex gap-2 items-center text-[#8B9D77]">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-[#6B4423] my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
}

export default QuestionsSection;
