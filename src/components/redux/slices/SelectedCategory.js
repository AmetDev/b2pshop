import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	categoriesRedux: [],
	categoriesReduxTitle: [],
}

const selectedCategorySlice = createSlice({
	name: 'selectedCategory',
	initialState,
	reducers: {
		setCategoryReducer(state, action) {
			state.categoriesRedux = action.payload
		},
		setCategoryTitleReducer(state, action) {
			state.categoriesRedux = action.payload
		},
	},
})

export const { setCategoryReducer, setCategoryTitleReducer } =
	selectedCategorySlice.actions

export default selectedCategorySlice.reducer
