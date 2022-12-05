export const add = (num1: number, num2: number): number => num1 + num2;

export const errorFunc2 = () => {
  console.log('error');
  throw new Error('errorFunction2');
};
