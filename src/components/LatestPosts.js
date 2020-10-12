import React from "react";
import ArticleList from "../components/ArticleList";
import Link from "gatsby-link";
const LatestPosts = ({data}) => {
  return (
    <div>
      <ArticleList posts={data.allMarkdownRemark.edges} />
      <div className="mt-4 px-4 md:px-0">
        <Link className="link" to="/blog">
          More posts...
        </Link>
      </div>
    </div>
  );
};

export default LatestPosts;
