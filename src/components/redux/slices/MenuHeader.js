import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchMenu = createAsyncThunk(
	'brend/fetchBrendStatus',
	async () => {
		const { data } = await axios.get('https://b2pshop.click/api/v2/menu', {
			headers: {
				accept: 'application/json',
			},
		})

		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', //loading | success | error
}
const MenuHeaderSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchMenu.pending, (state, action) => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchMenu.fulfilled, (state, action) => {
				console.log('ok', state)
				state.items = action.payload
				state.status = 'success'
			})
			.addCase(fetchMenu.rejected, (state, action) => {
				state.status = 'error'
				state.items = []
			})
	},
})
export const { setItems } = MenuHeaderSlice.actions
//export const selectorMenu = state => state.MenuHeaderSlice
export default MenuHeaderSlice.reducer
