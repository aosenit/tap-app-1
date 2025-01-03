import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TapGame from "./components/TapGame";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<TapGame />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);

function App() {
  return <AppRoutes />;
}

export default App;
