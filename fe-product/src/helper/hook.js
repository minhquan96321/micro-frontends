const colorMoney = (amount) => {
  if (amount > 0) {
    return "text-green-700";
  }
  return "text-red-500";
};

export { colorMoney };
