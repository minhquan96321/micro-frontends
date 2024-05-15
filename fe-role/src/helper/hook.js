const formatPhoneRead = (phone) => {
  if (!phone) return "";
  phone = phone.replace(/^(84)/, "0");
  return phone;
};

const formatPhoneWrite = (phone) => {
  phone = phone.replace(/^(\+84|0)/, "84");
  return phone;
};

const colorMoney = (amount) => {
  if (amount > 0) {
    return "text-green-700";
  }
  return "text-red-500";
};

export { formatPhoneRead, formatPhoneWrite, colorMoney };
