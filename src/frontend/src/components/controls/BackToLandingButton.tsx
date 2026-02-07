import { ArrowLeft } from 'lucide-react';
import { useFlow } from '../../flow/FlowProvider';
import { RomanticButton } from './RomanticButton';

export function BackToLandingButton() {
  const { goToLanding } = useFlow();

  return (
    <div className="fixed top-4 left-4 z-50">
      <RomanticButton
        onClick={goToLanding}
        size="sm"
        className="flex items-center gap-2"
        aria-label="Back to landing page"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back</span>
      </RomanticButton>
    </div>
  );
}
