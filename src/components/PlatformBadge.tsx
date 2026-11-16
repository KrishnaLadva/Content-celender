import { useState } from 'react';
import { FileText, Play } from 'lucide-react';
import type { Platform } from '../types/content';
export { getPlatformLabel, getStatusMeta } from '../utils/formatters';

export function PlatformIcon({
  platform,
  size = 'sm',
}: {
  platform: Platform;
  size?: 'sm' | 'md';
}) {
  const dim = size === 'md' ? 'w-7 h-7 text-[11px]' : 'w-5 h-5 text-[10px]';

  if (platform === 'instagram') {
    return (
      <span
        aria-hidden="true"
        className={`${dim} inline-flex shrink-0 items-center justify-center rounded-md bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600 font-semibold text-white`}
      >
        IG
      </span>
    );
  }
  if (platform === 'facebook') {
    return (
      <span
        aria-hidden="true"
        className={`${dim} inline-flex shrink-0 items-center justify-center rounded-md bg-[#1877F2] font-bold text-white`}
      >
        f
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`${dim} inline-flex shrink-0 items-center justify-center rounded-md bg-[#0A66C2] font-bold text-white`}
    >
      in
    </span>
  );
}

export function MediaThumbnail({
  src,
  alt,
  mediaType,
  title,
  compact = false,
  size = 'md',
}: {
  src?: string;
  alt: string;
  mediaType: 'image' | 'video' | 'text';
  title: string;
  compact?: boolean;
  size?: 'md' | 'lg';
}) {
  const [errored, setErrored] = useState(false);

  const containerClass = compact
    ? 'w-11 h-11 shrink-0 rounded-lg'
    : size === 'lg'
      ? 'w-full h-44 rounded-xl'
      : 'w-full h-20 rounded-lg';

  if (!src || mediaType === 'text' || errored) {
    return (
      <div
        className={`${containerClass} px-2.5 flex items-center justify-center border border-slate-200 bg-slate-100 text-slate-500 dark:border-slate-800 dark:bg-[#0A0F1D] dark:text-slate-400`}
      >
        {mediaType === 'video' ? (
          <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 text-center overflow-hidden">
            <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
            {!compact && (
              <span className="text-[10px] font-medium line-clamp-1 max-w-full">
                {title}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-[#0A0F1D] ${containerClass}`}
    >
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
        className="h-full w-full object-cover"
      />
      {mediaType === 'video' && (
        <span
          aria-label="Reel or video post"
          className="absolute inset-0 flex items-center justify-center bg-slate-950/30 text-white"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/75 border border-white/25">
            <Play className="h-3 w-3 fill-current ml-0.5" aria-hidden="true" />
          </span>
          {!compact && (
            <span className="absolute right-1.5 bottom-1.5 rounded bg-slate-950/80 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-white">
              Reel
            </span>
          )}
        </span>
      )}
    </div>
  );
}
