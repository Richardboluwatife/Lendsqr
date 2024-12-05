import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/Dashboard/Dashboard';
import Details from "./components/Dashboard/Details/Details"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-details/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;