import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainSearch from './components/MainScreen/MainSearch'
import MainLayouts from './layouts/MainLayouts'
import './scss/libs/app.scss'
function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayouts />}>
				<Route path='' element={<MainSearch />} />
			</Route>
		</Routes>
	)
}

export default App
