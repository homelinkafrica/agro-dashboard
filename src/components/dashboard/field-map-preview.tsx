export function FieldMapPreview() {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label="Stylized preview of farm fields"
    >
      <rect width="400" height="400" fill="#d9c9a3" />
      <path d="M0 0 L180 40 L140 160 L0 220 Z" fill="#8fae5c" />
      <path d="M180 40 L400 0 L400 140 L260 190 L140 160 Z" fill="#7a9a4c" />
      <path d="M0 220 L140 160 L260 190 L220 340 L60 400 L0 400 Z" fill="#9dbb6a" />
      <path d="M260 190 L400 140 L400 400 L220 340 Z" fill="#87a857" />
      <path
        d="M0 210 L150 155 L270 185 L400 130"
        stroke="#c9b183"
        strokeWidth="14"
        fill="none"
        opacity="0.8"
      />
      {[
        [40, 60], [95, 30], [230, 60], [320, 40], [60, 190], [190, 130],
        [330, 200], [110, 260], [260, 300], [40, 330], [340, 330], [190, 350],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i % 3 === 0 ? 9 : 6} fill="#4f7942" opacity="0.85" />
      ))}
      <g opacity="0.9">
        <rect x="300" y="70" width="20" height="16" fill="#e5e0d8" />
        <rect x="325" y="80" width="16" height="12" fill="#e5e0d8" />
      </g>
    </svg>
  );
}
