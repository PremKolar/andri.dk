const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const buffer = require('buffer')

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Overlay } from './overlay'

// Default background from: https://pixabay.com/photos/lake-water-wave-mirroring-texture-2063957/
// Only used if nothing specified by options, or node.frontmatter.cover
const defaultBackgroundImage = path.join(
	__dirname,
	'./src/default-background.jpg'
)

export async function generateCard(
	{
		title = '',
		subtitle = '',
		backgroundImage = defaultBackgroundImage,
		authorImage64
	},
	oname
) {
	if (!fs.existsSync(backgroundImage)) {
		backgroundImage = defaultBackgroundImage
	}

	const svgbuffer = Buffer.from(
		ReactDOMServer.renderToStaticMarkup(
			<Overlay
				title={title}
				subtitle={subtitle}
				authorImage64={authorImage64}
			/>
		)
	)

	const infile = new fs.ReadStream(backgroundImage)
	const ostream = fs.WriteStream(oname)

	const overlayer = sharp()
		.resize({ width: 1200, height: 600 })
		.composite([{ input: svgbuffer, blend: 'over' }])
		.jpeg()
	return infile.pipe(overlayer).pipe(ostream)
}
