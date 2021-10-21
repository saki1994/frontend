const fullDate = new Date();
const currentdate = fullDate.getDate();
const month = fullDate.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
const year = fullDate.getFullYear();

const today = currentdate + "/" + month + "/" + year;
const yesterday = (currentdate - 1) + "/" + month + "/" + year;
export {today, yesterday}