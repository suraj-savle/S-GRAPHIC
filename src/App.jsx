import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import "./index.css"

const Home = lazy(() => import('./Pages/Home'))
const Category = lazy(() => import('./Pages/Category'))
const Favorite = lazy(() => import('./Pages/Favorite'))
const Gif = lazy(() => import('./Pages/Gif'))
const Header = lazy(() => import('./Components/Header'))

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/category/:id' element={<Category />} />
          <Route path='/favorite' element={<Favorite />} />
          <Route path='/gif/:id' element={<Gif />} />
          <Route path='*' element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App