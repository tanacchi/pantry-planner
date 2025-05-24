import { useLocation, useParams } from "@remix-run/react";

export default function RecipeDetail() {
  const location = useLocation();
  const { recipeId } = useParams();
  return (
    <div>
      <h1>レシピ詳細ページ</h1>
      <p>path: {location.pathname}</p>
      <p>レシピID: {recipeId}</p>
    </div>
  );
}
