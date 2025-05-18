// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useRef, useState } from "react";
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
import { validCategory } from "~/domain/item";

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
      const itemDto = {
        name: formData.get("name"),
        category: formData.get("category")?.toString(),
        quantity: formData.get("quantity"),
        unit: formData.get("unit")?.toString(),
        expiresAt: formData.get("expiresAt")?.toString(),
      }
      const name = formData.get("name");
      if (!name) {
        throw new Response("Name is required", { status: 400 });
      }
      if (typeof pantryId !== "string") {
        throw new Response("Pantry ID is required", { status: 400 });
      }
      if (typeof userId !== "string") {
        throw new Response("User ID is required", { status: 400 });
      }
      const item = await itemClient.addItem({
        name: name.toString(),
        pantryId: Number(pantryId),
        category: validCategory(itemDto.category) ? itemDto.category : "Other",
        quantity: !!itemDto.quantity ? Number(itemDto.quantity) : 1,
        unit: itemDto.unit?.toString() ?? "個",
        expiresAt: !!itemDto.expiresAt ? new Date(itemDto.expiresAt) : null,
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

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

      {/* Item List */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
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
      <FloatingAddButton onClick={openModal} />
      {showModal && <AddItemModal onClose={closeModal} fetcher={fetcher} pantry={pantry} />}
    </>
  );
}

function FloatingAddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white text-3xl rounded-full shadow-lg hover:bg-green-600"
    >
      ＋
    </button>
  );
}

function AddItemModal({
  onClose,
  fetcher,
  pantry,
}: {
  onClose: () => void;
  fetcher: ReturnType<typeof useFetcher>;
  pantry: Pantry;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">アイテム追加</h2>
        <fetcher.Form method="post" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">名前</label>
            <input
              type="text"
              name="name"
              placeholder="新しいアイテム名"
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">カテゴリ</label>
            <select name="category" className="w-full border rounded px-4 py-2">
              <option value="Food">食品</option>
              <option value="Drink">飲料</option>
              <option value="Other">その他</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">個数</label>
            <input
              type="number"
              name="quantity"
              defaultValue={1}
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">単位</label>
            <input
              type="text"
              name="unit"
              defaultValue="個"
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">賞味期限（任意）</label>
            <input
              type="date"
              name="expiresAt"
              className="w-full border rounded px-4 py-2"
            />
          </div>
          <input type="hidden" name="pantryId" value={pantry.id ?? ""} />
          <input type="hidden" name="userId" value={pantry.userId ?? ""} />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              キャンセル
            </button>
            <button
              type="submit"
              name="intent"
              value="add"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              追加
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  );
}
