// TODO: 丸見えになるので将来的にはサーバのみ直接コールするようにする.
import { Configuration, ItemApi, PantryApi, UserApi } from "./generated";
import { ItemClient } from "./item/ItemClient";
import { ItemClientImpl } from "./item/ItemClientImpl";
import { PantryClient } from "./pantry/PantryClient";
import { PantryClientImpl } from "./pantry/PantryClientImpl";
import { UserClient } from "./user/UserClient";
import { UserClientImpl } from "./user/UserClientImpl";

const BASE_PATH = "http://localhost:8000";

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
