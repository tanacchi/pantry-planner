import { Configuration, ItemApi } from "./generated";

const BASE_PATH = process.env.API_HOST ?? "http://localhost:8000";

export class PantryApiClient {
  private readonly itemApi: ItemApi;

  constructor() {
    this.itemApi = new ItemApi(new Configuration({ basePath: BASE_PATH }));
  }

  async getAllItems() {
    try {
      const response = await this.itemApi.itemControllerGetItems();
      return response;
    } catch (error) {
      console.error("Error fetching all items:", error);
      throw error;
    }
  }
}
