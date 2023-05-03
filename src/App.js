import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Login from './Components/Login';
import Navbar from './Layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterUser from './Components/Signup';
import { useAuth } from './Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import WelcomeUser from './Components/WelcomeUser';

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();

  const Navigate = useNavigate();

  if (authContext.isAuthenticated) return children;

  return <Navigate to="/login" />;
}

function App() {
  return (
    <>
<Router>
<Navbar/>
  <Routes>
    <Route exact path="/login" element={<Login/>}/> 
    <Route exact path="/register" element={<RegisterUser/>}/> 
    <Route path = "message" 
    element = {
      <AuthenticatedRoute>
      <WelcomeUser/>
      </AuthenticatedRoute> 
    }
   />
      
  </Routes>
  </Router>
  </>
  );
}

export default App;
