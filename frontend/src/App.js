import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import loadingImage from './200w.gif'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Main from './pages/Main.jsx'
import NotFound from './pages/NotFound.js'
import { useAuthContext } from './hooks/useAuthContext.js'


function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500)
  
    return () => clearTimeout(timeout)
  }, [])
  const {user} = useAuthContext()
  return (
    <>
      <div className="App">
        {/* Jei pages(bet kuris) loadinasi uždės image */}
        {loading && (
          <div className='loading-gif'>
            <img src={loadingImage} alt="Loading Cage" />
          </div>
        )}
        {/* WIP, reikės pačekint ar galiu palikti tuščią class'ę div'ui, nes nenoriu perpildyti kodo nereikalingom clasėm */}
        <div className={(loading ? 'blur-content' : 'inner-container')}>
        <BrowserRouter>
          <div className="pages">
            <Routes>
                <Route
                  path='*' 
                  element={<NotFound />}
                />
                <Route 
                  path='/'
                  element={user ? <Navigate to="/main" /> : <Login />}
                />
                <Route 
                  path='/main'
                  element={user ? <Main /> : <Navigate to="/" />}
                />
                <Route 
                  path='/signup'
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
            </Routes>
          </div>
        </BrowserRouter>
        </div>
      </div>
    </>
  )
}

export default App;
