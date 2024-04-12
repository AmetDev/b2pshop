import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DropDown from './DropDown'
import DropDownCategory from './DropDownCategory'
import DropDownSize from './DropDownSize'
import style from './InputSearch.module.scss'
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
	const [buttonContent, setButtonContent] = React.useState(null)
	const [buttonSizeContent, setButtonSizeContent] = React.useState(
		features[1].name
	)
	const [checkerBtnTypeSize, setCheckerBtnTypeSize] = React.useState(false)

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
	const sizesFromRedux = useSelector(state => state.selectedSize.sizes)
	const { categoriesReduxTitle } = useSelector(
		state => state.selectedCategories
	)

	const idTypeOfSize = useSelector(state => state.filter.id)

	useEffect(() => {
		setRenderDropDown(false)
	}, [nameNew])

	const handleButtonClick = (url, name) => {
		fetchDataTypeSize(url)
		if (name === 'Тип размера') {
			setRenderDropDown(true)
			setRenderDropDownSize(false)
			setRenderDropDownCategory(false)
			setCheckerBtnTypeSize(!checkerBtnTypeSize)

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
		<div className={style}>
			<button
				onClick={() => handleButtonClick(features[0].url, features[0].name)}
			>
				{nameNew || features[0].name}
			</button>

			<button onClick={SizesNumbers}>
				{sizesFromRedux.length !== 0
					? sizesFromRedux.map(element => {
							return <div>{element.title}</div>
					  })
					: buttonSizeContent}
			</button>

			<button onClick={CategoryData}>
				{categoriesReduxTitle.length !== 0
					? categoriesReduxTitle.map(element => {
							return <div>{element.title}</div>
					  })
					: features[2].name}
			</button>
			<button>{features[3].name}</button>

			<input type='text' placeholder='От              ₽' />
			<input type='text' placeholder='До              ₽' />
			<input type='text' placeholder='От              шт.' />
			<input type='text' placeholder='До              шт.' />
			<button>Найти</button>
			{renderDropDown && features[0].name === 'Тип размера' && (
				<DropDown sizes={sizes} />
			)}
			{renderDropDownSize && <DropDownSize idTypeOfSize={idTypeOfSize} />}
			{renderDropDownCategory && <DropDownCategory />}
		</div>
	)
}

export default InputSearch
