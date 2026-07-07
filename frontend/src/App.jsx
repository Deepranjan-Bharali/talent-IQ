
import { useUser, Show, SignInButton, SignOutButton, UserButton } from '@clerk/react';
import { Navigate, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from './pages/ProblemsPage';
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import AiAssistantPage from "./pages/AiAssistantPage";
import { Toaster } from "react-hot-toast"

function App() {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to={"/"} />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="/assistant" element={isSignedIn ? <AiAssistantPage /> : <Navigate to={"/"} />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
