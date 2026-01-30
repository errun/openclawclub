const DEFAULT_KEYWORDS = [
  'openclaw',
  'moltbot',
  'clawdbot',
  'Clawbot',
  '个人 AI 助手',
  'AI 助手生态',
  'Skills 生态',
  '自动化'
];

export const BRAND_KEYWORDS = DEFAULT_KEYWORDS;

export function mergeKeywords(extra: string[] = []): string[] {
  const map = new Map<string, string>();
  for (const keyword of [...DEFAULT_KEYWORDS, ...extra]) {
    const cleaned = keyword.trim();
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (!map.has(key)) map.set(key, cleaned);
  }
  return Array.from(map.values());
}
