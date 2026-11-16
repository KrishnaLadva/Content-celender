import { useState } from 'react';
import { MONTHLY_PERFORMANCE, WEEKLY_PERFORMANCE } from '../data/seedData';
import { formatMetricCompact } from '../utils/contentLogic';

export function PerformanceChart() {
  const [range, setRange] = useState<'week' | 'month'>('week');
  const [hoveredIdx, setHoveredIdx] = useState<number>(5);

  const data = range === 'week' ? WEEKLY_PERFORMANCE : MONTHLY_PERFORMANCE;
  const safeIdx = Math.min(hoveredIdx, data.length - 1);
  const maxVal = range === 'week' ? 15000 : 60000;

  const width = 340;
  const height = 160;
  const padLeft = 36;
  const padRight = 10;
  const padTop = 14;
  const padBottom = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const getX = (i: number) =>
    padLeft + (i / Math.max(1, data.length - 1)) * plotW;
  const getY = (val: number) => padTop + (1 - val / maxVal) * plotH;

  const buildPath = (key: 'reach' | 'engagement' | 'clicks') =>
    data
      .map(
        (pt, i) =>
          `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(pt[key]).toFixed(1)}`
      )
      .join(' ');

  const reachArea = `${buildPath('reach')} L ${getX(data.length - 1).toFixed(
    1
  )} ${(padTop + plotH).toFixed(1)} L ${getX(0).toFixed(1)} ${(
    padTop + plotH
  ).toFixed(1)} Z`;

  const activePoint = data[safeIdx];
  const yTicks = [0, maxVal * 0.33, maxVal * 0.66, maxVal];

  return (
    <section
      aria-label="Content Performance"
      className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800/90 dark:bg-[#0C1222]"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold text-slate-900 dark:text-slate-50">
          Content Performance
        </h2>
        <select
          aria-label="Performance timeframe"
          value={range}
          onChange={(e) => {
            setRange(e.target.value as 'week' | 'month');
            setHoveredIdx(0);
          }}
          className="h-8 rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs font-medium text-slate-700 focus-visible:outline-2 focus-visible:outline-blue-500 dark:border-slate-800 dark:bg-[#11182C] dark:text-slate-200"
        >
          <option value="week">This Week</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-800 dark:bg-[#11182C]">
        <span className="font-medium text-slate-600 dark:text-slate-400">
          {activePoint.dateLabel}
        </span>
        <div className="flex items-center gap-3 font-mono-num">
          <span className="text-sky-600 dark:text-sky-400">
            {formatMetricCompact(activePoint.reach)} reach
          </span>
          <span className="text-violet-600 dark:text-violet-400">
            {formatMetricCompact(activePoint.engagement)} eng
          </span>
        </div>
      </div>

      <div className="mt-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-44 w-full overflow-visible"
          role="img"
          aria-label="Line chart showing Reach, Engagement, and Clicks"
        >
          <defs>
            <linearGradient id="perfReachArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((val, idx) => {
            const y = getY(val);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 6}
                  y={y + 3}
                  textAnchor="end"
                  className="fill-slate-400 dark:fill-slate-500 text-[9px] font-mono-num"
                >
                  {formatMetricCompact(Math.round(val))}
                </text>
              </g>
            );
          })}

          <path d={reachArea} fill="url(#perfReachArea)" />

          <path
            d={buildPath('reach')}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath('engagement')}
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildPath('clicks')}
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <line
            x1={getX(safeIdx)}
            y1={padTop}
            x2={getX(safeIdx)}
            y2={padTop + plotH}
            className="stroke-slate-300 dark:stroke-slate-700"
            strokeDasharray="2 2"
          />

          {data.map((pt, i) => {
            const x = getX(i);
            const active = i === safeIdx;
            return (
              <g key={pt.dateLabel}>
                <circle
                  cx={x}
                  cy={getY(pt.reach)}
                  r={active ? 4 : 2.5}
                  fill="#3B82F6"
                />
                <circle
                  cx={x}
                  cy={getY(pt.engagement)}
                  r={active ? 3.5 : 2}
                  fill="#8B5CF6"
                />
                <circle
                  cx={x}
                  cy={getY(pt.clicks)}
                  r={active ? 3.5 : 2}
                  fill="#10B981"
                />
                <text
                  x={x}
                  y={height - 4}
                  textAnchor="middle"
                  className="fill-slate-500 dark:fill-slate-400 text-[9px]"
                >
                  {pt.dateLabel}
                </text>
                <rect
                  x={x - 16}
                  y={padTop}
                  width={32}
                  height={plotH}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onClick={() => setHoveredIdx(i)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-center gap-5 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
          Reach
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-violet-500" aria-hidden="true" />
          Engagement
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
          Clicks
        </span>
      </div>
    </section>
  );
}
