import { useFlow } from '../flow/FlowProvider';
import { STRINGS } from '../content/strings';
import { FallingFlowersBackground } from '../components/effects/FallingFlowersBackground';
import { FloralTitle } from '../components/typography/FloralTitle';
import { RomanticButton } from '../components/controls/RomanticButton';
import { SparklesOverlay } from '../components/effects/SparklesOverlay';

export default function LandingPage() {
  const { goToRiddle } = useFlow();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FallingFlowersBackground variant="mixed" speed="normal" />
      <SparklesOverlay />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <FloralTitle className="mb-6">
          {STRINGS.landing.title}
        </FloralTitle>
        
        <p className="text-2xl md:text-3xl text-pink-700 mb-12 font-medium tracking-wide">
          {STRINGS.landing.subtitle}
        </p>
        
        <RomanticButton onClick={goToRiddle} size="lg">
          {STRINGS.landing.button}
        </RomanticButton>
      </div>
    </div>
  );
}
