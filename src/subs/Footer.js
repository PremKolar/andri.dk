import React from "react";
import { Twitter, LinkedIn, Github } from "../components/social-icons";

const Footer = ({data}) => {

  return (
    <div className="text-lg px-10 md:px-20 lg:px-40 py-10 flex justify-between">
      <span className="italic">data.name</span>
      <div>
        <Twitter user="andrioid" />
        <Github user="andrioid" />
        <LinkedIn user="andriosk" />
      </div>
    </div>
  );
};

export default Footer;
