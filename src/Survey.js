import React, { useState, useEffect } from 'react';
import Question from './Question';

const surveyQuestions = [
  { id: 1, text: "How satisfied are you with our products?", type: "rating", scale: 5 },
  { id: 2, text: "How fair are the prices compared to similar retailers?", type: "rating", scale: 5 },
  { id: 3, text: "How satisfied are you with the value for money of your purchase?", type: "rating", scale: 5 },
  { id: 4, text: "On a scale of 1-10 how would you recommend us to your friends and family?", type: "rating", scale: 10 },
  { id: 5, text: "What could we do to improve our service?", type: "text" }
];

const Survey = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const savedSession = localStorage.getItem('sessionId');
    const savedAnswers = localStorage.getItem('answers');

    if (savedSession && savedAnswers) {
      setSessionId(savedSession);
      setAnswers(JSON.parse(savedAnswers));
    } else {
      const newSessionId = `session-${Date.now()}`;
      setSessionId(newSessionId);
      localStorage.setItem('sessionId', newSessionId);
    }
  }, []);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    localStorage.setItem('answers', JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const confirmed = window.confirm('Are you sure you want to submit the survey?');
    if (confirmed) {
      localStorage.setItem('surveyStatus', 'COMPLETED');
      
      localStorage.setItem('previousAnswers', JSON.stringify(answers));
      
      setAnswers({});
      localStorage.removeItem('answers');
      
      onComplete(); 
      
      
      setTimeout(() => {
        window.location.reload();  
      }, 5000);
    }
  };

  const currentQuestion = surveyQuestions[currentQuestionIndex];
  
  return (
    <div className="survey-container">
      <h2>Customer Survey</h2>
      <p>{currentQuestionIndex + 1}/{surveyQuestions.length}</p>
      <Question 
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
      />
      <div className="navigation-buttons">
        <button className="prev-button" onClick={handlePrev} disabled={currentQuestionIndex === 0}>Prev</button>
        {currentQuestionIndex === surveyQuestions.length - 1 ? (
          <button className="next-button" onClick={handleSubmit}>Submit</button>
        ) : (
          <button className="next-button" onClick={handleNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default Survey;
