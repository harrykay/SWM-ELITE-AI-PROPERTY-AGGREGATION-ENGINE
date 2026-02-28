import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X } from 'lucide-react';

export const ImageUploader = ({ files, onDrop, onRemoveFile }) => {
  const onDropCallback = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback, accept: { 'image/*': [] } });

  return (
    <div>
      <div 
        {...getRootProps()} 
        className={`p-10 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-green-500 bg-green-500/10' : 'border-gray-600 hover:border-green-500'
        }`}>
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
        <p className="mt-2 text-sm text-gray-400">
          {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
        </p>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img src={file.preview} alt="" className="h-full w-full object-cover" />
            <button 
              onClick={() => onRemoveFile(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
