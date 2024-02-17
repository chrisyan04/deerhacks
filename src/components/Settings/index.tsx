"use client";

import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Settings() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user)
    return (
      <div className="text-4xl flex flex-col justify-center items-center h-screen">
        Not logged in
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="flex flex-col align-items items-center">
        <Image
          src={user.picture ?? ""}
          alt={user.name ?? ""}
          width={200}
          height={200}
        />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          <button>
            <a href="/api/auth/logout">Logout</a>
          </button>
        </div>
      </div>
    </div>
  );
}
