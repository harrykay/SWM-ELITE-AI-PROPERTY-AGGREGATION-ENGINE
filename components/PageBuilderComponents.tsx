import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DraggableComponent = ({ id, type, content, onContentChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderComponent = () => {
    switch (type) {
      case 'hero':
        return <HeroSection content={content} onContentChange={onContentChange} />;
      case 'text':
        return <TextBlock content={content} onContentChange={onContentChange} />;
      case 'image':
        return <ImageSection content={content} onContentChange={onContentChange} />;
      default:
        return <div>Unknown component type</div>;
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-4 bg-gray-800 my-2 rounded-lg text-white">
      {renderComponent()}
    </div>
  );
};

const HeroSection = ({ content, onContentChange }) => (
  <div>
    <h2 className="text-2xl">Hero Section</h2>
    <input 
      type="text" 
      value={content.title || ''} 
      onChange={(e) => onContentChange({ ...content, title: e.target.value })}
      className="w-full bg-gray-700 p-2 rounded mt-2"
      placeholder="Hero Title"
    />
  </div>
);

const TextBlock = ({ content, onContentChange }) => (
  <div>
    <h2 className="text-2xl">Text Block</h2>
    <textarea 
      value={content.text || ''} 
      onChange={(e) => onContentChange({ ...content, text: e.target.value })}
      className="w-full bg-gray-700 p-2 rounded mt-2"
      placeholder="Enter text..."
    />
  </div>
);

const ImageSection = ({ content, onContentChange }) => (
  <div>
    <h2 className="text-2xl">Image Section</h2>
    <input 
      type="text" 
      value={content.src || ''} 
      onChange={(e) => onContentChange({ ...content, src: e.target.value })}
      className="w-full bg-gray-700 p-2 rounded mt-2"
      placeholder="Image URL"
    />
  </div>
);

export default DraggableComponent;
