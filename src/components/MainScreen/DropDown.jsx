import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIdSize, setNameTypeSize } from '../redux/slices/CurrentlySizes'
import { setDeleteSelected } from '../redux/slices/SelectedSizesSlice'
import style from './DropDownTypeOfSize.module.scss'
import SearchActiveIcon from './SearchActiveIcon'
import SearchIcon from './SearchIcon'
const DropDown = ({ sizes }) => {
	const [currentSize, setCurrentSize] = useState({ title: '', id: '' })
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}
	const clickedItem = (title, id) => {
		console.log('title', title)
		console.log('id', id)

		setCurrentSize({ title, id })
		dispatch(setIdSize(id))
		dispatch(setNameTypeSize(title))
		dispatch(setDeleteSelected())
	}

	// Ensure `sizes` is not undefined before accessing `sizes.data`
	const filteredSizes =
		sizes && sizes.data
			? sizes.data.filter(element =>
					element.title.toLowerCase().includes(searchQuery.toLowerCase())
			  )
			: []

	return (
		<div className={style.wrapperDropDown}>
			<div className={style.wrapperInput}>
				<input
					className={style.inputWrapper}
					type='text'
					placeholder='Поиск'
					onChange={e => setSearchQuery(e.target.value)}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{!isFocused ? (
					<div className={style.focusedIcon}>
						<SearchIcon />
					</div>
				) : (
					<div className={style.focusedIcon}>
						<SearchActiveIcon />
					</div>
				)}
			</div>

			{filteredSizes.map(element => {
				return (
					<button
						onClick={() => clickedItem(element.title, element.id)}
						key={element.id}
					>
						{element.title}
					</button>
				)
			})}
		</div>
	)
}

export default DropDown
