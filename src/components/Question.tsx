// src/Question.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Question: React.FC = () => {
  const [questionData, setQuestionData] = useState<{ question: string; responses: { yes: string; no: string } } | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setQuestionData(data))
      .catch(error => console.error('Error loading JSON data:', error));
  }, []);

  const handleAnswer = (response: boolean) => {
    if (questionData) {
      const responseText = response ? questionData.responses.yes : questionData.responses.no;
      setAnswer(responseText);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      {questionData ? (
        <>
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {questionData.question}
          </motion.h1>
          <div className="space-x-4">
            <motion.button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleAnswer(true)}
            >
              Yes
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              whileHover={{ scale: 1.1 }}
              onClick={() => handleAnswer(false)}
            >
              No
            </motion.button>
          </div>
          {answer && (
            <motion.p 
              className="text-lg font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {answer}
            </motion.p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Question;