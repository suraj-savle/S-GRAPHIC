import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import "./index.css"
import SearchPage from './Pages/Search'

const Home = lazy(() => import('./Pages/Home'))
const Category = lazy(() => import('./Pages/Category'))
const Favorite = lazy(() => import('./Pages/Favorite'))
const GifPage = lazy(() => import('./Pages/GifPage'))
const Header = lazy(() => import('./Components/Header'))

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:category' element={<Category />} />
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/:type/:slug' element={<GifPage />} />
          <Route path='*' element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App