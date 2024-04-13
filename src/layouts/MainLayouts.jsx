import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import style from './MainLayout.module.scss'
const MainLayouts = () => {
	return (
		<div className={style.wrapper}>
			<Header />
			<div className={style.content}>
				<Outlet />
			</div>
		</div>
	)
}
export default MainLayouts
