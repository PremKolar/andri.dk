import React from "react";
import { Card } from "../components/card";

const ArticleList = ({ posts }) => (
  <div className="flex flex-wrap justify-start items-stretch">
    {posts
      .filter((post) => post.node.frontmatter.title.length > 0)
      .map(({ node: post }) => {
        return (
          <Card
            key={post.id}
            title={post.frontmatter.title}
            link={post.frontmatter.path}
            description={post.excerpt}
            tags={post.frontmatter.tags}
            date={post.frontmatter.date}
            draft={
              process.env.NODE_ENV !== "production" && post.frontmatter.draft
            }
          />
        );
      })}
  </div>
);

export default ArticleList;
