export const numberToNumberDot = (input) => {
  const number = Number(input);
  if (typeof number !== "number") {
    return "invalid";
  }
  return;
};
//

export const numberToVnd = (input) => {
  const number = Number(input);
  if (typeof number !== "number") {
    return "invalid";
  }
  if(isNaN(number)) return "NaN"
  if (number % 1 !== 0) return "Số tiền phải tròn đơn vị đồng";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "VND" }).format(number);
};

// ₫
export const convertDateTime = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  let formattedDate = "";
  formattedDate = `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""}${month}-${year},  ${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`;
  return formattedDate;
};
export const formatNumber = (number) => new Intl.NumberFormat("de-DE").format(number);
