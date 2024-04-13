import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCategoryReducer,
	setCategoryTitleReducer,
} from '../redux/slices/SelectedCategory'
import CloseIcon from './CloseIcon'
import CloseIconActive from './CloseIconActive'
import style from './DropDownCater.module.scss'
import SearchIcon from './SearchIcon'
const DropDownCategory = () => {
	const dispatch = useDispatch()
	const [categories, setCategories] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const { categoriesRedux } = useSelector(state => state.selectedCategories)
	const { categoriesReduxTitle } = useSelector(
		state => state.selectedCategories
	)
	const [allCategoriesSelected, setAllCategoriesSelected] = useState(false)
	const [isFocused, setIsFocused] = useState(false)

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

	const handleClearQuery = event => {
		event.stopPropagation() // Prevent event bubbling
		setSearchQuery('')
	}

	const handleCategorySelect = (categoryId, categoryTitle) => {
		// Проверка наличия элемента в списке categoriesRedux
		if (!categoriesRedux.some(cat => cat.id === categoryId)) {
			dispatch(setCategoryReducer([...categoriesRedux, { id: categoryId }]))
			dispatch(
				setCategoryTitleReducer([
					...categoriesReduxTitle,
					{ title: categoryTitle },
				])
			)
		}
	}

	const handleCategoryDeselect = (categoryId, categoryTitle) => {
		dispatch(
			setCategoryReducer(categoriesRedux.filter(cat => cat.id !== categoryId))
		)
		dispatch(
			setCategoryTitleReducer(
				categoriesReduxTitle.filter(
					category => category.title !== categoryTitle
				)
			)
		)
	}
	const handleMouseEnter = () => {
		setIsFocused(true)
	}

	const handleMouseLeave = () => {
		setIsFocused(false)
	}

	const handleAllCategoriesSelect = () => {
		if (!allCategoriesSelected) {
			dispatch(setCategoryReducer([])) // Clear the state
			dispatch(setCategoryTitleReducer([]))
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
	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}

	const filteredCategories = filterCategories(categories, searchQuery)

	return (
		<div className={style.wrapperDropDown}>
			<div className={style.InputWrapper}>
				<input
					type='text'
					placeholder='Поиск'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onMouseEnter={handleMouseEnter} // Обработчик для наведения курсора на input
					onMouseLeave={handleMouseLeave} // Обработчик для ухода курсора с input
				/>
				{searchQuery.length == 0 ? (
					<div className={style.focusedIcon}>
						<SearchIcon />
					</div>
				) : (
					<div
						onMouseEnter={handleMouseEnter} // Обновляем состояние isFocused
						onClick={handleClearQuery}
						className={style.focusedIcon}
					>
						<CloseIcon />
					</div>
				)}
			</div>
			<div className={style.firstBtn} key='all-categories'>
				<button
					onClick={handleAllCategoriesSelect}
					className={
						allCategoriesSelected
							? `${style.clickedSize}`
							: `${style.nonClicked}`
					}
				>
					<span
						className={
							allCategoriesSelected ? style.spanClicked : style.nonClicked
						}
					>
						Все категории
					</span>
				</button>
			</div>
			{filteredCategories.map(category => (
				<div key={category.id}>
					<h4 className={style.titleName}>{category.title}</h4>
					<ul>
						{category.categories.map(subcategory => (
							<li key={subcategory.id}>
								<button
									onClick={() =>
										handleCategorySelect(subcategory.id, subcategory.title)
									}
									className={
										categoriesRedux.some(cat => cat.id === subcategory.id)
											? `${style.clickedSize}`
											: `${style.nonClicked}`
									}
								>
									<span
										className={
											categoriesRedux.some(cat => cat.id === subcategory.id)
												? `${style.spanClicked}`
												: `${style.nonClicked}`
										}
									>
										{subcategory.title}
									</span>
								</button>
								<div
									onClick={() =>
										handleCategoryDeselect(subcategory.id, subcategory.title)
									}
									className={style.wrapperIconClose}
								>
									{categoriesRedux.some(cat => cat.id === subcategory.id) ? (
										<CloseIconActive />
									) : (
										<CloseIcon />
									)}
								</div>
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	)
}

export default DropDownCategory
