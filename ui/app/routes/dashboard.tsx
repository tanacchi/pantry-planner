// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useTransition } from "react";
import { ActionFunction, LoaderFunction } from "@remix-run/server-runtime";
import {
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { UserDisplayName } from "../components/liff/UserDisplayName";
import { useLiff } from "../hooks/useLiff";
import { User } from "../domain/user";

type DashboardLoaderData = {
  title: string;
};

export const loader: LoaderFunction =
  async (): Promise<DashboardLoaderData> => {
    console.log("Loader called");
    return { title: "dashboard" };
  };

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
   switch (formData.get("intent")) {
    case "add": {
      const name = formData.get("name");
      if (!name) {
        throw new Response("Name is required", { status: 400 });
      }
      console.log("Adding item:", name);
      return null;
    }
    case "delete": {
      const id = formData.get("id");
      if (!id) {
        throw new Response("ID is required", { status: 400 });
      }
      console.log("Deleting item:", id);
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
  const { title } = useLoaderData<DashboardLoaderData>();
  const userFetcher = useFetcher<{ user: User }>();
  const user = userFetcher.data?.user;
  const { profile } = useLiff();
  useEffect(() => {
    if (!profile) {
      return;
    }
  }, [profile?.userId]);

  const fetcher = useFetcher();
  const [searchParams] = useSearchParams();
  const transition = useTransition();

  const isSubmitting = transition[0];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div>
        <UserDisplayName />
      </div>

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
        {user?.pantry.items.map((item) => (
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
    </div>
  );
}
