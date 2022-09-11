import moment from "moment";
import { formatDate, formatDate_day } from "../format";

export function timeCalculation(date) {
    const today = moment(new Date());
    const postDate = formatDate(date);
    let betweenTime = today.diff(postDate, 'hours');
    if (betweenTime > 23) return (betweenTime = formatDate_day(date));
    if (betweenTime === 0) {
      return (betweenTime = today.diff(postDate, 'minutes') + '分 前');
    }

    return betweenTime + '時間 前';
  }