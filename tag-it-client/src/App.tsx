
import './App.css'
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FilesPage from "./pages/FilesPage";
import FileUploadPage from "./pages/FileUploadPage";
import ProfilePage from "./pages/ProfilePage";
import { Provider } from "react-redux";
import SettingsPage from './pages/SettingPage';
import UnderConstructionPage from './pages/UnderConstructionPage';
import { store } from './redux/store';
function App() {

  return (
    <>
      <Provider store={store}>
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/files" element={<FilesPage />} />
              <Route path="/upload" element={<FileUploadPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/underConstruction" element={<UnderConstructionPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </Provider>
    </>
  )
}

export default App
