import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNalSelected } from '../redux/slices/CurrentlyNal.js'
import CloseIcon from './CloseIcon'
import CloseIconActive from './CloseIconActive'
import style from './DropDownNal.module.scss'
const DropDownNalych = () => {
	const dispatch = useDispatch()
	const { nal } = useSelector(state => state.selectedNal)
	const [selectedItems, setSelectedItems] = useState([])

	const types = ['Все варианты', '👜 В наличии', '🚢 В пути', '🪡 Под заказ']

	const handleItemClick = item => {
		if (item === 'Все варианты') {
			setSelectedItems(types) // Выбираем все элементы
			dispatch(setNalSelected(types)) // Отправляем все элементы в Redux
			return
		}

		if (!selectedItems.includes(item)) {
			setSelectedItems([...selectedItems, item])
			dispatch(setNalSelected([...selectedItems, item]))
		}
	}

	const handleRemoveItemClick = item => {
		dispatch(setNalSelected(nal.filter(i => i !== item)))
		setSelectedItems(selectedItems.filter(i => i !== item))
	}

	return (
		<div className={style.wrapperDropDown}>
			{types.map(element => {
				const isSelected = selectedItems.includes(element)
				return (
					<div key={element}>
						<button
							onClick={() => handleItemClick(element)}
							className={
								isSelected ? `${style.clickedSize}` : `${style.nonClicked}`
							}
						>
							<span
								className={
									isSelected ? `${style.spanClicked}` : `${style.nonClicked}`
								}
							>
								{element}
							</span>
							<button
								className={style.wrapperClose}
								onClick={e => {
									e.stopPropagation()
									handleRemoveItemClick(element)
								}}
							>
								{isSelected ? <CloseIconActive /> : <CloseIcon />}
							</button>
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default DropDownNalych
