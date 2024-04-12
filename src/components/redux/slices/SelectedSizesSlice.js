import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	sizes: [],
}
//
const selectedSizeSlice = createSlice({
	name: 'selectedSize',
	initialState,
	reducers: {
		setSizeSelected(state, action) {
			state.sizes = action.payload
		},
		setDeleteSelected(state) {
			state.sizes = []
		},
	},
})
export const { setSizeSelected, setDeleteSelected } = selectedSizeSlice.actions

export default selectedSizeSlice.reducer
