import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Pending from './pages/Pending/Pending';
import Chat from './pages/Chact/Chat';
import { useAuthStore } from './store/auth';

const ProviderGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  // If provider is not validated, redirect to /pending
  const { user } = useAuthStore();
  if (user?.role === 'provider' && !user.isValidated) {
    return <Navigate to="/pending" replace />;
  }
  return children;
};

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pending" element={<Pending />} />
      <Route
        path="/chat/:id"
        element={
          <ProviderGuard>
            <Chat />
          </ProviderGuard>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer />
  </>
);

export default App;
