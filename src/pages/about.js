import React from "react";
import PagesLayout from "../layouts/pages";
import niko from "../../static/img/nikoBonfire.jpg";
import { BodyContainer } from ".";
import Link from "gatsby-link";
import HTML from "../../.cache/default-html";

const Section = ({ children, title }) => (
  <div className="mt-6 leading-relaxed text-sm md:text-lg">
    <h2 className="text-xl font-semibold">{title}</h2>
    {children}
  </div>
);

const AboutPage = ({ data }) => (
  <PagesLayout>
    <BodyContainer>
      <h1 className="text-3xl font-semibold">The idea behind this page</h1>
      <p>
        <br />
        My job at <b> Lufthansa Technik </b>ended on September 20th 2020. <br />
        <br />
        <img
          src={niko}
          alt="<niko.jpg>"
          width="250"
          ALIGN="left"
          HSPACE="20"
          VSPACE="0"
        />
        An initially planned subsequent permanent contract with Lufthansa's
        <b> Industry Solutions </b>
        never materialized after a company-wide hiring freeze was put into place
        in response to the covid-19 economic shock on aviation industries.
        <br />
        <br />
        Equipped with a great
        <Link
          to="https://www.dropbox.com/s/t88mr27bp4spdrj/KoopmannGenericKomplett1007.pdf?dl=0"
          style={{ color: "#743411" }}
        >
          <span> employment-reference-letter</span>
        </Link>{" "}
        and 2.5 years of full-time programming experience, I was extremely
        confident that I would find the next coding job in no time. Having sent
        out quite a number of applications by now, I have come to realise that
        companies are not exactly looking for niche-science-majors
        (oceanography) who know how to code in Matlab.
        <br />
        <br />
        Instead a typical job posting reads like:
        <br />
        <br />
        <i>
          ...<b>Required tech-stack</b>: JavaEE, Spring, Hibernate, JS,
          Vue/React/Angular, CSS, Html, Jenkins, Gatsby, yaml, git, Python,
          Django, MongoDB, Docker/Kubernetes, REST, Kafka plus ideally
          experience in AI, machine learning and big data...
        </i>
        etc...
        <br />
        <br />
        The truth of the matter is that especially all the web-related
        technologies and all the frameworks are completely new territory for me.
        <br />
        <br />
        What I can do:
        <br />
        <br />
        <ol style={{ listStyleType: "square" }}>
          <li>
            I have sound experience in Object-Oriented-Programming, but I
            acquired such primarily in Matlab and basic Java without the use of
            any extra framework.
          </li>
          <li>
            I have done quite a bit of parallel programming in a scientific
            context.
          </li>
          <li>I have lots of experience in visualizing data.</li>
          <li>I have sound experience in git and Kanban.</li>
          <li>I can work with databases.</li>
        </ol>
      </p>
      <br />
      <br />
      Thus, I decided, I would study these new technologies until I reach a
      sufficient level in enough of them, so that my CV would finally catch the
      eyes of recruiters. Because all I need is someone giving me a chance to
      prove my self on the job, as I know that I would learn whatever is
      required of me swiftly and on the fly. <br />
      <br />
      To keep my CV up-to-date, I had the idea to migrate it from Latex directly
      to the web <a href="#oldCV">[1]</a>.
      <br />
      This approach has several benefits:
      <br />
      <br />
      <ol style={{ listStyleType: "decimal" }}>
        <li>I learn web technologies.</li>
        <li>I can directly update my CV about these new achievements.</li>
        <li>
          Using continuous deployment, the recruiters always have the latest
          version of my CV.
        </li>
        <li>
          I can prove, that I am able to adopt new technologies. I built this
          webpage in under a week, with 0 prior experience in any of the
          technologies used: JavaScript/HTML/CSS/React/Gatsby/GraphQL
        </li>
      </ol>
      <br />
      <br />
      So, if you read this, you are likely a potential employer or recruiter. If
      you think you might have a job for me, contact me at
      <i> nikolauskoopmann at gmail dot com</i>.
      <br />
      <br />
      <Section title="Thank you Andri!">
        <p>
          This project is a fork of
          <Link to="https://andri.dk" style={{ color: "#743411" }}>
            <span> andrioid's home-page</span>
          </Link>
          .
        </p>
      </Section>
      <div className="mt-10">
        <p className="text-sm" id="oldCV">
          [1] check out the Latex version{" "}
          <Link
            to="https://www.dropbox.com/s/t88mr27bp4spdrj/KoopmannGenericKomplett1007.pdf?dl=0"
            style={{ color: "#743411" }}
          >
            <span> here</span>
          </Link>
          .
        </p>
        <br />
        <p className="text-sm">
          Inspired by{" "}
          <a className="link" href="https://andri.dk/now/">
            Andri's now page
          </a>
          .
        </p>
      </div>
    </BodyContainer>
  </PagesLayout>
);

export default AboutPage;
