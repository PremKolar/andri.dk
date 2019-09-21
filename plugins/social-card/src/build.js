const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const buffer = require('buffer')

import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Overlay from './overlay'
import Card from './card'
import Split from './designs/split'

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
		authorImage64,
		design = 'default' // default, card, split
	},
	oname
) {
	if (!fs.existsSync(backgroundImage)) {
		backgroundImage = defaultBackgroundImage
	}

	let OverlayComponent
	switch (design) {
		case 'card':
			OverlayComponent = Card
			break
		default:
			// temp
			OverlayComponent = Overlay
		// OverlayComponent = Split
	}

	const svgbuffer = Buffer.from(
		ReactDOMServer.renderToStaticMarkup(
			<OverlayComponent
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
