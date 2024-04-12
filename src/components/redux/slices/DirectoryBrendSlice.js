import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchBrends = createAsyncThunk(
	'brend/fetchBrendStatus',
	async () => {
		const { data } = await axios.get(
			'https://b2pshop.click/api/v2/directory/stores',
			{
				headers: {
					accept: 'application/json',
				},
			}
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', //loading | success | error
}
const DirectoryBrendSlice = createSlice({
	name: 'brends',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchBrends.pending, (state, action) => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchBrends.fulfilled, (state, action) => {
				console.log('ok', state)
				state.items = action.payload
				state.status = 'success'
			})
			.addCase(fetchBrends.rejected, (state, action) => {
				state.status = 'error'
				state.items = []
			})
	},
})
export const { setItems } = DirectoryBrendSlice.actions

export default DirectoryBrendSlice.reducer
