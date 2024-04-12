import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InputSearch from './InputSearch'
import style from './MainSearch.module.scss'

const MainSearch = () => {
	const { items, state } = useSelector(state => state.brends)
	const [data, setData] = React.useState([])
	const dispatch = useDispatch()

	React.useEffect(() => {
		const asyncMenu2 = async () => {
			const { data } = await axios.get(
				'https://b2pshop.click/api/v2/directory/stores',
				{
					headers: {
						accept: 'application/json',
					},
				}
			)
			setData([...data])
		}
		asyncMenu2()
	}, [])

	const handleButtonClick = event => {
		event.target.style.color = '#1976D2' // изменяем цвет на синий
		event.target.style.textDecoration = 'underline'
	}

	return (
		<div className={style.wrapperFilterAndSearch}>
			<div>
				<button className={style.btnsFilter} onClick={handleButtonClick}>
					Все бренды
				</button>
				{data.map(element => {
					return (
						<button
							className={style.btnsFilter}
							onClick={handleButtonClick}
							key={element.id}
						>
							{element.title}
						</button>
					)
				})}
			</div>
			<InputSearch />
		</div>
	)
}

export default MainSearch
