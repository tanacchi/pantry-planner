import { ItemResponseDto } from "../client/generated";

export const formatItem = (item: ItemResponseDto): string => {
  return `${item.name} (${item.category}) - ${item.quantity}${item.unit} 賞味期限: ${Date.now().toString()}`;
}
