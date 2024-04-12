import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setIdSize, setNameTypeSize } from '../redux/slices/CurrentlySizes'
import { setDeleteSelected } from '../redux/slices/SelectedSizesSlice'
import style from './DropDownTypeOfSize.module.scss'
const DropDown = ({ sizes }) => {
	const [currentSize, setCurrentSize] = useState({ title: '', id: '' })
	const [searchQuery, setSearchQuery] = useState('')
	const dispatch = useDispatch()

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
			<input
				className={style.inputWrapper}
				type='text'
				placeholder='Поиск'
				onChange={e => setSearchQuery(e.target.value)}
			/>

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
