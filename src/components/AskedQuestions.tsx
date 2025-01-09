import  { useState } from "react";

const AskedQuestions = () => {
  const faqData = [
    {
      question: "What is a task management system?",
      answer:
        "A task management system helps organize, track, and manage tasks efficiently, ensuring deadlines and priorities are met.",
    },
    {
      question: "How do I add a new task?",
      answer:
        "Navigate to the 'Add Task' section, fill in the task details, and click 'Save' to add a new task to your list.",
    },
    {
      question: "Can I assign tasks to other team members?",
      answer:
        "Yes, you can assign tasks by selecting a team member from the 'Assign To' dropdown when creating or editing a task.",
    },
  ];

  // State to track which answers are shown
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);

  // Toggle visibility of an answer
  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Hide the answer
        : [...prev, index] // Show the answer
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">FAQs</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <button
                onClick={() => toggleAnswer(index)}
                className="text-sm font-medium px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              >
                {visibleAnswers.includes(index) ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
            {visibleAnswers.includes(index) && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AskedQuestions;
