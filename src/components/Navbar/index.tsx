"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "@/public/next.svg";
import "./Navbar.css";

export interface Link {
  title: string;
  href: string;
}

export default function NavBar({ links }: { links: Link[] }) {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <header
      className={`fixed w-full flex justify-between z-10 backdrop-blur-sm px-4 pt-2 bg-transparent shadow-2xl ${
        toggle &&
        "h-full pb-[calc(100vh-5em)] transition duration-1000 ease-in-out md:h-auto md:pb-0 md:transition-none portrait:h-auto"
      }`}
    >
      <a href="/#intro" tabIndex={0}>
        <Image priority src={logo} alt="DS3 Logo" />
      </a>
      <nav
        className={`fixed w-full left-0 -top-[100vh] duration-1000 md:static md:w-auto md:duration-0 md:visible ${
          toggle
            ? "h-full visible translate-y-[calc(100vh_+_5em)] transition ease-in-out duration-1000 md:h-auto md:transform-none md:transition-none"
            : "invisible"
        } `}
      >
        <ul
          className={`mb-0 md:pl-0 flex flex-wrap justify-between items-center ${
            toggle && "active"
          }`}
        >
          {links.map(({ href, title }: Link, id) => {
            return (
              <li
                className="item block order-3 w-full text-center p-[10px] md:relative md:w-auto"
                key={id}
              >
                {href.includes("#") ? (
                  <a
                    className="block text-2xl md:text-lg text-white px-[5px] py-[15px] font-bold"
                    href={encodeURI(href)}
                    onClick={() => setToggle(false)}
                  >
                    {title}
                  </a>
                ) : (
                  <Link
                    className="block text-2xl md:text-lg text-white px-[5px] py-[15px] font-bold"
                    href={encodeURI(href)}
                    onClick={() => setToggle(false)}
                  >
                    {title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* <Badge /> */}
      <div
        className={`toggle md:hidden md:pointer-events-none w-[65px] h-[65px] relative mt-[10px] caret-transparent cursor-pointer rotate-0 transition ease-in-out duration-500 motion-reduce:transition-none ${
          toggle && "open"
        } `}
        onClick={() => setToggle(!toggle)}
      >
        {[...Array(6)].map((_, id) => {
          return (
            <span
              key={id}
              className="block absolute h-[9px] w-1/2 bg-white  opacity-100 rotate-0"
            ></span>
          );
        })}
      </div>
    </header>
  );
}
