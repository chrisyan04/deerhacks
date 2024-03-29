'use client'

import Navbar, { type Link } from "../../components/Navbar";
import { useUser } from "@auth0/nextjs-auth0/client"
import Image from "next/image";

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
        <p style={{ fontSize: '32px' }}>"Interventions aiming to support students in reflecting  on course material by voice"</p>
            <div className="flex flex-col align-items items-center">
                <br>
                </br>
              <p>Recent studies have found that those who engage in voice reflections followed by answering questions on a given topic required fewer attempts to answer correctly compared to peers who did not reflect. The objective of Voice Reflections is to capitalize on the benefits voice recordings yield comparable to traditional study methods during homework tasks. The team has developed a tool which prompts students to practice post-lecture reflection to encourage deeper thinking and maximize engagement. Additionally, we are exploring the integration of large language models to enhance interactivity, enabling students to respond to and pose questions based on their reflections.</p>
            </div>

        </div>
      </div>
      </main>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#829CF6', padding: '10px', borderRadius: '10px',color: 'white' }}>
        <a href = "https://www.josephjaywilliams.com/projects_1#h.zfexrj4h4nu">Read more about IAI Lab
        </a>
      </div>
    </>
  );
}
