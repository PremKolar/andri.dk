import React from 'react'

import ReactPDF, {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	PDFViewer,
	Image,
	Font
} from '@react-pdf/renderer'

import { hex } from 'wcag-contrast'

export const colors = {
	borders: '#d3d3d3',
	operations: '#259490',
	programming: '#2460A7',
	databases: '#491D70'
}

export const tagColors = {
	react: colors.programming,
	linux: colors.operations,
	gcp: colors.operations,
	mysql: colors.databases,
	firestore: colors.databases
}

export const Head = ({ src }) => (
	<Image
		source={src}
		resizeMode="contain"
		style={{
			width: 100,
			height: 100,
			borderRadius: 50,
			marginBottom: 10,
			borderColor: colors.borders,
			borderWidth: 1
		}}
	/>
)

export const SectionHeader = ({ children, color = 'black' }) => {
	//const first = children.substring(0, 1)
	const first = children.toUpperCase()
	const last = children.substring(1)
	return (
		<>
			<Text style={{ fontWeight: 'bold' }}>
				<Text style={{ color: color }}>{first}</Text>
			</Text>
			<View
				style={{
					width: 'auto',
					height: 1,
					borderBottomColor: colors.borders,
					borderBottomWidth: 0.5,
					marginBottom: 10
				}}
			/>
		</>
	)
}

export const Headline = ({ children }) => (
	<Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>
		{children}
	</Text>
)

export const TimelineItem = ({
	title,
	period,
	children,
	employer,
	tags,
	location
}) => (
	<View style={{ marginBottom: 10 }}>
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginBottom: 2.5
			}}
		>
			<Text style={{ fontWeight: 'bold' }}>
				{title}, <Text style={{ fontWeight: 'normal' }}>{employer}</Text>
			</Text>
			<Text>{period}</Text>
		</View>

		{children && <Text style={{ marginBottom: 5 }}>{children}</Text>}
		{tags && (
			<View style={{ flexDirection: 'row' }}>
				{tags &&
					tags.map(m => (
						<Tag key={m} color={tagColors[m.toLowerCase()]}>
							{m}
						</Tag>
					))}
			</View>
		)}
	</View>
)

export const Tag = ({ color = colors.borders, children }) => (
	<View
		style={{
			borderRadius: 2.5,
			borderWidth: 0.5,
			borderColor: color,
			marginRight: 2.5,
			marginVertical: 2.5,
			padding: 2.5,
			backgroundColor: color
		}}
	>
		<Text
			style={{
				fontSize: 6,
				fontWeight: 'bold',
				color: hex('#00000', color) < 10 ? 'white' : 'black'
			}}
		>
			{children}
		</Text>
	</View>
)

export const Box = ({ children, title, color }) => (
	<View style={{ marginBottom: 20 }}>
		<SectionHeader color={color}>{title}</SectionHeader>
		{children && typeof children === 'string' ? (
			<Text>{children}</Text>
		) : (
			children
		)}
	</View>
)

export const Paragraph = ({ children }) => (
	<Text style={{ marginBottom: 5 }}>{children}</Text>
)
