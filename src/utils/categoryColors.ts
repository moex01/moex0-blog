// Centralized category color mapping for consistent styling across components
export const categoryColors: Record<string, string> = {
  // Threat categories (red)
  'apt': 'var(--color-accent-red)',
  'apt29': 'var(--color-accent-red)',
  'malware': 'var(--color-accent-red)',
  'ransomware': 'var(--color-accent-red)',
  'threat-actor': 'var(--color-accent-red)',

  // Intelligence categories (orange)
  'threat-intelligence': 'var(--color-accent-orange)',
  'intelligence': 'var(--color-accent-orange)',

  // Vulnerability categories (yellow)
  'vulnerability': '#fbbf24',
  'cve': '#fbbf24',
  'exploit': '#fbbf24',

  // Incident Response categories (cyan)
  'dfir': 'var(--color-accent-cyan)',
  'forensics': 'var(--color-accent-cyan)',
  'incident-response': 'var(--color-accent-cyan)',
  'threat-hunting': 'var(--color-accent-cyan)',

  // Defense categories (green)
  'detection': 'var(--color-accent-green)',
  'hunting': 'var(--color-accent-green)',
  'blue-team': 'var(--color-accent-green)',
  'defense': 'var(--color-accent-green)',

  // Research categories (purple)
  'kerberos': 'var(--color-accent-purple)',
  'authentication': 'var(--color-accent-purple)',
  'research': 'var(--color-accent-purple)',
  'writeup': 'var(--color-accent-purple)',
  'active-directory': 'var(--color-accent-purple)',

  // Default
  'default': 'var(--color-accent-cyan)'
};

// Get color for a tag, with fallback to default
export function getCategoryColor(tag: string | undefined): string {
  if (!tag) return categoryColors['default'];
  const normalizedTag = tag.toLowerCase();
  return categoryColors[normalizedTag] || categoryColors['default'];
}

// For ArticleLayout which needs both accent and background colors
export const categoryColorsWithBg: Record<string, { accent: string; bg: string; border: string }> = {
  'apt': { accent: 'var(--color-accent-red)', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)' },
  'apt29': { accent: 'var(--color-accent-red)', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)' },
  'malware': { accent: 'var(--color-accent-red)', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)' },
  'ransomware': { accent: 'var(--color-accent-red)', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)' },
  'threat-actor': { accent: 'var(--color-accent-red)', bg: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.4)' },
  'threat-intelligence': { accent: 'var(--color-accent-orange)', bg: 'rgba(251, 146, 60, 0.15)', border: 'rgba(251, 146, 60, 0.4)' },
  'intelligence': { accent: 'var(--color-accent-orange)', bg: 'rgba(251, 146, 60, 0.15)', border: 'rgba(251, 146, 60, 0.4)' },
  'vulnerability': { accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)' },
  'cve': { accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)' },
  'exploit': { accent: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.4)' },
  'dfir': { accent: 'var(--color-accent-cyan)', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' },
  'forensics': { accent: 'var(--color-accent-cyan)', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' },
  'incident-response': { accent: 'var(--color-accent-cyan)', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' },
  'threat-hunting': { accent: 'var(--color-accent-cyan)', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' },
  'detection': { accent: 'var(--color-accent-green)', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)' },
  'hunting': { accent: 'var(--color-accent-green)', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)' },
  'blue-team': { accent: 'var(--color-accent-green)', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)' },
  'defense': { accent: 'var(--color-accent-green)', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.4)' },
  'kerberos': { accent: 'var(--color-accent-purple)', bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.4)' },
  'authentication': { accent: 'var(--color-accent-purple)', bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.4)' },
  'research': { accent: 'var(--color-accent-purple)', bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.4)' },
  'writeup': { accent: 'var(--color-accent-purple)', bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.4)' },
  'active-directory': { accent: 'var(--color-accent-purple)', bg: 'rgba(167, 139, 250, 0.15)', border: 'rgba(167, 139, 250, 0.4)' },
  'default': { accent: 'var(--color-accent-cyan)', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.4)' }
};

export function getCategoryColorWithBg(tag: string | undefined): { accent: string; bg: string; border: string } {
  if (!tag) return categoryColorsWithBg['default'];
  const normalizedTag = tag.toLowerCase();
  return categoryColorsWithBg[normalizedTag] || categoryColorsWithBg['default'];
}

// ========================================
// Threat Level Badge System
// ========================================

export type ThreatLevel = 'critical' | 'high' | 'medium' | 'low' | 'info';

export interface ThreatBadge {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string; // Emoji or symbol
}

export const threatLevels: Record<ThreatLevel, ThreatBadge> = {
  critical: {
    label: 'CRITICAL',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.15)',
    borderColor: '#ef4444',
    icon: '⚠️'
  },
  high: {
    label: 'HIGH',
    color: '#f97316',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    borderColor: '#f97316',
    icon: '🔴'
  },
  medium: {
    label: 'MEDIUM',
    color: '#eab308',
    bgColor: 'rgba(234, 179, 8, 0.15)',
    borderColor: '#eab308',
    icon: '🟡'
  },
  low: {
    label: 'LOW',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    borderColor: '#22c55e',
    icon: '🟢'
  },
  info: {
    label: 'INFO',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: '#3b82f6',
    icon: 'ℹ️'
  }
};

// Map categories to threat levels automatically
export function getThreatLevelFromCategory(category: string | undefined): ThreatLevel {
  if (!category) return 'info';

  const normalized = category.toLowerCase();

  // Critical threats
  if (['apt', 'apt29', 'ransomware', 'threat-actor', 'zero-day'].includes(normalized)) {
    return 'critical';
  }

  // High threats
  if (['malware', 'exploit', 'vulnerability', 'cve'].includes(normalized)) {
    return 'high';
  }

  // Medium
  if (['threat-intelligence', 'intelligence', 'incident-response'].includes(normalized)) {
    return 'medium';
  }

  // Low
  if (['detection', 'hunting', 'blue-team', 'defense'].includes(normalized)) {
    return 'low';
  }

  // Info (research, writeups, etc.)
  return 'info';
}

export function getThreatBadge(level: ThreatLevel): ThreatBadge {
  return threatLevels[level];
}
