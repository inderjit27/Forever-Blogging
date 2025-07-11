import React from 'react'
import NavBarComponent from './components/NavBarComponent'
import { Routes, Route } from 'react-router-dom'
import UserAuthForm from './components/UserAuthForm'

const App = () => {
  return (
    <>
      <Routes >
        <Route path='/' element={<NavBarComponent />}>
          <Route path='/sign-in' element={<UserAuthForm type={'sign-in'}/>} />
          <Route path='/sign-up' element={<UserAuthForm type={'sign-up'}/>} />
          <Route path='/editor' element={<></>} />

        </Route>
      </Routes>

    </>
  )
}

export default App