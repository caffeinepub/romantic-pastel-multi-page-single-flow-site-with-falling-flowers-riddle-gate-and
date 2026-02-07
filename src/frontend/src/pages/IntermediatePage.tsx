import { useFlow } from '../flow/FlowProvider';
import { STRINGS } from '../content/strings';
import { SessionImageUpload } from '../components/media/SessionImageUpload';
import { RomanticButton } from '../components/controls/RomanticButton';
import { BackToLandingButton } from '../components/controls/BackToLandingButton';

export default function IntermediatePage() {
  const { goToFinal, intermediatePhoto, setIntermediatePhoto } = useFlow();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100">
      <BackToLandingButton />
      
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-pink-200">
          <SessionImageUpload
            photo={intermediatePhoto}
            onPhotoChange={setIntermediatePhoto}
            label="Upload your photo"
          />
          
          <p className="text-center text-lg text-pink-700 mt-6 mb-8 font-handwritten leading-relaxed">
            {STRINGS.intermediate.message}
          </p>
          
          <div className="flex justify-center">
            <RomanticButton onClick={goToFinal} size="sm">
              {STRINGS.intermediate.button}
            </RomanticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
