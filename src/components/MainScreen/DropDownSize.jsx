import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSizeSelected } from '../redux/slices/SelectedSizesSlice'
import CloseIcon from './CloseIcon'
import CloseIconActive from './CloseIconActive'
import style from './DropDownTypeOfSize.module.scss'
import SearchIcon from './SearchIcon'
const DropDownSize = ({ idTypeOfSize }) => {
	const [fetchedSizes, setFetchedSizes] = useState([])

	const dispatch = useDispatch()
	const [searchQuery, setSearchQuery] = useState('')
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}
	useEffect(() => {
		const fetchDataSize = async () => {
			try {
				console.log('idTypeOfSize', idTypeOfSize)
				if (idTypeOfSize === undefined) {
					idTypeOfSize = 'f433a2fb-b6cd-48ac-afc6-2ec1f6332419'
				}
				const response = await axios.get(
					`https://b2pshop.click/api/v2/directory/type-size/${idTypeOfSize}/sizes?limit=10&offset=0`
				)
				setFetchedSizes(response.data.data)
			} catch (error) {
				console.error('Error fetching data:', error)
				setFetchedSizes([])
			}
		}
		fetchDataSize()
	}, [idTypeOfSize])

	const clickedItem = (title, id) => {
		const isSelected = sizes.some(size => size.id === id)
		if (!isSelected) {
			if (sizes.length < 5) {
				const newSize = { title, id }
				dispatch(setSizeSelected([...sizes, newSize]))
			} else {
				return
			}
		} else {
			const updatedSizes = sizes.filter(size => size.id !== id)
			dispatch(setSizeSelected(updatedSizes))
		}
	}
	const sizes = useSelector(state => state.selectedSize.sizes)
	console.log('sizes', sizes)

	const removeItem = id => {
		const updatedSizes = sizes.filter(size => size.id !== id)

		dispatch(setSizeSelected(updatedSizes))
	}

	const filteredSizes = fetchedSizes.filter(element =>
		element.title.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleClearQuery = event => {
		event.stopPropagation() // Предотвратить всплытие события
		setSearchQuery('')
	}

	const handleMouseEnter = () => {
		setIsFocused(true)
	}

	const handleMouseLeave = () => {
		setIsFocused(false)
	}

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
			{sizes.length >= 5 && (
				<div
					style={{
						color: '#FF6635',
						margin: 0,
						padding: 0,
						height: '20px',

						fontSizes: '14px',
						fontWeight: 400,
					}}
				>
					Можно добавить не более 5 размеров
				</div>
			)}
			<button>Все размеры</button>
			{filteredSizes.map(element => (
				<div key={element.id}>
					<button
						onClick={() => clickedItem(element.title, element.id)}
						className={
							sizes.some(size => size.id === element.id)
								? style.clickedSize
								: style.nonClicked
						}
					>
						<span
							className={
								sizes.some(size => size.id === element.id)
									? style.spanClicked
									: style.nonSpanClicked
							}
						>
							{element.title}
							{sizes.some(size => size.id === element.id)}
						</span>
						<button
							className={style.wrapperClose}
							onClick={() => removeItem(element.id)}
						>
							{sizes.some(size => size.id === element.id) ? (
								<CloseIconActive />
							) : (
								<CloseIcon />
							)}
						</button>
					</button>
				</div>
			))}

			{/* <div>
				<h3>Selected Sizes:</h3>
				<ul>
					{selectedSizes.map((size, index) => (
						<li key={index}>{size.title}</li>
					))}
				</ul>
			</div> */}
		</div>
	)
}

export default DropDownSize