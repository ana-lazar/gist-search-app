export const compareDesc = (a?: string, b?: string) => {
  if (!a) {
    return b ? 1 : 0;
  }
  if (!b) {
    return 1;
  }
  return new Date(b).getTime() - new Date(a).getTime();
};
