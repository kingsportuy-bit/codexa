'use client';

import { useState, useCallback } from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploaderProps {
    accept: string;
    maxSize?: number; // in MB
    onFileSelect: (file: File) => void;
    label: string;
    description?: string;
    currentFile?: File | null;
}

export default function FileUploader({
    accept,
    maxSize = 10,
    onFileSelect,
    label,
    description,
    currentFile
}: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setIsDragging(true);
        }
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.size <= maxSize * 1024 * 1024) {
                onFileSelect(file);
            } else {
                alert(`El archivo es muy grande. Máximo ${maxSize}MB`);
            }
        }
    }, [maxSize, onFileSelect]);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.size <= maxSize * 1024 * 1024) {
                onFileSelect(file);
            } else {
                alert(`El archivo es muy grande. Máximo ${maxSize}MB`);
            }
        }
    };

    const removeFile = () => {
        onFileSelect(null as any);
    };

    return (
        <div>
            <label className="block text-sm font-semibold mb-2">{label}</label>
            {description && <p className="text-xs text-white/50 mb-3">{description}</p>}

            {currentFile ? (
                <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                            <p className="text-sm font-medium">{currentFile.name}</p>
                            <p className="text-xs text-white/50">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    </div>
                    <button
                        onClick={removeFile}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div
                    onDragEnter={handleDragIn}
                    onDragLeave={handleDragOut}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
                            ? 'border-accent bg-accent/10'
                            : 'border-white/20 hover:border-accent/50 hover:bg-white/5'
                        }
          `}
                >
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileInput}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-accent' : 'text-white/30'}`} />
                    <p className="text-sm font-medium mb-1">
                        Arrastra tu archivo o haz click para seleccionar
                    </p>
                    <p className="text-xs text-white/40">Máximo {maxSize}MB</p>
                </div>
            )}
        </div>
    );
}
