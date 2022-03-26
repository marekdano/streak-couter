export interface Streak {
  currentCount: number
  startDate: string
  lastLoginDate: string
}

export function formattedDate(date: Date): string {
	// returns date as 11/11/2021
	// other times it returns 11/11/2021, 12:00:00 AM
	// which is why we call the .split at the end
	return date.toLocaleDateString('en-US')
}

// NOTE: object passed in can be a Partial (not the whole thing) of Streak. 
// This means it can have some of Streak's properties, but not all.
export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>,
): Streak {
  const defaultStreak = {
    currentCount: 1,
    startDate: formattedDate(date),
    lastLoginDate: formattedDate(date),
  }

  return {
    ...defaultStreak,
    ...overrideDefaults,
  }
}