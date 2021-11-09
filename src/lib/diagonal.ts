export const diagonalLine = (x: number, y: number) => {
  const xPow = Math.pow(x, 2);
  const yPow = Math.pow(y, 2);
  return Math.abs(Math.round(Math.sqrt(xPow + yPow)));
};
export const diagonalAngle = (x: number, y: number) => {
  return (Math.atan(y / x) * 180) / Math.PI;
};
