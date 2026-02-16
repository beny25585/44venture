import { useState } from 'react';
import { X, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TopicDetailPageProps {
  isOpen: boolean;
  onClose: () => void;
  topic: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    sources: string[];
  };
}

export function TopicDetailPage({ isOpen, onClose, topic }: TopicDetailPageProps) {
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = () => {
    setIsClaimed(true);
    // Additional claim logic here
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* Detail Page */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed right-0 top-0 h-full w-[600px] bg-background z-50 overflow-y-auto"
          >
            <div className="relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Section */}
              <div className="relative h-[300px] overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)',
                      fontSize: 'var(--text-label)',
                      fontFamily: 'var(--font-family-body)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    {topic.category}
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 space-y-6">
                {/* Title and Description */}
                <div>
                  <h1
                    className="mb-3"
                    style={{
                      fontSize: 'var(--text-h1)',
                      fontFamily: 'var(--font-family-heading)',
                      fontWeight: 'var(--font-weight-bold)',
                      lineHeight: '1.5'
                    }}
                  >
                    {topic.title}
                  </h1>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      fontFamily: 'var(--font-family-body)',
                      color: 'var(--muted-foreground)',
                      lineHeight: '1.5'
                    }}
                  >
                    {topic.description}
                  </p>
                </div>

                {/* Source Section */}
                <div
                  className="border rounded-lg p-4"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3
                    className="mb-3"
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontFamily: 'var(--font-family-heading)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    Sources
                  </h3>
                  <div className="space-y-2">
                    {topic.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block underline hover:no-underline transition-all"
                        style={{
                          color: 'var(--primary)',
                          fontSize: 'var(--text-base)',
                          fontFamily: 'var(--font-family-body)'
                        }}
                      >
                        {source}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Analytics Dashboard */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Google Trends */}
                  <div
                    className="border rounded-lg p-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                      <h4
                        style={{
                          fontSize: 'var(--text-h4)',
                          fontFamily: 'var(--font-family-heading)',
                          fontWeight: 'var(--font-weight-bold)'
                        }}
                      >
                        Google Trends
                      </h4>
                    </div>
                    <p
                      className="text-2xl mb-1"
                      style={{
                        fontFamily: 'var(--font-family-heading)',
                        fontWeight: 'var(--font-weight-bold)',
                        color: 'var(--primary)'
                      }}
                    >
                      +200%
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-label)',
                        fontFamily: 'var(--font-family-body)',
                        color: 'var(--muted-foreground)'
                      }}
                    >
                      Spiking today
                    </p>
                  </div>

                  {/* Chartbeat Metrics */}
                  <div
                    className="border rounded-lg p-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <h4
                      className="mb-2"
                      style={{
                        fontSize: 'var(--text-h4)',
                        fontFamily: 'var(--font-family-heading)',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      Chartbeat
                    </h4>
                    <div className="space-y-1">
                      <p style={{ fontSize: 'var(--text-label)', fontFamily: 'var(--font-family-body)' }}>
                        Views: <span style={{ fontWeight: 'var(--font-weight-bold)' }}>15.2K</span>
                      </p>
                      <p style={{ fontSize: 'var(--text-label)', fontFamily: 'var(--font-family-body)' }}>
                        Shares: <span style={{ fontWeight: 'var(--font-weight-bold)' }}>2.3K</span>
                      </p>
                      <p style={{ fontSize: 'var(--text-label)', fontFamily: 'var(--font-family-body)' }}>
                        Comments: <span style={{ fontWeight: 'var(--font-weight-bold)' }}>892</span>
                      </p>
                    </div>
                  </div>

                  {/* SEO Keywords */}
                  <div
                    className="border rounded-lg p-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <h4
                      className="mb-2"
                      style={{
                        fontSize: 'var(--text-h4)',
                        fontFamily: 'var(--font-family-heading)',
                        fontWeight: 'var(--font-weight-bold)'
                      }}
                    >
                      SEO Keywords
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {['meme', 'viral', 'trending'].map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-0.5 rounded-full border"
                          style={{
                            borderColor: 'var(--border)',
                            fontSize: 'var(--text-label)',
                            fontFamily: 'var(--font-family-body)'
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Claim Button */}
                <button
                  onClick={handleClaim}
                  disabled={isClaimed}
                  className="w-full py-3 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: isClaimed ? 'var(--muted)' : 'var(--primary)',
                    color: isClaimed ? 'var(--muted-foreground)' : 'var(--primary-foreground)',
                    fontSize: 'var(--text-base)',
                    fontFamily: 'var(--font-family-body)',
                    fontWeight: 'var(--font-weight-bold)',
                    boxShadow: isClaimed ? 'none' : 'var(--shadow-elevation-sm)'
                  }}
                >
                  {isClaimed ? 'Topic Claimed!' : 'Claim This Topic'}
                </button>

                {/* Related Content */}
                <div>
                  <h3
                    className="mb-4"
                    style={{
                      fontSize: 'var(--text-h3)',
                      fontFamily: 'var(--font-family-heading)',
                      fontWeight: 'var(--font-weight-bold)'
                    }}
                  >
                    Related Memes
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg overflow-hidden border"
                        style={{ borderColor: 'var(--border)' }}
                      >
                        <img
                          src={topic.image}
                          alt={`Related ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
