import { useState } from 'react';
import { useFlow } from '../flow/FlowProvider';
import { STRINGS } from '../content/strings';
import { FallingFlowersBackground } from '../components/effects/FallingFlowersBackground';
import { RiddleCard } from '../components/forms/RiddleCard';
import { SparklesOverlay } from '../components/effects/SparklesOverlay';
import { BackToLandingButton } from '../components/controls/BackToLandingButton';

export default function RiddlePage() {
  const { remainingAttempts, goToFinal, goToIntermediate, decrementAttempts } = useFlow();
  const [answer, setAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedAnswer = answer.trim().toLowerCase();
    const correctAnswer = STRINGS.riddle.correctAnswer.toLowerCase();
    
    if (trimmedAnswer === correctAnswer) {
      goToFinal();
    } else {
      decrementAttempts();
      setShowError(true);
      setShake(true);
      
      setTimeout(() => setShake(false), 500);
      
      if (remainingAttempts - 1 <= 0) {
        setTimeout(() => {
          goToIntermediate();
        }, 1500);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <FallingFlowersBackground variant="mixed" speed="normal" />
      <SparklesOverlay />
      <BackToLandingButton />
      
      <div className="relative z-10 w-full max-w-md">
        <RiddleCard
          riddle={STRINGS.riddle.text}
          answer={answer}
          onAnswerChange={setAnswer}
          onSubmit={handleSubmit}
          showError={showError}
          errorMessage={STRINGS.riddle.wrongMessage}
          shake={shake}
          remainingAttempts={remainingAttempts}
        />
      </div>
    </div>
  );
}
