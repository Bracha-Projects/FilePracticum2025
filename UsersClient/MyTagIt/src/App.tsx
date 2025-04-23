import './App.css'
import LoginForm from './components/Login'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SignUpForm from './components/SignUp'
import TagItDashboard from './components/DashBoard'
import FileManagementAbout from './components/About'
import Header from './components/Header'
import AppLayout from './components/AppLayout'
import Upload from './components/Upload'
import Index from './components/Index'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme'


function App() {

  return (
    <>
        <ThemeProvider theme={theme}>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/dashBoard" element={<TagItDashboard/>} /> 
          <Route path="/about" element={<FileManagementAbout/>} /> 
          <Route path="/header" element={<Header/>} />
          <Route path="/appLayout" element={<AppLayout>Some content</AppLayout>} />
          <Route path="/upload" element={<Upload /> } /> 
          <Route path="/index" element={<Index/>} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
    </>
)}

export default App
