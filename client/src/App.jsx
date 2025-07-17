import React from 'react'
import NavBarComponent from './components/NavBarComponent'
import { Routes, Route } from 'react-router-dom'
import UserAuthForm from './components/UserAuthForm'
import EditorWrite from './pages/EditorWrite'

const App = () => {
  return (
    <>
      <Routes >
        <Route path='/' element={<NavBarComponent />}>
          <Route path='/sign-in' element={<UserAuthForm type={'sign-in'}/>} />
          <Route path='/sign-up' element={<UserAuthForm type={'sign-up'}/>} />
        </Route>

        <Route path='/editor' element={<EditorWrite/>} />

      </Routes>

    </>
  )
}

export default App