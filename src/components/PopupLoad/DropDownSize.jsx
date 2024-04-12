import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSizeSelected } from '../redux/slices/SelectedSizesSlice'

const DropDownSize = ({ idTypeOfSize }) => {
	const [fetchedSizes, setFetchedSizes] = useState([])

	const dispatch = useDispatch()
	const [searchQuery, setSearchQuery] = useState('')

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

	return (
		<div>
			<input
				type='text'
				placeholder='Search...'
				onChange={e => setSearchQuery(e.target.value)}
			/>
			{filteredSizes.map(element => (
				<div key={element.id}>
					<button
						onClick={() => clickedItem(element.title, element.id)}
						style={{
							backgroundColor: sizes.some(size => size.id === element.id)
								? 'blue'
								: 'white',
							color: sizes.some(size => size.id === element.id)
								? 'white'
								: 'black',
						}}
					>
						{element.title}
					</button>
					{sizes.some(size => size.id === element.id) && (
						<button onClick={() => removeItem(element.id)}>x</button>
					)}
				</div>
			))}
			{sizes.length >= 5 && (
				<div style={{ color: 'red' }}>Можно добавить не более 5 размеров</div>
			)}
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
