interface HandwrittenNoteCardProps {
  note: string;
}

export function HandwrittenNoteCard({ note }: HandwrittenNoteCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-pink-200">
      <p className="text-xl md:text-2xl text-pink-800 leading-relaxed font-handwritten text-center whitespace-pre-wrap">
        {note}
      </p>
    </div>
  );
}
