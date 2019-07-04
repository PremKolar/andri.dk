import React, { useEffect, useState } from 'react'

export function SkillDataTransform({ workSkills, rootSkills, children }) {
	const [categories, setCategories] = useState([])
	useEffect(() => {
		for (const c of rootSkills) {
			c.keywords = c.keywords.sort((a, b) => {
				return a > b
			})
		}
		setCategories(rootSkills)
	}, [workSkills, rootSkills])

	return children(categories)
}

export function Skills({ categories }) {
	console.log(categories)
	if (!categories) {
		console.log(categories)
		return null
	}
	return (
		<div className="flex flex-row flex-wrap justify-between">
			{categories.map(c => (
				<div
					key={c.name}
					className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col p-6 md:p-0 mb-4 lg:mb-0"
				>
					<h2
						className="font-light uppercase text-base mb-4"
						style={{ color: c.color }}
					>
						{c.name}
					</h2>
					<div className="">
						{c.keywords.map(s => (
							<span
								key={s}
								className="inline-block bg-gray-300 rounded-lg px-3 py-1 text-sm font-semibold text-gray-100 mr-2 mb-2 shadow-md"
								style={{
									backgroundColor: c.color
								}}
							>
								{s}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
