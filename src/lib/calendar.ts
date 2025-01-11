// Constants for the calendar system
export const DAYS_IN_WEEK = 5;
export const WEEKS_IN_YEAR = 73;
export const DAYS_IN_SEASON = 73;
export const SEASONS = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'] as const;
export const WEEKDAYS = ['Onesday', 'Twosday', 'Threesday', 'Foursday', 'Fivesday'] as const;
export const YEAR_ZERO_START = new Date('2023-12-20T00:00:00.000Z');

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function getDaysSinceEpoch(date: Date): number {
  const utcDate = new Date(date.toISOString());
  return Math.floor((utcDate.getTime() - YEAR_ZERO_START.getTime()) / (24 * 60 * 60 * 1000));
}

export function getCustomDate(date: Date = new Date()) {
  const daysSinceEpoch = getDaysSinceEpoch(date);
  let year = Math.floor(daysSinceEpoch / (DAYS_IN_WEEK * WEEKS_IN_YEAR));
  let remainingDays = daysSinceEpoch % (DAYS_IN_WEEK * WEEKS_IN_YEAR);

  // Adjust for leap years
  let leapDaysBeforeThisYear = 0;
  for (let y = 0; y < year; y++) {
    if (isLeapYear(y)) leapDaysBeforeThisYear++;
  }
  
  remainingDays -= leapDaysBeforeThisYear;
  while (remainingDays < 0) {
    year--;
    remainingDays += DAYS_IN_WEEK * WEEKS_IN_YEAR;
    if (isLeapYear(year)) remainingDays++;
  }

  // Calculate season and day within season
  let seasonIndex = Math.floor(remainingDays / DAYS_IN_SEASON);
  const dayInSeason = (remainingDays % DAYS_IN_SEASON) + 1;
  
  // Check if we're at or past Sigma day in a leap year
  if (isLeapYear(year) && remainingDays >= DAYS_IN_SEASON * 2) {
    if (remainingDays === DAYS_IN_SEASON * 2) {
      return {
        year,
        season: 'Sigma',
        dayInSeason: 1,
        weekday: 'Sigma Day',
        isLeapDay: true
      };
    }
    seasonIndex--;
  }

  // Calculate weekday
  const weekdayIndex = remainingDays % DAYS_IN_WEEK;

  return {
    year,
    season: SEASONS[seasonIndex],
    dayInSeason,
    weekday: WEEKDAYS[weekdayIndex],
    isLeapDay: false
  };
}