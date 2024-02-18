import Navbar, { type Link } from "../components/Navbar";

const links: Link[] = [
  { title: "Home", href: "/" },
  { title: "Product", href: "/product" },
  { title: "About", href: "/about" },
  { title: "Team", href: "/team" },
  { title: "Settings", href: "/settings" },
  { title: "Login", href: "/api/auth/login" },
];

export default function Home() {
  return (
    <>
      <Navbar links={links} />
      <main>
      </main>
    </>
  );
}
