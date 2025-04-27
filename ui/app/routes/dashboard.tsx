import { data, LoaderFunction, redirect } from "@remix-run/server-runtime";
import { defer } from "@remix-run/node"; // or cloudflare/deno
import {
  Await,
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { useTransition } from "react";
import React from "react";

type DashboardLoaderData = {
  title: string;
  items: Promise<Item[]>;
};

type Item = {
  id: number;
  name: string;
  isFavorite: boolean;
};

let ITEMS: Item[] = [
  { id: 1, name: "Milk", isFavorite: false },
  { id: 2, name: "Eggs", isFavorite: true },
  { id: 3, name: "Bread", isFavorite: false },
];

export const loader: LoaderFunction = async ({
  request,
}: {
  request: Request;
}): Promise<DashboardLoaderData> => {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.toLowerCase() ?? "";
  const filtered = new Promise<Item[]>((resolve) => {
    setTimeout(() => {
      resolve(ITEMS.filter((item) => item.name.toLowerCase().includes(query)));
    }, 1000);
  });
  return { title: "dashboard", items: filtered };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = Number(formData.get("id"));
  const name = (formData.get("name") as string)?.trim();

  if (intent === "add") {
    if (!name) {
      return data({ error: "名前を入力してください" }, { status: 400 });
    }
    const newItem = {
      id: ITEMS.length ? Math.max(...ITEMS.map((i) => i.id)) + 1 : 1,
      name,
      isFavorite: false,
    };
    ITEMS.push(newItem);
    return redirect("/dashboard");
  }

  if (intent === "delete") {
    ITEMS = ITEMS.filter((item) => item.id !== id);
    return data({ success: true });
  }

  if (intent === "toggleFavorite") {
    const item = ITEMS.find((i) => i.id === id);
    if (item) {
      item.isFavorite = !item.isFavorite;
    }
    return data({ success: true });
  }

  return data({ error: "Invalid action" }, { status: 400 });
};

export const shouldRevalidate = ({ formMethod }: { formMethod: string }) => {
  return formMethod === "GET"; // 検索クエリ時のみ再検証
};

export default function Dashboard() {
  const { title, items: itemPromise } = useLoaderData<DashboardLoaderData>();
  const fetcher = useFetcher();
  const [searchParams, setSearchParams] = useSearchParams();
  const transition = useTransition();

  const isSubmitting = transition[0];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>

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
      <Form method="post" className="flex mb-6 items-center gap-2">
        <input
          type="text"
          name="name"
          placeholder="新しいアイテム名"
          className="flex-1 border rounded px-4 py-2"
        />
        <button
          type="submit"
          name="intent"
          value="add"
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "追加中..." : "追加"}
        </button>
      </Form>

      {/* Item List */}
      <ul className="space-y-4">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Await resolve={itemPromise}>
            {(items) => items.map((item) => (
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
                      className={`text-xl ${
                        item.isFavorite ? "text-yellow-400" : "text-gray-300"
                      }`}
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
          </Await>
        </React.Suspense>
      </ul>
    </div>
  );
}
