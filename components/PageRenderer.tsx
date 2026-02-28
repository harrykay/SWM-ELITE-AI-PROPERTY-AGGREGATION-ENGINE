import React from 'react';

const HeroSection = ({ content }) => (
  <div className="bg-gray-800 text-white p-8">
    <h1 className="text-4xl font-bold">{content.title}</h1>
  </div>
);

const TextBlock = ({ content }) => (
  <div className="p-8">
    <p>{content.text}</p>
  </div>
);

const ImageSection = ({ content }) => (
  <div className="p-8">
    <img src={content.src} alt="" className="w-full" />
  </div>
);

const PageRenderer = ({ content }) => {
  if (!Array.isArray(content)) {
    return <div>Invalid page content</div>;
  }

  return (
    <div>
      {content.map(item => {
        switch (item.type) {
          case 'hero':
            return <HeroSection key={item.id} content={item.content} />;
          case 'text':
            return <TextBlock key={item.id} content={item.content} />;
          case 'image':
            return <ImageSection key={item.id} content={item.content} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PageRenderer;
