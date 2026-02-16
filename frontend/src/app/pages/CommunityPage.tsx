import { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { communityEditors } from '../data/mockData';

export function CommunityPage() {
  const [expandedEditor, setExpandedEditor] = useState<string | null>(null);

  const toggleEditor = (editorId: string) => {
    setExpandedEditor(expandedEditor === editorId ? null : editorId);
  };

  const handleSlackMessage = (editorName: string) => {
    // In a real app, this would open Slack
    alert(`Opening Slack conversation with ${editorName}...`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl mb-2" style={{ color: '#2E2E2E' }}>Community</h1>
        <p style={{ color: '#575757' }}>Connect with other content editors and collaborate</p>
      </div>

      {/* Editors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communityEditors.map(editor => (
          <div
            key={editor.id}
            className="rounded-lg border-2 overflow-hidden transition-all hover:shadow-lg"
            style={{ borderColor: '#C4C4C4' }}
          >
            {/* Editor Card Header */}
            <div className="p-6 bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={editor.avatar}
                    alt={editor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1" style={{ color: '#2E2E2E' }}>{editor.name}</h3>
                  <p className="text-sm mb-3" style={{ color: '#575757' }}>
                    {editor.claimedTopics.length} claimed topics
                  </p>
                  <Button
                    size="sm"
                    onClick={() => handleSlackMessage(editor.name)}
                    className="w-full"
                    style={{ backgroundColor: '#2E2E2E', color: '#FFFFFF' }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message on Slack
                  </Button>
                </div>
              </div>

              {/* Expand/Collapse Button */}
              <button
                onClick={() => toggleEditor(editor.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                style={{ color: '#2E2E2E' }}
              >
                <span className="text-sm">View claimed topics</span>
                {expandedEditor === editor.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Expanded Topics List */}
            {expandedEditor === editor.id && (
              <div className="border-t p-4" style={{ borderColor: '#C4C4C4', backgroundColor: '#F5F5F5' }}>
                <ul className="space-y-2">
                  {editor.claimedTopics.map((topic, index) => (
                    <li
                      key={index}
                      className="p-3 rounded-lg bg-white text-sm"
                      style={{ color: '#2E2E2E' }}
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
