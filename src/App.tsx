import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TapGame from "./components/TapGame";
import SignIn from "./pages/auth/SignIn";

import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/auth/SignUp";
import Leaderboard from "./components/LeaderBoard";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <TapGame />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

function App() {
  return <AppRoutes />;
}

export default App;
