import { useState } from 'react';
import { Bot, Plus, Send, Sparkles } from 'lucide-react';
import { AI_IDEA_SUGGESTIONS } from '../data/seedData';
import type { ContentPillar, Platform } from '../types/content';
import { pickMediaAssetForPost } from '../utils/contentLogic';

interface AiIdeaSuggestion {
  id: string;
  format: string;
  mediaType: 'image' | 'video';
  platform: Platform;
  pillar: ContentPillar;
  competitorAngle: string;
  title: string;
  caption: string;
  thumbnailUrl: string;
}

interface AiAssistantCardProps {
  onAddDraftFromIdea: (idea: {
    title: string;
    caption: string;
    platform: Platform;
    pillar: ContentPillar;
    competitorAngle: string;
    mediaType: 'image' | 'video';
    thumbnailUrl: string;
  }) => void;
  onSpendCredits: (cost: number) => boolean;
}

export function AiAssistantCard({
  onAddDraftFromIdea,
  onSpendCredits,
}: AiAssistantCardProps) {
  const [ideas, setIdeas] = useState<AiIdeaSuggestion[]>(AI_IDEA_SUGGESTIONS);
  const [prompt, setPrompt] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGenerateIdea = (customTopic?: string) => {
    const allowed = onSpendCredits(15);
    if (!allowed) {
      setFeedback('Monthly AI credit limit reached.');
      return;
    }

    const topic = customTopic?.trim();
    const matched = pickMediaAssetForPost({
      pillar: topic ? 'Neutral Guidance' : 'Fee Clarity',
      title: topic ?? 'DGCA FTO Comparison Checklist: Fleet vs Fee Transparency',
      platform: 'linkedin',
    });

    const newIdea: AiIdeaSuggestion = topic
      ? {
          id: `idea-${Date.now()}`,
          format: matched.mediaType === 'video' ? 'Reel' : 'Post',
          mediaType: matched.mediaType,
          platform: 'linkedin',
          pillar: 'Neutral Guidance',
          competitorAngle: 'Custom competitor counter-angle',
          title: topic.length > 56 ? `${topic.slice(0, 53)}...` : topic,
          caption: `Unbiased Apano Aviation breakdown on "${topic}" with transparent fees and zero coaching upsell.`,
          thumbnailUrl: matched.thumbnailUrl,
        }
      : {
          id: `idea-${Date.now()}`,
          format: 'Comparison',
          mediaType: 'image',
          platform: 'linkedin',
          pillar: 'Fee Clarity',
          competitorAngle: "Outrank Pilot's Compass (#24) & Vayupath",
          title: 'DGCA FTO Comparison Checklist: Fleet vs Fee Transparency',
          caption:
            'Side-by-side framework showing parents how to verify aircraft fleet ratios and hidden exam charges across India and US schools.',
          thumbnailUrl: matched.thumbnailUrl,
        };

    setIdeas((prev) => [newIdea, ...prev.slice(0, 2)]);
    setFeedback(
      topic
        ? 'Generated an Apano-grounded idea (-15 credits).'
        : 'Refreshed gap-based recommendations (-15 credits).'
    );
  };

  return (
    <section
      aria-label="AI Assistant"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Bot
            className="h-4 w-4 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
            Gap-Based Ideas
          </h2>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Sat 21 Open
        </span>
      </div>

      <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-[#11182C]">
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          Recommended drafts from Apano’s 5 competitor gaps for Sat 21:
        </p>

        <ul className="mt-3 space-y-2.5">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="flex items-start justify-between gap-2 border-t border-slate-200 pt-2.5 first:border-t-0 first:pt-0 dark:border-slate-800/80"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-900 dark:text-slate-100">
                  {idea.format} · {idea.title}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                  {idea.pillar} · {idea.competitorAngle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAddDraftFromIdea({
                    title: idea.title,
                    caption: idea.caption,
                    platform: idea.platform,
                    pillar: idea.pillar,
                    competitorAngle: idea.competitorAngle,
                    mediaType: idea.mediaType,
                    thumbnailUrl: idea.thumbnailUrl,
                  });
                  setFeedback(`Added "${idea.title}" to Sat 21 drafts.`);
                }}
                aria-label={`Add ${idea.title} to calendar`}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-[#0C1222] dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => handleGenerateIdea()}
          className="mt-3.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-[#0C1222] dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Sparkles
            className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400"
            aria-hidden="true"
          />
          <span>Generate More Ideas</span>
        </button>
      </div>

      {feedback && (
        <p className="mt-2 text-xs text-blue-600 dark:text-blue-400" role="status">
          {feedback}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!prompt.trim()) return;
          handleGenerateIdea(prompt);
          setPrompt('');
        }}
        className="mt-3 flex items-center gap-2"
      >
        <label htmlFor="ai-assistant-prompt" className="sr-only">
          Ask AI for a competitor counter-post angle
        </label>
        <input
          id="ai-assistant-prompt"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Counter FMS 'after 12th' funnel..."
          className="h-9 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          aria-label="Send AI prompt"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-blue-500"
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </form>
    </section>
  );
}
