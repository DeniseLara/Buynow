export const hasValidDiscount = (discountPercentage) => {
  return discountPercentage && discountPercentage > 0.9;
};

export const calculateDiscountedPrice = (price, discountPercentage) => {
  if (!hasValidDiscount(discountPercentage)) {
    return price.toFixed(2);
  }
  const discount = price * (discountPercentage / 100);
  return (price - discount).toFixed(2);
};