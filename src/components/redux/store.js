import { configureStore } from '@reduxjs/toolkit'
import CurrentlySizes from './slices/CurrentlySizes'
import DirectoryBrendSlice from './slices/DirectoryBrendSlice'
import MenuHeaderSlice from './slices/MenuHeader'
import SizesFilter from './slices/NumberSize'
import SelectedCategory from './slices/SelectedCategory'
import selectedSizeSlice from './slices/SelectedSizesSlice'
export const store = configureStore({
	reducer: {
		menu: MenuHeaderSlice,
		brends: DirectoryBrendSlice,
		filter: CurrentlySizes,
		sizes: SizesFilter,
		selectedSize: selectedSizeSlice,
		selectedCategories: SelectedCategory,
	},
})
