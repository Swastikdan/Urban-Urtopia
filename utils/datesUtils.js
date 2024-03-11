import { format } from 'date-fns';

export const formatCheckDate = (date, dateFormat) => {
  if (!date) return '';
  return format(date, dateFormat || 'MMM d');
};

export const formatRangeDate = (startDate, endDate) => {
  if (!startDate || !endDate) return false;
  let template = `${formatCheckDate(startDate)} - ${formatCheckDate(endDate)}`;

  if (formatCheckDate(startDate, 'M y') === formatCheckDate(endDate, 'M y')) {
    template = `${formatCheckDate(startDate, 'd')} - ${formatCheckDate(endDate, 'd')} ${formatCheckDate(startDate, 'MMM')}`;
  } else if (formatCheckDate(startDate, 'd M y') === formatCheckDate(endDate, 'd M y')) {
    template = `${formatCheckDate(startDate)} - ${
      parseInt(formatCheckDate(endDate, 'd')) + 1
    }`;
  } else if (formatCheckDate(startDate, 'y') !== formatCheckDate(endDate, 'y')) {
    template = `${formatCheckDate(startDate, 'MMM d, y')} - ${formatCheckDate(
      endDate,
      'MMM d, y'
    )}`;
  }
  return template;
};