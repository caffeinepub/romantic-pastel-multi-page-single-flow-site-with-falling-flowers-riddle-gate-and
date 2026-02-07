import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface SessionImageUploadProps {
  photo: string | null;
  onPhotoChange: (photo: string) => void;
  label: string;
}

export function SessionImageUpload({ photo, onPhotoChange, label }: SessionImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onPhotoChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="relative w-64 h-64 rounded-3xl border-4 border-dashed border-pink-300 hover:border-pink-400 transition-all overflow-hidden group bg-pink-50/50"
      >
        {photo ? (
          <img src={photo} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-pink-400 group-hover:text-pink-500 transition-colors">
            <Upload size={48} className="mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </div>
        )}
      </button>
    </div>
  );
}
