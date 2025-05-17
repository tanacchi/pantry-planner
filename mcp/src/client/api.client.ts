import { Configuration, CreateItemRequestDto, ItemApi } from "./generated";

const BASE_PATH = process.env.API_HOST ?? "http://localhost:8000";

export class PantryApiClient {
  private readonly itemApi: ItemApi;

  constructor() {
    this.itemApi = new ItemApi(new Configuration({ basePath: BASE_PATH }));
  }

  async getItemsByPantryId(pantryId: number) {
    try {
      const response = await this.itemApi.itemControllerGetItemsByPantry({
        pantryId,
      });
      return response;
    } catch (error) {
      console.error("Error fetching items by pantry ID:", error);
      throw error;
    }
  }

  async addItem(item: CreateItemRequestDto) {
    try {
      const response = await this.itemApi.itemControllerCreateItem({
        createItemRequestDto: {
          name: item.name,
          pantryId: item.pantryId,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
        },
      });
      return response;
    } catch (error) {
      console.error("Error adding item:", error);
      throw error;
    }
  }
}
