import { configureStore } from '@reduxjs/toolkit'
import CurrentlySizes from './slices/CurrentlySizes'
import DirectoryBrendSlice from './slices/DirectoryBrendSlice'
import MenuHeaderSlice from './slices/MenuHeader'
import SizesFilter from './slices/NumberSize'
export const store = configureStore({
	reducer: {
		menu: MenuHeaderSlice,
		brends: DirectoryBrendSlice,
		filter: CurrentlySizes,
		sizes: SizesFilter,
	},
})
