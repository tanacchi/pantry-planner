import { useLocation, useParams } from "@remix-run/react";

export default function UserRecipes() {
  const location = useLocation();
  const { userId } = useParams();
  return (
    <div>
      <h1>ユーザの調理可能レシピ一覧</h1>
      <p>path: {location.pathname}</p>
      <p>ユーザID: {userId}</p>
    </div>
  );
}
