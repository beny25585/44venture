import { X, TrendingUp, BarChart3, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { brands } from '../data/mockData';

interface RightDrawerProps {
  content: any;
  onClose: () => void;
  onClaim: (contentId: string) => void;
}

export function RightDrawer({ content, onClose, onClaim }: RightDrawerProps) {
  const brand = brands.find(b => b.id === content.category);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 w-2/5 bg-white shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between" style={{ borderColor: '#C4C4C4' }}>
          <h2 className="text-xl" style={{ color: '#2E2E2E' }}>Content Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" style={{ color: '#2E2E2E' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <img
            src={content.image}
            alt={content.title}
            className="w-full rounded-lg mb-6"
          />

          {/* Title and Category */}
          <div className="mb-6">
            <div
              className="inline-block px-3 py-1 rounded-full text-sm mb-3"
              style={{ backgroundColor: brand?.color || '#2E2E2E', color: '#FFFFFF' }}
            >
              {brand?.name}
            </div>
            <h2 className="text-2xl mb-2" style={{ color: '#2E2E2E' }}>{content.title}</h2>
            <p style={{ color: '#575757' }}>
              This content is currently trending and ready to be claimed by a content editor.
              View the stats below to understand its viral potential.
            </p>
          </div>

          {/* Source Links */}
          <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#F5F5F5' }}>
            <h3 className="mb-2" style={{ color: '#2E2E2E' }}>Source</h3>
            <a
              href={content.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {content.source}
            </a>
          </div>

          {/* Stats Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-lg" style={{ color: '#2E2E2E' }}>Analytics</h3>
            
            <div className="p-4 rounded-lg border" style={{ borderColor: '#C4C4C4' }}>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5" style={{ color: brand?.color }} />
                <h4 style={{ color: '#2E2E2E' }}>Google Trends</h4>
              </div>
              <p style={{ color: '#575757' }}>{content.trends}</p>
            </div>

            <div className="p-4 rounded-lg border" style={{ borderColor: '#C4C4C4' }}>
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="w-5 h-5" style={{ color: brand?.color }} />
                <h4 style={{ color: '#2E2E2E' }}>Chartbeat Metrics</h4>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-2xl" style={{ color: '#2E2E2E' }}>12.5K</p>
                  <p className="text-sm" style={{ color: '#575757' }}>Views</p>
                </div>
                <div>
                  <p className="text-2xl" style={{ color: '#2E2E2E' }}>850</p>
                  <p className="text-sm" style={{ color: '#575757' }}>Shares</p>
                </div>
                <div>
                  <p className="text-2xl" style={{ color: '#2E2E2E' }}>3.2K</p>
                  <p className="text-sm" style={{ color: '#575757' }}>Comments</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border" style={{ borderColor: '#C4C4C4' }}>
              <div className="flex items-center gap-3 mb-3">
                <Tag className="w-5 h-5" style={{ color: brand?.color }} />
                <h4 style={{ color: '#2E2E2E' }}>Trending SEO Keywords</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.seoKeywords.map((keyword: string) => (
                  <span
                    key={keyword}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{ backgroundColor: '#F5F5F5', color: '#2E2E2E' }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onClaim(content.id)}
            className="w-full h-12 text-lg"
            style={{ backgroundColor: brand?.color || '#2E2E2E', color: '#FFFFFF' }}
          >
            Claim This Topic
          </Button>
        </div>
      </div>
    </>
  );
}
