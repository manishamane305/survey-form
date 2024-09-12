import React, { useState } from 'react';
import './index.css';
import Survey from './Survey';
import ThankYou from './ThankYou';

const App = () => {
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  const handleSurveyCompletion = () => {
    setSurveyCompleted(true);
    setTimeout(() => setSurveyCompleted(false), 5000);  
  };

  return (
    <div className="App">
      {!surveyCompleted ? (
        <Survey onComplete={handleSurveyCompletion} />
      ) : (
        <ThankYou />
      )}
    </div>
  );
};

export default App;