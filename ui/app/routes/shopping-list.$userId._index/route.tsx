// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import {
  ActionFunction,
  data,
  LoaderFunction,
} from "@remix-run/server-runtime";
import {
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { ShoppingItem } from "../../domain/shopping-item";
import { shoppingItemClient } from "../../lib/client/api/index.server";
import { validCategory } from "../../domain/item";

export type LoaderData = {
  shoppingItems: ShoppingItem[];
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData> => {
  const { userId } = params;
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }

  const shoppingItems = await shoppingItemClient.getItemsByUserId(Number(userId));

  return { shoppingItems };
};

export const action: ActionFunction = async ({ params, request }) => {
  const { userId } = params;
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }

  const formData = await request.formData();
  switch (formData.get("intent")) {
    case "add": {
      const name = formData.get("name");
      const category = formData.get("category")?.toString();

      if (!name) {
        throw new Response("Name is required", { status: 400 });
      }

      const item = await shoppingItemClient.createItem({
        name: name.toString(),
        category: validCategory(category) ? category : "Other",
        userId: Number(userId),
      });

      return data({ item });
    }
    case "delete": {
      const id = formData.get("id");
      if (!id) {
        throw new Response("ID is required", { status: 400 });
      }
      await shoppingItemClient.deleteItem(Number(id));
      return null;
    }
    default: {
      throw new Response("Invalid intent", { status: 400 });
    }
  }
};

export default function ShoppingListUser() {
  const { shoppingItems } = useLoaderData<LoaderData>();
  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Close modal when add action completes successfully
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setShowModal(false);
    }
  }, [fetcher.state, fetcher.data]);

  // Filter items based on search
  const searchQuery = searchParams.get("q") ?? "";
  const filteredItems = shoppingItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-gray-50" data-testid="shopping-list-page">
      <div className="w-full px-4 py-4 bg-white shadow-sm" data-testid="header">
        <h1 className="text-lg font-bold text-center" data-testid="page-title">買い物リスト</h1>
      </div>

      <div className="px-4 py-4">
        {/* Search Form */}
        <Form method="get" className="flex mb-4" data-testid="search-form">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="商品を検索..."
            className="flex-1 border-2 border-gray-300 rounded-l-lg px-3 py-3 text-base focus:border-blue-500 focus:outline-none"
            data-testid="search-input"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r-lg font-medium active:bg-blue-600 transition-colors"
            data-testid="search-button"
          >
            検索
          </button>
        </Form>

        {/* Shopping Items List */}
        <div className="space-y-3 pb-20" data-testid="shopping-items-list">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              data-testid={`shopping-item-${item.id}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base text-gray-900 mb-1" data-testid={`item-name-${item.id}`}>{item.name}</h3>
                  <span
                    className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
                    data-testid={`item-category-${item.id}`}
                  >
                    {item.category}
                  </span>
                </div>

                <fetcher.Form method="post">
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    name="intent"
                    value="delete"
                    className="text-red-500 active:text-red-700 p-2 -mr-2"
                    aria-label="削除"
                    data-testid={`delete-button-${item.id}`}
                  >
                    <HiTrash className="h-5 w-5" />
                  </button>
                </fetcher.Form>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-12 px-8" data-testid="empty-state">
            <div className="text-gray-400 text-4xl mb-4">🛒</div>
            <p className="text-base" data-testid="empty-message">
              {searchQuery ? "検索結果が見つかりません" : "買い物リストは空です"}
            </p>
            {!searchQuery && (
              <p className="text-sm text-gray-400 mt-2" data-testid="empty-guide">
                ＋ボタンから商品を追加してください
              </p>
            )}
          </div>
        )}
      </div>

      <FloatingAddButton onClick={openModal} />
      {showModal && (
        <AddItemModal onClose={closeModal} fetcher={fetcher} />
      )}
    </div>
  );
}

function FloatingAddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 bg-green-500 text-white text-2xl rounded-full shadow-lg active:bg-green-600 active:scale-95 transition-all duration-150"
      data-testid="add-item-button"
    >
      ＋
    </button>
  );
}

function AddItemModal({
  onClose,
  fetcher,
}: {
  onClose: () => void;
  fetcher: ReturnType<typeof useFetcher>;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-end justify-center z-50" data-testid="add-item-modal">
      <div className="bg-white rounded-t-2xl w-full max-h-[80vh] overflow-y-auto" data-testid="modal-content">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4" data-testid="modal-header">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold" data-testid="modal-title">商品を追加</h2>
            <button
              onClick={onClose}
              className="text-gray-400 active:text-gray-600 p-2 -mr-2"
              data-testid="modal-close-button"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <fetcher.Form method="post" className="space-y-6" data-testid="add-item-form">
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-gray-700" data-testid="name-label">商品名</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="例: 牛乳、パン、りんご"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:border-blue-500 focus:outline-none"
                required
                // eslint-disable-next-line jsx-a11y/no-autofocus -- modal dialog opened by explicit user action; WAI-ARIA dialog pattern moves focus into it
                autoFocus
                data-testid="name-input"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 font-medium text-gray-700" data-testid="category-label">カテゴリ</label>
              <select id="category" name="category" className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:border-blue-500 focus:outline-none" data-testid="category-select">
                <option value="Food">🍎 食品</option>
                <option value="Drink">🥤 飲料</option>
                <option value="Snack">🍪 お菓子</option>
                <option value="Spice">🧂 調味料</option>
                <option value="Other">📦 その他</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 active:bg-gray-50 transition-colors"
                data-testid="cancel-button"
              >
                キャンセル
              </button>
              <button
                type="submit"
                name="intent"
                value="add"
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-medium active:bg-green-600 transition-colors"
                data-testid="submit-button"
              >
                追加
              </button>
            </div>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}
