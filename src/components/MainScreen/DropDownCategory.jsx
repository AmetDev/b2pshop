import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCategoryReducer,
	setCategoryTitleReducer,
} from '../redux/slices/SelectedCategory'

const DropDownCategory = () => {
	const dispatch = useDispatch()
	const [categories, setCategories] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { categoriesRedux } = useSelector(state => state.selectedCategories)
	const { categoriesReduxTitle } = useSelector(
		state => state.selectedCategories
	)
	const [allCategoriesSelected, setAllCategoriesSelected] = useState(false)

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
		dispatch(setCategoryReducer([...categoriesRedux, { id: categoryId }]))
		dispatch(
			setCategoryTitleReducer([
				...categoriesReduxTitle,
				{ title: categoryTitle },
			])
		)
	}

	const handleCategoryDeselect = (categoryId, categoryTitle) => {
		dispatch(
			setCategoryReducer(categoriesRedux.filter(cat => cat.id !== categoryId))
		)
	}

	const handleAllCategoriesSelect = () => {
		if (!allCategoriesSelected) {
			dispatch(setCategoryReducer([])) // Clear the state
		}
		setAllCategoriesSelected(!allCategoriesSelected)
	}

	const filterCategories = (categories, query) => {
		return categories.filter(category => {
			const titleMatch = category.title
				.toLowerCase()
				.includes(query.toLowerCase())
			const subcategoriesMatch = category.categories.some(subcategory =>
				subcategory.title.toLowerCase().includes(query.toLowerCase())
			)
			return titleMatch || subcategoriesMatch
		})
	}

	const filteredCategories = filterCategories(categories, searchQuery)

	return (
		<div>
			<input
				type='text'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				placeholder='Search categories'
			/>
			<div key='all-categories'>
				<h2>All Categories</h2>
				<button
					onClick={handleAllCategoriesSelect}
					style={{
						backgroundColor: allCategoriesSelected ? 'blue' : 'transparent',
						color: 'white',
					}}
				>
					Все категории
				</button>
				{allCategoriesSelected && (
					<span
						style={{ cursor: 'pointer', marginLeft: '10px' }}
						onClick={handleAllCategoriesSelect}
					>
						&#10006;
					</span>
				)}
			</div>
			{filteredCategories.map(category => (
				<div key={category.id}>
					<h2>{category.title}</h2>
					<ul>
						{category.categories.map(subcategory => (
							<li key={subcategory.id}>
								<button
									onClick={() =>
										handleCategorySelect(subcategory.id, subcategory.title)
									}
									style={{
										backgroundColor: categoriesRedux.some(
											cat => cat.id === subcategory.id
										)
											? 'blue'
											: 'transparent',
										color: categoriesRedux.some(
											cat => cat.id === subcategory.id
										)
											? 'white'
											: 'black',
									}}
								>
									{subcategory.title}
								</button>
								{categoriesRedux.some(cat => cat.id === subcategory.id) && (
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
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default DropDownCategory
