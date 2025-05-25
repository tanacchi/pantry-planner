// 型定義のためのユーティリティ
export function findById<T extends { id: number }>(
  arr: T[],
  id: number,
): T | undefined {
  return arr.find((v) => v.id === id);
}
