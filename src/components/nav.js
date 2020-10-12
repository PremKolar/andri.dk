import React from "react";
import andratar from "../../static/img/niko.jpg";

export const NavItem = ({ children, href }) => (
  <a
    href={href}
    className="mt-4 lg:inline-block lg:mt-0 text-white hover:text-white-blue-300 mr-4"
  >
    {children}
  </a>
);

export const Nav = (props) => (
  <nav className="flex items-center justify-between flex-wrap bg-orange-600 p-6">
    <a href="/" className="">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          alt="avatar"
          src={andratar}
          className="rounded-full shadow-2xl w-8 h-8 mr-4 inline-block"
        />
        <span className="font-semibold text-xl tracking-tight inline-block">
          Niko
        </span>
      </div>
    </a>

    <div className="block flex-grow text-right">
      <NavItem href="/">home</NavItem>
      {/* <NavItem href="/blog/">Blog</NavItem> */}
      {/* <NavItem href="/about/">About</NavItem> */}
      {/* <NavItem href="/cv.pdf">CV</NavItem> */}
    </div>
  </nav>
);
