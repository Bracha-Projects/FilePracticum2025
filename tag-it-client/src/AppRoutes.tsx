import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import AboutPage from "./pages/AboutPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import FilesPage from "./pages/FilesPage"
import FileUploadPage from "./pages/FileUploadPage"
import ProfilePage from "./pages/ProfilePage"
import UnderConstructionPage from "./pages/UnderConstructionPage"
import SettingsPage from "./pages/SettingPage"
import TermsPage from "./pages/TermsPage"
import PrivacyPage from "./pages/PrivacyPage"
import ContactPage from "./pages/ContactPage"
import ResetPassword from "./pages/ResetPassowrd"
import ForgotPassword from "./pages/ForgotPassword"

const AppRoutes = () => {
  return (
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
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    </Routes>
  )
}

export default AppRoutes
