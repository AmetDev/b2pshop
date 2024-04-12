import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	title: 'Международный (стандартный)',
	id: 'f433a2fb-b6cd-48ac-afc6-2ec1f6332419',
}
//
const SizesFilter = createSlice({
	name: 'sizes',
	initialState,
	reducers: {
		setIdSize(state, action) {
			state.id = action.payload
		},
		setNameTypeSize(state, action) {
			state.title = action.payload
		},
	},
})
export const { setNameTypeSize, setIdSize } = SizesFilter.actions
export const selectorSizeNumberId = state => state.filter.id
export const selectorSizeNumberName = state => state.filter.title

export default SizesFilter.reducer
