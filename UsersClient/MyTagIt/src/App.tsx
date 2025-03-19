import './App.css'
import LoginForm from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignUpForm from './components/SignUp'

function App() {

  return (
    <>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
    </>
)}

export default App
