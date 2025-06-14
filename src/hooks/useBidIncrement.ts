
export const useBidIncrement = () => {
  const calculateNextIncrement = (currentBid: number): number => {
    if (currentBid < 17) {
      return 2; // $2 increments until $17
    } else if (currentBid < 39) {
      return 3; // $3 increments until $39
    } else if (currentBid < 101) {
      return 4; // $4 increments until $101
    } else {
      return 5; // $5 increments above $101
    }
  };

  const getNextBidAmount = (currentBid: number): number => {
    const increment = calculateNextIncrement(currentBid);
    return currentBid + increment;
  };

  const getQuickBidOptions = (currentBid: number): number[] => {
    const baseIncrement = calculateNextIncrement(currentBid);
    return [
      currentBid + baseIncrement, // Next increment
      currentBid + (baseIncrement * 2), // Double increment
      currentBid + (baseIncrement * 3), // Triple increment
    ];
  };

  return {
    calculateNextIncrement,
    getNextBidAmount,
    getQuickBidOptions
  };
};
