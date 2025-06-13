import { Configuration, ItemApi, MessageApi, PantryApi, UserApi } from "./generated";
import { ItemClient } from "./item/ItemClient";
import { ItemClientImpl } from "./item/ItemClientImpl";
import { MessageClient } from "./message/MessageClient";
import { MessageClientImpl } from "./message/MessageClientImpl";
import { PantryClient } from "./pantry/PantryClient";
import { PantryClientImpl } from "./pantry/PantryClientImpl";
import { UserClient } from "./user/UserClient";
import { UserClientImpl } from "./user/UserClientImpl";
import { ShoppingItemClient } from "./shopping-item/ShoppingItemClient";
import { ShoppingItemClientImpl } from "./shopping-item/ShoppingItemClientImpl";

const BASE_PATH = process.env.API_HOST;

// Item
const itemApi: ItemApi = new ItemApi(
  new Configuration({
    basePath: BASE_PATH,
  })
);
export const itemClient: ItemClient = new ItemClientImpl(itemApi);

// Pantry
const pantryApi: PantryApi = new PantryApi(
  new Configuration({
    basePath: BASE_PATH,
  })
);
export const pantryClient: PantryClient = new PantryClientImpl(pantryApi);

// User
const userApi: UserApi = new UserApi(
  new Configuration({
    basePath: BASE_PATH,
  })
);
export const userClient: UserClient = new UserClientImpl(userApi);

// Message
const messageApi: MessageApi = new MessageApi(
  new Configuration({
    basePath: BASE_PATH,
  })
);
export const messageClient: MessageClient = new MessageClientImpl(messageApi);

// Shopping Item
export const shoppingItemClient: ShoppingItemClient = new ShoppingItemClientImpl(BASE_PATH);
