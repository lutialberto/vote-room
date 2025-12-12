export async function successPromiseBehavior<T>(
  success: () => T,
  delay: number = 500
): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(success());
    }, delay);
  });
}

export async function errorPromiseBehavior(
  delay: number = 500
): Promise<never> {
  return new Promise<never>((_resolve, reject) => {
    setTimeout(() => {
      reject();
    }, delay);
  });
}
