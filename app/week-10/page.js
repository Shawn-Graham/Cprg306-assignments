"use client";
import { useRouter } from "next/navigation"
import { useUserAuth } from "./_utils/auth-context";
import { useState } from "react";

const Page = () => {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub Sign-In Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-Out Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="textAlign left">
      {user ? (
        <>
        <h1 className="text-4xl font-bold mb-5">Shopping List App</h1>
          <div className="text-lg">
          <p>Signed in as {user.displayName} ({user.email})</p>
          <p><button className="text-lg hover:underline" onClick={handleSignOut}>Sign Out</button></p>
         <p><button className="text-lg hover:underline" onClick={() => router.push("/week-8")}>Go to shopping list</button></p>
            </div>
        </>
      ) : (
        <><h1 className="text-4xl font-bold mb-5">Shopping List App</h1><button onClick={handleSignIn}>Sign in with GitHub</button></>
      )}
    </div>
  );
};

export default Page;
