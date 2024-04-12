import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DropDown from './DropDown'
import DropDownCategory from './DropDownCategory'
import DropDownSize from './DropDownSize'
const features = [
	{
		name: 'Тип размера',
		id: '',
		url: 'https://b2pshop.click/api/v2/directory/type-size?limit=10&offset=0',
	},
	{
		name: 'Размер',
		url: '',
	},
	{
		name: 'Категория',
	},
	{
		name: 'Наличие',
	},
]

const InputSearch = () => {
	const [sizes, setSizes] = useState([])
	const [renderDropDown, setRenderDropDown] = useState(false)
	const [renderDropDownSize, setRenderDropDownSize] = useState(false)
	const [renderDropDownCategory, setRenderDropDownCategory] =
		React.useState(false)
	const [buttonContent, setButtonContent] = React.useState(features[0].name)

	const fetchDataTypeSize = async url => {
		try {
			const response = await axios.get(url)
			setSizes(response.data)
			setRenderDropDown(true)
			setRenderDropDownSize(false) // Reset DropDownSize rendering
		} catch (error) {
			console.error('Error fetching data:', error)
			setSizes([])
			setRenderDropDown(false)
			setRenderDropDownSize(false) // Reset DropDownSize rendering
		}
	}

	const nameNew = useSelector(state => state.filter.name)
	const idTypeOfSize = useSelector(state => state.filter.id)
	useEffect(() => {
		setButtonContent(nameNew)
		setRenderDropDown(false)
	}, [nameNew])
	const handleButtonClick = (url, name) => {
		fetchDataTypeSize(url)
		if (name === 'Тип размера') {
			setRenderDropDown(true)
			setRenderDropDownSize(false)
			setRenderDropDownCategory(false)

			// Ensure DropDownSize is not rendered when 'Тип размера' is clicked
		}
	}
	const SizesNumbers = () => {
		setRenderDropDownSize(true)
		setRenderDropDown(false)
		setRenderDropDownCategory(false)
	}
	const CategoryData = () => {
		setRenderDropDownCategory(true)
		setRenderDropDown(false)
		setRenderDropDownSize(false)
	}

	return (
		<div>
			<button
				onClick={() => handleButtonClick(features[0].url, features[0].name)}
			>
				{buttonContent}
			</button>
			<button onClick={SizesNumbers}>{features[1].name}</button>
			<button onClick={CategoryData}>{features[2].name}</button>
			<button>{features[3].name}</button>

			{renderDropDown && features[0].name === 'Тип размера' && (
				<DropDown sizes={sizes} />
			)}
			{renderDropDownSize && <DropDownSize idTypeOfSize={idTypeOfSize} />}
			{renderDropDownCategory && <DropDownCategory />}

			<button>Найти</button>
		</div>
	)
}

export default InputSearch
