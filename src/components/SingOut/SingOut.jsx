"use client";

import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    router.replace("/");
  };
  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
