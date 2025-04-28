import { useLiff } from "../../hooks/useLiff";

export function UserDisplayName() {
  const { profile } = useLiff();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={profile.pictureUrl ?? ""} alt="Profile" className="w-10 h-10 rounded-full" />
      <span>こんにちは、{profile.displayName}さん！</span>
    </div>
  );
}
