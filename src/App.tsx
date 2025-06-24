import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './components/auth'
import Protected from './components/protected'
import Home from './pages/home'
import AuthRoute from './components/auth-route'
import ProfilePage from './pages/profile-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Protected>
              <ProfilePage />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
