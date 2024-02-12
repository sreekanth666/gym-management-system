import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthenticationForm from './components/shared/AuthenticationForm'
import Dashboard from './components/pages/Dashboard'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
