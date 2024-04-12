import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	nal: [],
}
//
const selectedNalSlice = createSlice({
	name: 'selectedNalSlice',
	initialState,
	reducers: {
		setNalSelected(state, action) {
			state.nal = action.payload
		},
		setNalDelete(state) {
			state.nal = []
		},
	},
})
export const { setNalSelected, setNalDelete } = selectedNalSlice.actions

export default selectedNalSlice.reducer
