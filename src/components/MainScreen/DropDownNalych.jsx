import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNalSelected } from '../redux/slices/CurrentlyNal.js'

const DropDownNalych = () => {
	const dispatch = useDispatch()
	const { nal } = useSelector(state => state.selectedNal)
	const [selectedItems, setSelectedItems] = useState([])

	const types = ['Все варианты', '👜 В наличии', '🚢 В пути', '🪡 Под заказ']

	const handleItemClick = item => {
		if (item === 'Все варианты') {
			dispatch(setNalSelected([])) // Очистка состояния в Redux
			setSelectedItems([]) // Очистка состояния в компоненте
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
		<div>
			{types.map(element => {
				const isSelected = selectedItems.includes(element)
				return (
					<div key={element}>
						<button
							onClick={() => handleItemClick(element)}
							style={{
								backgroundColor:
									isSelected && element !== 'Все варианты'
										? 'blue'
										: 'transparent',
								color:
									isSelected && element !== 'Все варианты' ? 'white' : 'black',
							}}
						>
							{element}
						</button>

						{isSelected && (
							<span
								style={{ cursor: 'pointer', marginLeft: '10px' }}
								onClick={() => handleRemoveItemClick(element)}
							>
								&#10006;
							</span>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default DropDownNalych
