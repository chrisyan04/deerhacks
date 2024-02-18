'use client'

import Navbar, { type Link } from "../../components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image"
import ourTeam from "../../public/team1.jpeg"

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
      
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        
        <div className="flex flex-col justify-center items-center h-screen w-full">
        <Image src={ourTeam} alt="Our Team" width={400} height={400} style={{ width: '400px', height:'auto'}}/>
            <div className="flex flex-col align-items items-center">
                <br>
                </br>
              <p>Meet Chris, Shrey, Orhan and Brandan, the team behind VoiceReflections. They are a group of tech enthusiasts dedicated towards re-imagining how we approach education. What if we lived in a world where students had easy access to succintly review and retain information from lecture? This question led the team at VoiceReflections, to implement their take on this new educational vision. </p>
            </div>

        </div>
      </div>
      </main>
    </>
  );
}