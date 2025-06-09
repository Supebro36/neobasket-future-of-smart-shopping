
// Function to generate a random price between min and max
export const randomPrice = (min: number, max: number): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

// Function to generate a random discount price (occasionally null to represent no discount)
export const randomDiscountPrice = (price: number): number | undefined => {
  // 60% chance of having a discount
  if (Math.random() > 0.4) {
    // Discount between 5% and 30% off
    const discountPercent = Math.random() * 0.25 + 0.05;
    return parseFloat((price * (1 - discountPercent)).toFixed(2));
  }
  return undefined;
};

// Function to generate random reviews count
export const randomReviews = (): number => {
  return Math.floor(Math.random() * 500) + 1;
};

// Function to generate random rating between 3.5 and 5.0
export const randomRating = (): number => {
  return parseFloat((Math.random() * 1.5 + 3.5).toFixed(1));
};

// Function to generate random stock quantity
export const randomStockQuantity = (): number => {
  return Math.floor(Math.random() * 100) + 1;
};

// Function to generate random specifications
export const generateSpecifications = (category: string): any => {
  const baseSpecs = {
    weight: `${Math.floor(Math.random() * 500) + 100}g`,
    dimensions: `${Math.floor(Math.random() * 20) + 10}x${Math.floor(Math.random() * 15) + 8}x${Math.floor(Math.random() * 10) + 2}cm`,
    warranty: `${Math.floor(Math.random() * 3) + 1} year(s)`
  };

  switch (category) {
    case 'electronics':
      return {
        ...baseSpecs,
        batteryLife: `${Math.floor(Math.random() * 20) + 5} hours`,
        connectivity: ['Bluetooth', 'WiFi', 'USB'][Math.floor(Math.random() * 3)],
        powerSource: 'Battery/AC Adapter'
      };
    case 'clothing':
      return {
        ...baseSpecs,
        material: ['Cotton', 'Polyester', 'Silk', 'Wool'][Math.floor(Math.random() * 4)],
        careInstructions: 'Machine wash cold',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
      };
    case 'home-decor':
      return {
        ...baseSpecs,
        material: ['Wood', 'Metal', 'Ceramic', 'Glass'][Math.floor(Math.random() * 4)],
        style: ['Modern', 'Traditional', 'Rustic', 'Contemporary'][Math.floor(Math.random() * 4)]
      };
    default:
      return baseSpecs;
  }
};
