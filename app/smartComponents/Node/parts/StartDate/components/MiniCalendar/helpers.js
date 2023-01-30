import moment from 'moment';

export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

// react-dates helper function
export default function getCalendarMonthWeeks(
  startDate,
  duration,
  firstDayOfWeek = moment.localeData().firstDayOfWeek(),
) {
  const month = moment(startDate);
  const endMonth = moment(startDate).add(duration, 'day');

  if (!moment.isMoment(month) || !month.isValid()) {
    return null;
  }
  if (!moment.isMoment(endMonth) || !endMonth.isValid()) {
    return null;
  }
  if (WEEKDAYS.indexOf(firstDayOfWeek) === -1) {
    return null;
  }

  // set utc offset to get correct dates in future (when timezone changes)
  const firstOfMonth = month
    .clone()
    .startOf('month')
    .hour(12);
  const lastOfMonth = endMonth
    .clone()
    .endOf('month')
    .hour(12);

  // calculate the exact first and last days to fill the entire matrix
  // (considering days outside month)
  const prevDays = (firstOfMonth.day() + 7 - firstDayOfWeek) % 7;
  const nextDays = (firstDayOfWeek + 6 - lastOfMonth.day()) % 7;
  const firstDay = firstOfMonth.clone().subtract(prevDays, 'day');
  const lastDay = lastOfMonth.clone().add(nextDays, 'day');

  const totalDays = lastDay.diff(firstDay, 'days') + 1;

  const currentDay = firstDay.clone();
  const weeksInMonth = [];

  for (let i = 0; i < totalDays; i += 1) {
    if (i % 7 === 0) {
      weeksInMonth.push([]);
    }

    let day = null;
    if (i >= prevDays && i < totalDays - nextDays) {
      day = currentDay.clone();
    }

    weeksInMonth[weeksInMonth.length - 1].push(day);

    currentDay.add(1, 'day');
  }

  return weeksInMonth;
}
