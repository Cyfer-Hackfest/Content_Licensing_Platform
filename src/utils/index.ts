const shorttenAddress = (
  input: string,
  prefixLength: number,
  suffixLength: number
): string => {
  if (input.length <= prefixLength + suffixLength) {
    return input;
  }

  const prefix = input.slice(0, prefixLength);
  const suffix = input.slice(-suffixLength);
  return `${prefix}...${suffix}`;
};

function parsePrice(price: string, decimals: number): number | null {
  const priceWithoutCommas = price.replace(/,/g, ''); // Remove commas if present
  const priceNumber = parseFloat(priceWithoutCommas);
  
  if (isNaN(priceNumber) || typeof decimals !== 'number' || decimals === 0) {
      return null; // Return null for invalid inputs
  }
  
  return priceNumber / 10 ** decimals;
}

function stringToNumber(price: string): number | null {
  const priceWithoutCommas = price.replace(/,/g, ''); // Remove commas if present
  const priceNumber = parseFloat(priceWithoutCommas);
  
  if (isNaN(priceNumber)) {
      return null; // Return null for invalid inputs
  }
  
  return priceNumber;
}

function reparsePrice(price: number, decimals: number): number {
  return price * 10 ** decimals;
}

function milisecondsToDate(milliseconds: number): string {
  const date = new Date(milliseconds);
  
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0
  const year = date.getFullYear().toString(); // Get last two digits of the year

  return `${day}-${month}-${year}`;
}

export { shorttenAddress, parsePrice, reparsePrice, stringToNumber, milisecondsToDate };
