'use client'

import Navbar, { type Link } from "../../components/Navbar";
import Settings from "../../components/Settings";
import { useUser } from "@auth0/nextjs-auth0/client"

const links: Link[] = [
  { title: "Home", href: "/" },
  { title: "Product", href: "/product" },
  { title: "About", href: "/about" },
  { title: "Team", href: "/team" },
  { title: "Settings", href: "/settings" },
  { title: "Login", href: "/api/auth/login", disabled: false },
];

export default function Home() {
  const { user } = useUser();
  return (
    <>
      <Navbar links={links} isLoggedIn={!!user} />
      <main>
        <Settings />
      </main>
    </>
  );
}
