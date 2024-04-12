import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DropDownCategory = () => {
	const [categories, setCategories] = useState([])
	const [selectedCategories, setSelectedCategories] = useState([])
	const [selectedCategoriesTitle, setSelectedCategoriesTitle] = React.useState(
		[]
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					'https://b2pshop.click/api/v2/directory/categories'
				)
				setCategories(response.data)
			} catch (error) {
				console.error('Error fetching data:', error)
				setCategories([])
			}
		}
		fetchData()
	}, [])

	const handleCategorySelect = (categoryId, categoryTitle) => {
		setSelectedCategories([...selectedCategories, categoryId])
		setSelectedCategoriesTitle([categoryTitle, ...selectedCategoriesTitle])
		console.log(' selectedCategoriesTitle', selectedCategoriesTitle)
	}

	const handleCategoryDeselect = (categoryId, categoryTitle) => {
		setSelectedCategories(selectedCategories.filter(id => id !== categoryId))
	}
	return (
		<div>
			<h2>Мужская одежда</h2>
			<ul>
				{categories.map(category => {
					if (category.title === 'Мужская одежда') {
						return category.categories.map(subcategory => (
							<li key={subcategory.id}>
								<button
									onClick={() =>
										handleCategorySelect(subcategory.id, subcategory.title)
									}
									style={{
										backgroundColor: selectedCategories.includes(subcategory.id)
											? 'blue'
											: 'transparent',
										color: selectedCategories.includes(subcategory.id)
											? 'white'
											: 'black',
									}}
								>
									{subcategory.title}
								</button>

								{selectedCategories.includes(subcategory.id) && (
									<span
										style={{ cursor: 'pointer' }}
										onClick={() =>
											handleCategoryDeselect(subcategory.id, subcategory.title)
										}
									>
										&#10006;
									</span>
								)}
							</li>
						))
					}
					return null
				})}
			</ul>
			<h2>Женская одежда</h2>
			<ul>
				{categories.map(category => {
					if (category.title === 'Женская одежда') {
						return category.categories.map(subcategory => (
							<li key={subcategory.id}>
								<button
									onClick={() => handleCategorySelect(subcategory.id)}
									style={{
										backgroundColor: selectedCategories.includes(subcategory.id)
											? 'blue'
											: 'transparent',
										color: selectedCategories.includes(subcategory.id)
											? 'white'
											: 'black',
									}}
								>
									{subcategory.title}
								</button>
								{selectedCategories.includes(subcategory.id) && (
									<span
										style={{ cursor: 'pointer' }}
										onClick={() => handleCategoryDeselect(subcategory.id)}
									>
										&#10006;
									</span>
								)}
							</li>
						))
					}
					return null
				})}
			</ul>
		</div>
	)
}

export default DropDownCategory
