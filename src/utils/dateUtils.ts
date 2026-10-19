export interface DDayInfo {
  diffDays: number;
  label: string;
  status: 'closed' | 'today' | 'urgent' | 'open' | 'upcoming';
  badgeClass: string;
}

/**
 * 오늘 날짜 기준으로 마감일까지 남은 D-Day 정보를 계산합니다.
 */
export function calculateDDay(endDateStr: string, startDateStr?: string): DDayInfo {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [endY, endM, endD] = endDateStr.split('-').map(Number);
  const endDate = new Date(endY, endM - 1, endD);

  if (startDateStr) {
    const [startY, startM, startD] = startDateStr.split('-').map(Number);
    const startDate = new Date(startY, startM - 1, startD);
    if (today < startDate) {
      const startDiff = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return {
        diffDays: startDiff,
        label: `접수예정 (D-${startDiff})`,
        status: 'upcoming',
        badgeClass: 'bg-purple-100 text-purple-700 border-purple-200'
      };
    }
  }

  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return {
      diffDays,
      label: '접수마감',
      status: 'closed',
      badgeClass: 'bg-slate-100 text-slate-500 border-slate-200'
    };
  }

  if (diffDays === 0) {
    return {
      diffDays: 0,
      label: '오늘마감 (D-Day)',
      status: 'today',
      badgeClass: 'bg-rose-600 text-white border-rose-600 animate-pulse'
    };
  }

  if (diffDays <= 3) {
    return {
      diffDays,
      label: `마감임박 D-${diffDays}`,
      status: 'urgent',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200 font-bold'
    };
  }

  if (diffDays <= 7) {
    return {
      diffDays,
      label: `D-${diffDays}`,
      status: 'open',
      badgeClass: 'bg-orange-50 text-orange-700 border-orange-200 font-semibold'
    };
  }

  return {
    diffDays,
    label: `D-${diffDays}`,
    status: 'open',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200 font-semibold'
  };
}

export function formatShortDate(dateStr: string): string {
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[1]}.${parts[2]}`;
}

export function formatFullDateWithDay(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')} (${days[date.getDay()]})`;
}
