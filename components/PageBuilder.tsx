import React, { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableComponent from './PageBuilderComponents';

export const PageBuilder = ({ content, onContentChange }) => {
  const [items, setItems] = useState(content || []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        onContentChange(newItems);
        return newItems;
      });
    }
  };

  const addComponent = (type) => {
    const newComponent = { id: Date.now(), type, content: {} };
    const newItems = [...items, newComponent];
    setItems(newItems);
    onContentChange(newItems);
  };

  const handleComponentContentChange = (id, newContent) => {
    const newItems = items.map(item => item.id === id ? { ...item, content: newContent } : item);
    setItems(newItems);
    onContentChange(newItems);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <div className="flex gap-4 mb-4">
        <button onClick={() => addComponent('hero')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Hero</button>
        <button onClick={() => addComponent('text')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Text</button>
        <button onClick={() => addComponent('image')} className="bg-blue-500 text-white px-4 py-2 rounded">Add Image</button>
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div>
            {items.map(item => (
              <DraggableComponent 
                key={item.id} 
                id={item.id} 
                type={item.type} 
                content={item.content} 
                onContentChange={(newContent) => handleComponentContentChange(item.id, newContent)} 
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
