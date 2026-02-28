export async function successPromiseBehavior<T>(
  success: () => T,
  delay: number = 500
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(success());
      } catch (error) {
        reject(error);
      }
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

export function generateNextId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  const maxId = Math.max(...items.map((item) => item.id));
  return maxId + 1;
}
