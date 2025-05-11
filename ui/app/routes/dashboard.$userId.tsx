import { data, LoaderFunction } from "@remix-run/server-runtime";
import { userClient } from "../lib/client/api/index.server";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { User } from "../domain/user";
import { UserProfile } from "../components/UserProfile";

export const loader: LoaderFunction = async ({ params }) => {
  const { userId } = params;
  const user = await userClient.getUserById(Number(userId));
  return data({ user });
};

export default function UserDashboard() {
  const { user } = useLoaderData<{ user: User }>();
  const pantries = [user.pantry];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <UserProfile user={user} />
      <div className="space-y-4">
        {pantries.map((pantry) => (
          <div key={pantry.id}>
            <Link
              to={`/dashboard/${user.id}/${pantry.id}`}
              className="text-blue-600 underline"
            >
              自宅の冷蔵庫
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
