import Navbar, { type Link } from "../components/Navbar";
import RecorderForm from "../components/RecorderForm";

const links: Link[] = [
  { title: "Home", href: "/" },
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
        <div className="flex flex-col items-center justify-center h-screen">
          <RecorderForm />
        </div>
      </main>
    </>
  );
}

