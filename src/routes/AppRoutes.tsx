import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/Home.page'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export { AppRoutes }
