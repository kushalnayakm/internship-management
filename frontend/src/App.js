import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/user" className="hover:underline">User</Link>
        <Link to="/admin" className="hover:underline">Admin</Link>
      </nav>
      <Routes>
        <Route path="/user" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;