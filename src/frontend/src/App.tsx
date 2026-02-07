import { useState, useEffect } from 'react';
import { FlowProvider, useFlow } from './flow/FlowProvider';
import { MusicProvider } from './components/audio/MusicProvider';
import { MusicToggle } from './components/audio/MusicToggle';
import { CursorPetalTrail } from './components/effects/CursorPetalTrail';
import LandingPage from './pages/LandingPage';
import RiddlePage from './pages/RiddlePage';
import IntermediatePage from './pages/IntermediatePage';
import FinalPage from './pages/FinalPage';

function AppContent() {
  const { currentStep } = useFlow();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== displayStep) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayStep(currentStep);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep, displayStep]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CursorPetalTrail />
      <MusicToggle />
      
      <div
        className={`transition-opacity duration-300 ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {displayStep === 'landing' && <LandingPage />}
        {displayStep === 'riddle' && <RiddlePage />}
        {displayStep === 'intermediate' && <IntermediatePage />}
        {displayStep === 'final' && <FinalPage />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <FlowProvider>
        <AppContent />
      </FlowProvider>
    </MusicProvider>
  );
}
