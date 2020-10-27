module.exports = {
  siteMetadata: {
    title: `Nikos CV`,
    description: "My website, that shall help me score a job!",
    siteUrl:
      process.env.NODE_ENV === "production"
        ? "https://nikoop.de"
        : "http://localhost:8000",
    author: "Nikolaus Koopmann",
    social: {},
  },
  plugins: [
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/favicon.png",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Available options and their defaults:
        base64Width: 20,
        forceBase64Format: ``, // valid formats: png,jpg,webp
        useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
        stripMetadata: true,
        defaultQuality: 50,
        failOnError: true,
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-social-cards",
      options: {
        authorImage: "./static/img/nikoBonfire.jpg",
        backgroundImage: "./static/img/goldenIndo.jpg",
        defaultAuthor: "Nikolaus Koopmann",
        design: "card",
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
				{
					site {
						siteMetadata {
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}
		  		`,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                });
              });
            },
            query: `
						{
							allMarkdownRemark(
								sort: { order: DESC, fields: [frontmatter___date] },
								filter: { frontmatter: { draft: { ne: true } } }
							) {
								edges {
									node {
										excerpt
										html
										frontmatter {
											path
											title
											date
										}
									}
								}
							}
						}
						`,
            output: "/rss.xml",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            title: "Nikos Blog",
            match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-draft",
      options: {
        publishDraft: process.env.NODE_ENV !== "production",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: `${__dirname}/static/img/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pdf`,
        path: `${__dirname}/static/pdf/`,
      },
    },
    "gatsby-transformer-json", // Resume JSON
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "./src/cv",
      },
    },

    `gatsby-plugin-react-helmet`,
    "gatsby-plugin-catch-links",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-prismjs",
            options: {},
          },
          {
            resolve: "gatsby-remark-images",
            //tracedSVG: true,
            options: {
              maxWidth: 896,
              wrapperStyle: "max-width: 896px;",
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-goatcounter",
      options: {
        code: "andrioid",
      },
    },
  ],
};
