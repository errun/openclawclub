const DEFAULT_KEYWORDS = [
  'openclaw',
  'moltbot',
  'clawdbot',
  'Clawbot',
  'personal AI assistant',
  'AI assistant ecosystem',
  'skills ecosystem',
  'automation',
  'security governance'
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
