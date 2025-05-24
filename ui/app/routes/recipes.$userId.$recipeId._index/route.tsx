import { useLocation, useParams } from "@remix-run/react";

export default function UserRecipeDetail() {
  const location = useLocation();
  const { userId, recipeId } = useParams();
  return (
    <div>
      <h1>ユーザ作成料理の詳細</h1>
      <p>path: {location.pathname}</p>
      <p>ユーザID: {userId}</p>
      <p>レシピID: {recipeId}</p>
    </div>
  );
}
