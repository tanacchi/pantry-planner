import { User } from "../domain/user";

export function UserProfile(props: { user: User }) {
  const { user } = props;
  if (!user) {
    return <span>ユーザーデータがありません</span>;
  }
  return (
    <div className="text-sm text-gray-500">
      <div className="text-sm text-gray-500">
        ユーザーID: {user.id}
        <br />
        LINE UID: {user.lineUid}
        <br />
      </div>
      <div className="text-sm text-gray-500">
        最終ログイン: {user.lastLoginAt.toDateString()}
      </div>
    </div>
  );
}
