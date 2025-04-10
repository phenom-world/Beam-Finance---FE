import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import Layout from './components/dashboard/layout';
import PublicRoute from './components/hoc/public-route';
import { Toast } from './components/toast';
import { AuthProvider } from './context/auth-context';
import { SWRProvider } from './context/SWRProvider';
import Login from './pages/login';
import NotFound from './pages/notFound';
import Register from './pages/register';
import Wallet from './pages/wallet';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SWRProvider>
          <Toast />
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/' element={<Layout />}>
              <Route index element={<Navigate to='/wallet' replace />} />
              <Route path='wallet' element={<Wallet />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </SWRProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
