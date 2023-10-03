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


export { shorttenAddress };
