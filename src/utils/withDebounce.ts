export const withDebounce = <Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number = 300
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
