export async function successPromiseBehavior<T>(success: () => T): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(success());
    }, 500);
  });
}

export async function errorPromiseBehavior(): Promise<never> {
  return new Promise<never>((_resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 500);
  });
}
