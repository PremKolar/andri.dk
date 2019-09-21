# gatsby-plugin-social-card

Automatically parses your posts and generates social cards for Twitter, Slack, Facebook and other sites.

To learn more about social-cards in general, check out [open graph](https://ogp.me/#structured), [twitter cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards.html) and this [CSS tricks article on meta-tags for social](https://css-tricks.com/essential-meta-tags-social-media/).

### Current Status: Beta

I'm using this for [andri.dk](https://andri.dk) and it works for me, both locally and for Netlify builds. Contact me on [Twitter](https://twitter.com/andrioid) if you're testing this and it fails.

Only works for remark nodes at the moment.

## Features

### Designs

There are two design available now, "card" and "default". But we can expand that later.

![default card design](https://github.com/andrioid/andri.dk/blob/master/plugins/social-card/img/default-design.jpg?raw=true)

![default card design](https://github.com/andrioid/andri.dk/blob/master/plugins/social-card/img/card-design.jpg?raw=true)

![default card design](https://github.com/andrioid/andri.dk/blob/master/plugins/social-card/img/cover-custom-author.jpg?raw=true)

### Custom Backgrounds

You can put a cover frontmatter on your post, and we'll use that. Otherwise, we'll use a default-background that you can specify or if that fails, we'll use a fallback one.

### Custom Author image

If specified, an author image is shown on the image. That is also configurable.

### Powerd by SVG, React and Sharp

We use the same underlying library that powers gatsby-images to convert our React generated SVG files into images.

## Install

```sh
yarn add @andrioid/gatsby-plugin-social-cards
# or npm install --save @andrioid/gatsby-plugin-social-cards
```

## How to use

Configure our site to use the plugin by editing `gatsby-config.js`. You don't need to specify options.

```js
plugins: [
	{
		'@andrioid/gatsby-plugin-social-cards',
	}
]
```

If you want to customise the look of the cards, try these options.

```js
plugins: [
	{
		resolve: '@andrioid/gatsby-plugin-social-cards',
		options: {
			// ommit to skip
			authorImage: './static/img/coffee-art.jpg',
			// image to use when no cover in frontmatter
			backgroundImage: './static/img/hvitserkur.JPG',
			// author to use when no auth in frontmatter
			defaultAuthor: 'Andri Óskarsson',
			// card design
			design: 'default' // 'default' or 'card'
		}
	}
]
```

Then you need to add the meta tags to your site. For a more complete example of meta tags, check out [seo.js](https://github.com/kentcdodds/kentcdodds.com/blob/master/src/components/seo/index.js)
from [Kent C. Dodds](www.kentcdodds.com).

```jsx
import Helmet from 'react-helmet'

const image = node.frontmatter.socialcard

export const SEO = ({ postData, frontmatter = {}, metaImage, isBlogPost }) => (
	<Helmet>
		{/* Your other meta tags... */}
		<meta name="image" content={image} />
		<meta property="og:image" content={image} />
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:image" content={image} />
	</Helmet>
)
```

## Pitfalls

### Fonts

We use sharp to convert our SVG images to JPG. The means that the fonts available to you are limited to those of the build-machine.

### VIPS image library

Depending on your installation, SVG support in [libvips](https://libvips.github.io/libvips/) (used by Sharp) might be missing.

It needs to be built with JPEG and SVG support.
