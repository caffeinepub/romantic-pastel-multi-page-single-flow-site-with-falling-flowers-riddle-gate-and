import { Input } from '@/components/ui/input';
import { RomanticButton } from '../controls/RomanticButton';

interface RiddleCardProps {
  riddle: string;
  answer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  showError: boolean;
  errorMessage: string;
  shake: boolean;
  remainingAttempts: number;
}

export function RiddleCard({
  riddle,
  answer,
  onAnswerChange,
  onSubmit,
  showError,
  errorMessage,
  shake,
  remainingAttempts,
}: RiddleCardProps) {
  return (
    <div className="relative z-10 max-w-2xl w-full">
      <div
        className={`bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200 ${
          shake ? 'animate-shake' : ''
        }`}
      >
        <p className="text-xl md:text-2xl text-pink-800 mb-8 leading-relaxed font-handwritten text-center">
          {riddle}
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            type="text"
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Your answer..."
            className="text-lg p-6 rounded-2xl border-2 border-pink-300 focus:border-pink-500 focus:ring-pink-500"
            disabled={remainingAttempts <= 0}
          />

          {showError && (
            <p className="text-center text-pink-600 font-handwritten text-lg animate-fade-in">
              {errorMessage}
            </p>
          )}

          <div className="flex justify-center">
            <RomanticButton type="submit" disabled={remainingAttempts <= 0}>
              Submit
            </RomanticButton>
          </div>
        </form>
      </div>
    </div>
  );
}
