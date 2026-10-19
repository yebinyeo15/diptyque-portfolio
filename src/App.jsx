import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './layouts/SiteLayout/SiteLayout'
import FragrancePage from './pages/FragrancePage/FragrancePage'
import HomePage from './pages/HomePage/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="fragrances/:fragranceId" element={<FragrancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
