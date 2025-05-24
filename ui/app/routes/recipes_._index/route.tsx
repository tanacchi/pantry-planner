import { useLocation } from "@remix-run/react";

export default function RecipesIndex() {
  const location = useLocation();
  return (
    <div>
      <h1>サービス登録済みレシピ一覧</h1>
      <p>path: {location.pathname}</p>
    </div>
  );
}
