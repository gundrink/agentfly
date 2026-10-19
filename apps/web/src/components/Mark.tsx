/**
 * The Agentfly mark: a fly, two wings and a body.
 *
 * The same geometry as `apps/web/src/app/icon.svg`. Filled shapes, not strokes,
 * so the mark still reads at the size of a nav icon. `currentColor` lets it
 * follow the theme. `accent` is accepted so existing call sites keep compiling;
 * the fly is one colour.
 */
export function Mark({ size = 20 }: { size?: number; accent?: boolean }) {
  return (
    <svg viewBox="0 0 1024 1024" width={size} height={size} role="img" aria-label="Agentfly">
      <g fill="currentColor">
        <path d="M488 520C280 250 70 200 128 450C178 670 340 720 470 548C508 488 522 460 488 520Z" />
        <path d="M536 520C744 250 954 200 896 450C846 670 684 720 554 548C516 488 502 460 536 520Z" />
        <path d="M512 360c-40 0-64 78-64 176 0 140 26 268 64 340 38-72 64-200 64-340 0-98-24-176-64-176Z" />
        <circle cx="512" cy="318" r="52" />
      </g>
    </svg>
  );
}
