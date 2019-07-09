import React from 'react'
import Link from 'gatsby-link'
import { graphql } from 'gatsby'
import classNames from 'classnames'

import { Twitter, LinkedIn, Github } from '../components/social-icons'
import Img from 'gatsby-image'
import { ILike } from '../components/ilike'
import andratar from '../../static/img/coffee-art.jpg'
import { FaHeart } from 'react-icons/fa'
import { FaCalendarAlt as FaCalendar } from 'react-icons/fa'
import { SkillDataTransform, Skills } from '../components/skills/skills'
import ReactCountryFlag from 'react-country-flag'
import { Card } from '../components/card'

const IndexPage = ({ data }) => (
	<>
		<div className="flex flex-col font-sans md:min-h-one-third-screen text-white bg-blue-700">
			<nav className="flex items-end justify-end justify-between items-center p-8">
				<img
					src={andratar}
					className="rounded-full shadow-2xl w-16 h-16 md:invisible"
				/>
				<div>
					<ul className="flex flex-row">
						<NavLink href="blog/">Blog</NavLink>
						<NavLink href="cv.pdf">CV</NavLink>
					</ul>
				</div>
			</nav>
			<div className="mx-10 md:mx-20 pb-8 lg:mx-40 flex flex-row flex-wrap font-headline text-2xl">
				<div className="flex-1">
					<h2 className="font-headline md:text-6xl text-3xl font-semibold inline-block my-2">
						Hi, I'm Andri
					</h2>
					<div className="text-lg md:text-2xl">
						<p>
							Computer Engineer from &nbsp;
							<span aria-hidden>
								<ReactCountryFlag code="is" svg />
							</span>
							&nbsp;<span hidden>Iceland</span> living in &nbsp;
							<ReactCountryFlag code="dk" svg />
							<span hidden>Denmark</span>
						</p>
						<p>&nbsp;</p>
						<p>
							I make websites, create apps, manage infrastructure, develop
							products and more.
						</p>
					</div>
				</div>
				<div className="hidden md:block p-4 items-start justify-start flex mr-6">
					<img
						src={andratar}
						className="rounded-full shadow-2xl block mx-auto md:w-48 md:h-48"
					/>
				</div>
			</div>
		</div>
		<Section title="Latest Posts">
			<ArticleList posts={data.allMarkdownRemark.edges} />
			<div className="my-4 px-4 md:px-0">
				<Link to="/blog">More posts...</Link>
			</div>
		</Section>
		<Section title="Technology" bgColorLevel={100}>
			<div className="pl-6 md:pl-0 text-sm mb-4 italic">
				Sorted by experience. Preference indicated by{' '}
				<FaHeart className="inline text-red-700" />
			</div>
			<SkillDataTransform
				workSkills={data.cvJson.work}
				rootSkills={data.cvJson.skills}
			>
				{categories => (
					<Skills
						categories={categories}
						focus={[
							'React',
							'Go',
							'Linux',
							'Postgres',
							'React Native',
							'Kubernetes'
						]}
					/>
				)}
			</SkillDataTransform>
		</Section>

		<div className="font-headline text-xl flex flex-row font-sans h-16 text-white bg-blue-700 align-middle items-center justify-center">
			That's all folks
		</div>
	</>
)

const ArticleList = ({ posts }) => (
	<div className="flex flex-row flex-wrap justify-start">
		{posts
			.filter(post => post.node.frontmatter.title.length > 0)
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
							process.env.NODE_ENV !== 'production' && post.frontmatter.draft
						}
					/>
				)
			})}
	</div>
)

const NavLink = ({ href, children }) => (
	<li className="mr-6">
		<a className="text-white hover:text-gray-400" href={href}>
			{children}
		</a>
	</li>
)

// Wraps the text and handles margins
const BodyContainer = ({ children, className }) => (
	<div className="mt-10 mx-10 md:mx-20 lg:mx-40 text-xl">{children}</div>
)

const Section = ({
	children,
	title,
	bgColorBase = 'gray',
	bgColorLevel = 200
}) => (
	<div
		className={`md:px-20 lg:px-40 text-xl bg-${bgColorBase}-${bgColorLevel} pb-4`}
	>
		<h2 className="font-headline ml-6 md:ml-0 font-semibold text-xl md:text-2xl pt-4 uppercase">
			{title}
		</h2>
		{children}
	</div>
)

export const query = graphql`
	query ArticleList {
		allMarkdownRemark(
			limit: 4
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { fields: { draft: { ne: true } } }
		) {
			edges {
				node {
					excerpt(pruneLength: 150)
					id
					frontmatter {
						title
						date(formatString: "YYYY-MM-DD")
						path
						tags
						draft
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
`

export default IndexPage
