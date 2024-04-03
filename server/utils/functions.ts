import crpyto from 'crypto';

/**
 * @returns Secure 6 digit random number
 */
const generateSixDigitRandomNumber = (): number => {
  return crpyto.randomInt(100000, 999999);
};

export { generateSixDigitRandomNumber };
