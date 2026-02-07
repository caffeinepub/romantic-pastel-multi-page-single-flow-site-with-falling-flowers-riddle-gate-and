import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

type FlowStep = 'landing' | 'riddle' | 'intermediate' | 'final';

interface FlowContextType {
  currentStep: FlowStep;
  remainingAttempts: number;
  intermediatePhoto: string | null;
  finalPhoto: string | null;
  goToRiddle: () => void;
  goToIntermediate: () => void;
  goToFinal: () => void;
  goToLanding: () => void;
  decrementAttempts: () => void;
  setIntermediatePhoto: (photo: string) => void;
  setFinalPhoto: (photo: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<FlowStep>(() => {
    const saved = sessionStorage.getItem('flowStep');
    return (saved as FlowStep) || 'landing';
  });
  
  const [remainingAttempts, setRemainingAttempts] = useState(() => {
    const saved = sessionStorage.getItem('remainingAttempts');
    return saved ? parseInt(saved, 10) : 2;
  });
  
  const [intermediatePhoto, setIntermediatePhotoState] = useState<string | null>(() => {
    return sessionStorage.getItem('intermediatePhoto');
  });
  
  const [finalPhoto, setFinalPhotoState] = useState<string | null>(() => {
    return sessionStorage.getItem('finalPhoto');
  });

  useEffect(() => {
    sessionStorage.setItem('flowStep', currentStep);
  }, [currentStep]);

  useEffect(() => {
    sessionStorage.setItem('remainingAttempts', remainingAttempts.toString());
  }, [remainingAttempts]);

  const goToRiddle = useCallback(() => setCurrentStep('riddle'), []);
  const goToIntermediate = useCallback(() => setCurrentStep('intermediate'), []);
  const goToFinal = useCallback(() => setCurrentStep('final'), []);
  
  const goToLanding = useCallback(() => {
    setCurrentStep('landing');
    setRemainingAttempts(2);
  }, []);
  
  const decrementAttempts = useCallback(() => {
    setRemainingAttempts(prev => Math.max(0, prev - 1));
  }, []);

  const setIntermediatePhoto = useCallback((photo: string) => {
    setIntermediatePhotoState(photo);
    sessionStorage.setItem('intermediatePhoto', photo);
  }, []);

  const setFinalPhoto = useCallback((photo: string) => {
    setFinalPhotoState(photo);
    sessionStorage.setItem('finalPhoto', photo);
  }, []);

  return (
    <FlowContext.Provider
      value={{
        currentStep,
        remainingAttempts,
        intermediatePhoto,
        finalPhoto,
        goToRiddle,
        goToIntermediate,
        goToFinal,
        goToLanding,
        decrementAttempts,
        setIntermediatePhoto,
        setFinalPhoto,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within FlowProvider');
  }
  return context;
}
