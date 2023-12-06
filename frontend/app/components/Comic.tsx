import React from 'react';

interface ComicProps {
  comics: Array<{
    id: number;
    url: string;
    alt_text: string;
    title: string;
  }>;
}

const Comic: React.FC<ComicProps> = ({ comics }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {comics.map((comic) => (
        <div key={comic.id} className="bg-white p-4 rounded-lg shadow-md">
          <img
            src={comic.url}
            alt={comic.alt_text}
            className="max-h-48 mx-auto"
          />
          <div className="text-center text-gray-700 mt-2">{comic.title} #{comic.id}</div>
          <div className="text-center text-gray-500 mt-2">alt text: {comic.alt_text}</div>
        </div>
      ))}
    </div>
  );
};

export default Comic;