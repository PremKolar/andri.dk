import React from "react";

const NavLink = ({ href, children }) => (
    <li className="mr-6">
      <a className="text-white hover:text-gray-400" href={href}>
        {children}
      </a>
    </li>
  );
  
export default NavLink;
