import { useParams, useLocation } from "@remix-run/react";

export default function ShoppingListUserShopKind() {
  const { userId, shopKind } = useParams();
  const location = useLocation();
  return (
    <div>
      <h1>買い物リスト（ユーザー・店舗種別）</h1>
      <p>path: {location.pathname}</p>
      <p>userId: {userId}</p>
      <p>shopKind: {shopKind}</p>
    </div>
  );
}
