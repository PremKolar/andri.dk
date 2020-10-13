import React from "react";
import { Twitter, LinkedIn, Github } from "../components/social-icons";

const Footer = ({ data }) => {
  return (
    <div className="text-lg px-10 md:px-20 lg:px-40 py-10 flex justify-between">
      <span className="italic">{data.cvJson.basics.name}</span>
      <div>
        {/* <Twitter user="TODO" /> */}
        <Github user="PremKolar" />
        <LinkedIn user="nikolaus-koopmann-447444107" />
      </div>
    </div>
  );
};

export default Footer;
