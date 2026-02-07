import { useFlow } from '../flow/FlowProvider';
import { STRINGS } from '../content/strings';
import { FallingFlowersBackground } from '../components/effects/FallingFlowersBackground';
import { HandwrittenNoteCard } from '../components/note/HandwrittenNoteCard';
import { SessionImageUpload } from '../components/media/SessionImageUpload';
import { FloatingHearts } from '../components/effects/FloatingHearts';
import { BackToLandingButton } from '../components/controls/BackToLandingButton';

export default function FinalPage() {
  const { finalPhoto, setFinalPhoto } = useFlow();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      <FallingFlowersBackground variant="roses-only" speed="slow" />
      <BackToLandingButton />
      
      <div className="relative z-10 max-w-2xl w-full">
        <HandwrittenNoteCard note={STRINGS.final.note} />
        
        <div className="mt-12 relative">
          <FloatingHearts />
          <p className="text-xl font-handwritten text-pink-600 text-center mb-6">
            this is for you
          </p>
          <SessionImageUpload
            photo={finalPhoto}
            onPhotoChange={setFinalPhoto}
            label="Upload her photo"
          />
        </div>
      </div>
      
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-pink-600/70">
        © 2026. Built with 💗 using{' '}
        <a
          href="https://caffeine.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-700 transition-colors underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
