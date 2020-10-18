import React from "react";
import andratar from "../../static/img/nikoBonfire.jpg";
import NavLink from "../components/NavLink"


const FrontHeader = ({data}) => {
  return (
    <div
      className="flex flex-col font-sans md:min-h-one-third-screen text-white bg-blue-700 bg-fixed"
      style={{
        background: `url(${require("../../static/img/goldenIndo_smaller.png")})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "darken",
        backgroundPosition: "center top"
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, .4)",
          flex: 1,
        }}
      >
        <nav className="flex items-end justify-end justify-between items-center p-8">
          {/* <img
            alt="round profile"
            src={andratar}
            className="rounded-full shadow-2xl w-16 h-16 md:invisible"
          /> */}
          <div></div>
          <div  align="right">
            <ul className="flex flex-row">
              {/* <NavLink href="blog/">Blog</NavLink> */}

              <NavLink href="about/">about</NavLink>
              {/* <NavLink href="cv.pdf">CV</NavLink> */}
            </ul>
          </div>
        </nav>
        <div className="mx-10 md:mx-20 pb-8 lg:mx-40 flex flex-row flex-wrap font-headline text-2xl">
          <div className="flex-1">
            <h2 className="font-headline md:text-6xl text-3xl font-semibold inline-block my-2">
              Nikolaus Koopmann
            </h2>
            <div className="text-lg md:text-2xl">
              <p>
                Hamburg            
              </p>
              <p>&nbsp;</p>
              <p>
                {data.cvJson.basics.summary}
              </p>
            </div>
          </div>
          {/* <div className="hidden md:block p-4 items-start justify-start flex mr-8">
            <img
              alt="round profile"
              src={andratar}
              className="shadow-2xl block mx-auto md:w-48 md:h-48"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FrontHeader;
