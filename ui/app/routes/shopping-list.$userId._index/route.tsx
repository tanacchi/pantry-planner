import { useParams, useLocation } from "@remix-run/react";

export default function ShoppingListUser() {
  const { userId } = useParams();
  const location = useLocation();
  return (
    <div>
      <h1>買い物リスト（ユーザー別）</h1>
      <p>path: {location.pathname}</p>
      <p>userId: {userId}</p>
    </div>
  );
}
