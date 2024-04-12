import React from 'react'
import { LoaderIcon } from './loaderIcon'
import style from './popup.module.scss'
const PopupLoad = ({ arg }) => {
	return (
		<div className={style.popup}>
			<LoaderIcon />
			<span class={style.loader}></span>
			<span>{arg}</span>
		</div>
	)
}

export default PopupLoad
