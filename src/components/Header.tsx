import NavBar from "./NavBar";
import { getAuthUserDataFromSession, getUserData } from "@/utils/db-operation";

export default async function Header({ locale }: { locale?: string }) {
  const user = await getAuthUserDataFromSession();

  let userData = null;
  if (user) {
    userData = await getUserData(user.id);
  }

  const resetPoints = Math.max(
    (userData?.plan_limit || 0) - (userData?.plan_used || 0),
    0
  );

  console.log("header userPoints", resetPoints);

  return (
    <>
      <NavBar user={userData} locale={locale} points={resetPoints} />
    </>
  );
}
