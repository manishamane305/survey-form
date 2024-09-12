import React from 'react';

const Question = ({ question, answer, onAnswer }) => {
  const handleRatingSelect = (value) => {
    onAnswer(question.id, value);
  };

  return (
    <div>
      <p>
        <span className="question-number">{question.id}.</span> {question.text}
      </p>
      {question.type === 'rating' && (
        <div className="rating-buttons">
          {Array.from({ length: question.scale }, (_, i) => i + 1).map((value) => (
            <button
              key={value}
              className={answer === value ? 'selected' : ''}
              onClick={() => handleRatingSelect(value)}
            >
              {value}
            </button>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />
      )}
    </div>
  );
};

export default Question;
