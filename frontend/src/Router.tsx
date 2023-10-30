import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Graphics } from './pages/Graphics'
import { Home } from './pages/Home'
import { Invetory } from './pages/Invetory'
import { Active } from './pages/Invetory/components/Active'

export function Router() {

  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/actives" element={<Invetory/>} />
          <Route path="/actives/:id" element={<Active />} />
          <Route path="/graficos" element={<Graphics/>} />
        </Route>
    </Routes>
  )
}