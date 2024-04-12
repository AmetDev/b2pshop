import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	name: 'Международный (стандартный)',
	id: 'f433a2fb-b6cd-48ac-afc6-2ec1f6332419',
}
//
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setIdSize(state, action) {
			state.id = action.payload
		},
		setNameTypeSize(state, action) {
			state.name = action.payload
		},
	},
})
export const { setNameTypeSize, setIdSize } = filterSlice.actions
export const selectorId = state => state.filter.id
export const selectorName = state => state.filter.name

export default filterSlice.reducer
