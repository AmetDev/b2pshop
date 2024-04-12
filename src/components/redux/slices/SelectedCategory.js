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
			state.categoriesRedux = [...action.payload] // Создание нового массива
		},
		setCategoryTitleReducer(state, action) {
			state.categoriesReduxTitle = [...action.payload] // Создание нового массива
		},
	},
})

export const { setCategoryReducer, setCategoryTitleReducer } =
	selectedCategorySlice.actions

export default selectedCategorySlice.reducer
