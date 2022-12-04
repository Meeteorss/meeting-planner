export function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes())].join(':')
  );
}
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
