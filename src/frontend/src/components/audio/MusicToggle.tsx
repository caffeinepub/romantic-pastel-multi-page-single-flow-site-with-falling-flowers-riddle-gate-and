import { Music, Volume2 } from 'lucide-react';
import { useMusic } from './MusicProvider';

export function MusicToggle() {
  const { isPlaying, toggle } = useMusic();

  return (
    <button
      onClick={toggle}
      className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 border-2 border-pink-200"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Music className="w-6 h-6 text-pink-600" />
      ) : (
        <Volume2 className="w-6 h-6 text-pink-400 opacity-50" />
      )}
    </button>
  );
}
