// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef } from "react";
import {
  ActionFunction,
  data,
  LoaderFunction,
} from "@remix-run/server-runtime";
import {
  Form,
  useFetcher,
  useLoaderData,
  useMatches,
  useSearchParams,
} from "@remix-run/react";
import { User } from "../domain/user";
import {
  itemClient,
  messageClient,
  pantryClient,
  userClient,
} from "../lib/client/api/index.server";
import { Pantry } from "../domain/pantry";

export type LoaderData = {
  user: User;
  pantry: Pantry;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { userId, pantryId } = params;
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }
  if (!pantryId) {
    throw new Response("Pantry ID is required", { status: 400 });
  }

  const [user, pantry] = await Promise.all([
    userClient.getUserById(Number(userId)),
    pantryClient.getPantryById(Number(pantryId)),
  ]);
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }
  if (!pantry) {
    throw new Response("Pantry not found", { status: 404 });
  }
  return { user, pantry };
};

export const action: ActionFunction = async ({ params, request }) => {
  const { userId, pantryId } = params;
  if (!userId || !pantryId) {
    throw new Response("User ID and Pantry ID are required", { status: 400 });
  }
  const formData = await request.formData();
  switch (formData.get("intent")) {
    case "add": {
      const name = formData.get("name");
      if (!name) {
        throw new Response("Name is required", { status: 400 });
      }
      // FIXME: 手動で id を指定するのは良くない.
      if (typeof pantryId !== "string") {
        throw new Response("Pantry ID is required", { status: 400 });
      }
      if (typeof userId !== "string") {
        throw new Response("User ID is required", { status: 400 });
      }
      const item = await itemClient.addItem({
        name: name.toString(),
        pantryId: Number(pantryId),
        category: "Food",
        quantity: 1,
        unit: "個",
        expiresAt: new Date(),
      });

      messageClient.sendMessage({
        id: Number(userId),
        message: `「${name}」を追加しました`,
      });
      return data({ item });
    }
    case "delete": {
      const id = formData.get("id");
      if (!id) {
        throw new Response("ID is required", { status: 400 });
      }
      console.log("Deleting item:", id);
      await itemClient.deleteItem(Number(id));
      return null;
    }
    default: {
      throw new Response("Invalid intent", { status: 400 });
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const shouldRevalidate = ({ formMethod }: { formMethod: string }) => {
  return true;
};

export default function Dashboard() {
  const { pantry } = useLoaderData<LoaderData>();
  const matches = useMatches();
  const userMatch = matches.find((m) => m.id === "routes/dashboard.$userId") as
    | { data: { user: User } }
    | undefined;

  const user = userMatch?.data.user;
  if (!user) {
    throw new Response("User not found", { status: 404 });
  }

  const fetcher = useFetcher();
  const items = pantry.items;
  const [searchParams] = useSearchParams();

  // Add Item Form input ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear input after adding item
  useEffect(() => {
    if (fetcher.state === "idle" && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [fetcher.state]);
  return (
    <>
      {/* Search Form */}
      <Form method="get" className="flex mb-6">
        <input
          type="text"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="検索..."
          className="flex-1 border rounded-l px-4 py-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r">
          検索
        </button>
      </Form>

      {/* Add Item Form */}
      <fetcher.Form method="post" className="flex mb-6 items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          name="name"
          placeholder="新しいアイテム名"
          className="flex-1 border rounded px-4 py-2"
        />
        {/* URL の構造を変えた方が良さそう */}
        <input type="hidden" name="pantryId" value={pantry.id ?? ""} />
        <input type="hidden" name="userId" value={pantry.userId ?? ""} />
        <button
          type="submit"
          name="intent"
          value="add"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={fetcher.state !== "idle"}
        >
          {fetcher.state !== "idle" ? "追加中..." : "追加"}
        </button>
      </fetcher.Form>

      {/* Item List */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <fetcher.Form method="post">
                <input type="hidden" name="id" value={item.id} />
                <button
                  type="submit"
                  name="intent"
                  value="toggleFavorite"
                  // className={`text-xl ${
                  //   // item.isFavorite ? "text-yellow-400" : "text-gray-300"
                  // }`}
                >
                  ★
                </button>
              </fetcher.Form>
              <span>{item.name}</span>
            </div>

            <fetcher.Form method="post">
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                name="intent"
                value="delete"
                className="text-red-500 hover:underline"
              >
                削除
              </button>
            </fetcher.Form>
          </li>
        ))}
      </ul>
    </>
  );
}
