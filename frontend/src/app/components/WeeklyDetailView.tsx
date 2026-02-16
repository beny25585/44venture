import { ArrowLeft } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { Button } from './ui/button';
import { brands } from '../data/mockData';

interface WeeklyDetailViewProps {
  topic: any;
  onBack: () => void;
}

const relatedTopics = [
  {
    id: 'r1',
    title: 'Similar Trending Content',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop',
  },
  {
    id: 'r2',
    title: 'Related Meme Format',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=400&h=400&fit=crop',
  },
  {
    id: 'r3',
    title: 'Viral Social Post',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=500&fit=crop',
  },
];

const suggestedMemes = [
  {
    id: 'm1',
    image: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=300&h=300&fit=crop',
  },
  {
    id: 'm2',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=300&h=300&fit=crop',
  },
  {
    id: 'm3',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=400&fit=crop',
  },
  {
    id: 'm4',
    image: 'https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=300&h=300&fit=crop',
  },
];

export function WeeklyDetailView({ topic, onBack }: WeeklyDetailViewProps) {
  const brand = brands.find(b => b.id === topic.category);

  return (
    <div>
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Calendar
      </Button>

      {/* Featured Image */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img
          src={topic.image}
          alt={topic.title}
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Topic Information */}
      <div className="mb-8">
        <div
          className="inline-block px-4 py-2 rounded-full text-sm mb-4"
          style={{ backgroundColor: brand?.color || '#2E2E2E', color: '#FFFFFF' }}
        >
          {brand?.name}
        </div>
        <h1 className="text-4xl mb-4" style={{ color: '#2E2E2E' }}>{topic.title}</h1>
        <p className="text-lg" style={{ color: '#575757' }}>{topic.description}</p>
      </div>

      {/* Related Trending Topics */}
      <div className="mb-8">
        <h2 className="text-2xl mb-4" style={{ color: '#2E2E2E' }}>Related Trending Topics</h2>
        <p className="mb-6" style={{ color: '#575757' }}>
          Get inspired by these related trending topics from across the web
        </p>
        <div className="grid grid-cols-3 gap-4">
          {relatedTopics.map(item => (
            <div
              key={item.id}
              className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all border"
              style={{ borderColor: '#C4C4C4' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 style={{ color: '#2E2E2E' }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Memes */}
      <div>
        <h2 className="text-2xl mb-4" style={{ color: '#2E2E2E' }}>Suggested Memes</h2>
        <p className="mb-6" style={{ color: '#575757' }}>
          Meme templates and formats that could work well for this topic
        </p>
        <Masonry columnsCount={4} gutter="16px">
          {suggestedMemes.map(meme => (
            <div
              key={meme.id}
              className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              <img
                src={meme.image}
                alt="Meme template"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
