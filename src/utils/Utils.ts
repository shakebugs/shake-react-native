const isBinaryData = (text: string) => {
  return /\ufffd/.test(text);
};

export { isBinaryData };
