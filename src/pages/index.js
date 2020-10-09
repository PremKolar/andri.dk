import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../layouts/layout";
import { SEO } from "../components/seo";
import FrontHeader from "../subs/FrontHeader";
import LatestPosts from "../subs/LatestPosts";
import Technology from "../subs/Technology";
import Footer from "../subs/Footer";
import Experience from "../subs/Experience";

const IndexPage = ({ data }) => (
  <Layout>
    <h1>{data.name}</h1>
    <SEO />
    <FrontHeader data={data} />
    <Section title="Latest Posts">
      <LatestPosts data={data} />
    </Section>
    <Section title="Technology" bgColorLevel={100}>
      <Technology data={data} />
    </Section>
    <Section title="Experience" bgColorLevel={100}>
      <Experience data={data} />
    </Section>
    <Footer />
  </Layout>
);

// const NavLink = ({ href, children }) => (
//   <li className="mr-6">
//     <a className="text-white hover:text-gray-400" href={href}>
//       {children}
//     </a>
//   </li>
// );

// Wraps the text and handles margins
// export const BodyContainer = ({ children, className }) => (
//   <div className="mt-10 mx-5 md:mx-10 md:mx-20 lg:mx-40 text-xl md:max-w-4xl">
//     {children}
//   </div>
// );


const Section = ({
  children,
  title,
  bgColorBase = "gray",
  bgColorLevel = 200,
}) => (
  <div
    className={`md:px-20 lg:px-40 text-xl bg-${bgColorBase}-${bgColorLevel} py-6`}
  >
    <h2 className="font-headline ml-6 md:ml-0 font-semibold text-xl md:text-2xl uppercase">
      {title}
    </h2>
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
          excerpt(pruneLength: 250, format: PLAIN)
          id
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
            tags
            draft
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
      skills {
        name
        level
        keywords
        color
      }
      work {
        company
        startDate
        endDate
        skills
      }
    }
  }
`;

export default IndexPage;
