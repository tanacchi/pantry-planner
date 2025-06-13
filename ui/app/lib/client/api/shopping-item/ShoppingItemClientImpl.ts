import { ShoppingItem, CreateShoppingItemRequest, UpdateShoppingItemRequest } from "../../../../domain/shopping-item";
import { ShoppingItemClient } from "./ShoppingItemClient";

// Note: Generated API client is not yet available for shopping-item endpoints
// This implementation uses direct fetch calls until the generated client is updated

export class ShoppingItemClientImpl implements ShoppingItemClient {
  private readonly baseUrl: string;

  constructor(baseUrl = "http://localhost:8000") {
    this.baseUrl = baseUrl;
  }

  async getItemsByUserId(userId: number): Promise<ShoppingItem[]> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping-list/items?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((item: any) => responseToShoppingItem(item));
    } catch (err) {
      console.error("Error fetching shopping items by user ID:", err);
      throw err;
    }
  }

  async getItemById(id: number): Promise<ShoppingItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping-list/items/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return responseToShoppingItem(data);
    } catch (err) {
      console.error("Error fetching shopping item by ID:", err);
      throw err;
    }
  }

  async createItem(params: CreateShoppingItemRequest): Promise<ShoppingItem> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping-list/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return responseToShoppingItem(data);
    } catch (err) {
      console.error("Error creating shopping item:", err);
      throw err;
    }
  }

  async updateItem(id: number, params: UpdateShoppingItemRequest): Promise<ShoppingItem | null> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping-list/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return responseToShoppingItem(data);
    } catch (err) {
      console.error("Error updating shopping item:", err);
      throw err;
    }
  }

  async deleteItem(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/shopping-list/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting shopping item:", err);
      throw err;
    }
  }
}

export const responseToShoppingItem = (res: any): ShoppingItem => {
  return new ShoppingItem(
    res.id,
    res.name,
    res.category,
    res.userId,
    new Date(res.createdAt),
    new Date(res.updatedAt),
    res.deletedAt ? new Date(res.deletedAt) : null
  );
};