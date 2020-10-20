import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../layouts/layout";
import { SEO } from "../components/seo";
import FrontHeader from "../components/FrontHeader";
import LatestPosts from "../components/LatestPosts";
import Technology from "../components/Technology";
import Footer from "../components/Footer";
import CurriculumVitae from "../components/CurriculumVitae";

const IndexPage = ({ data }) => (
  <Layout>
    <h1>{data.name}</h1>
    <SEO />
    <FrontHeader data={data} />    
    <Section title="Latest Posts">
      <LatestPosts data={data} />
    </Section>
    <Section title="Curriculum Vitae">
      <CurriculumVitae data={data} />
    </Section>
    {/* <Section title="Technology" bgColorLevel={100}>
      <Technology data={data} />
    </Section> */}
    <Footer data={data} />
  </Layout>
);

const Section = ({ children, title }) => (
  <div className={`md:px-20 bg-pageBG lg:px-40 text-xl py-6`}>
    <h2 className="font-headline ml-6 md:ml-0 font-semibold text-xl md:text-2xl uppercase">
      {title}
    </h2>
    {children}
  </div>
);

// Wraps the text and handles margins
export const BodyContainer = ({ children, className }) => (
  <div className="mt-10 mx-5 md:mx-10 md:mx-20 lg:mx-40 text-xl md:max-w-4xl">
    {children}
  </div>
);

export const query = graphql`
  query ArticleList {
    allMarkdownRemark(
      limit: 3
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150, format: PLAIN)
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
            tags
            cover {
              publicURL
              childImageSharp {
                fluid(
                  maxWidth: 400
                  quality: 90
                  maxHeight: 200
                  fit: COVER
                  background: "#ffffff"
                ) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    cvJson {
      basics {
        name
        summary
        website
      }
      work {
        company
        startDate
        endDate
        skills
        highlights
        summary
        website
        position
        link
      }
      education {
        institution
        area
        studyType
        startDate
        endDate
        grade
        thesis
        thesislink
        info
      }
      classes {
        name
        startDate
        endDate
        technologies
        link
        platform
      }
      projects {
        what
        summary
        startDate
        endDate
        technologies
        link
      }
    }
  }
`;

export default IndexPage;
