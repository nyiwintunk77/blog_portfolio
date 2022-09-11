import moment from 'moment';

export const formatDate = (date) => {
  const formatedDate = moment(date).format('YYYY-MM-DD HH:mm');
  return formatedDate;
};

export const formatDate_day = (date) => {
  const formatDate_day = moment(date).format('YYYY-MM-DD');
  return formatDate_day;
};

export const registedPeriod = (date) => {
  const now = new Date();
  const registDate = new Date(date).getTime();

  return Math.ceil((now - registDate) / (1000 * 60 * 60 * 24));
};
