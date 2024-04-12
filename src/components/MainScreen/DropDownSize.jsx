import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const DropDownSize = ({ idTypeOfSize }) => {
	const [fetchedSizes, setFetchedSizes] = useState([])
	const [selectedSizes, setSelectedSizes] = useState([])
	const dispatch = useDispatch()
	const [searchQuery, setSearchQuery] = useState('')

	useEffect(() => {
		const fetchDataSize = async () => {
			try {
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
		const isSelected = selectedSizes.some(size => size.id === id)
		if (!isSelected) {
			if (selectedSizes.length < 5) {
				const newSize = { title, id }
				setSelectedSizes([...selectedSizes, newSize])
			} else {
				return
			}
		} else {
			const updatedSizes = selectedSizes.filter(size => size.id !== id)
			setSelectedSizes(updatedSizes)
		}
	}

	const removeItem = id => {
		const updatedSizes = selectedSizes.filter(size => size.id !== id)
		setSelectedSizes(updatedSizes)
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
							backgroundColor: selectedSizes.some(
								size => size.id === element.id
							)
								? 'blue'
								: 'white',
							color: selectedSizes.some(size => size.id === element.id)
								? 'white'
								: 'black',
						}}
					>
						{element.title}
					</button>
					{selectedSizes.some(size => size.id === element.id) && (
						<button onClick={() => removeItem(element.id)}>x</button>
					)}
				</div>
			))}
			{selectedSizes.length >= 5 && (
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
