import {lazy, Suspense, type JSX} from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AppLayout from '@/layouts/AppLayout'
import DashboardPage from '@/pages/Dashboard';
import BookingCreatePage from '@/pages/BookingCreate'
import { LoadingSpinner } from '@/components/Loader';
import './index.css'

const ProfilesPage = lazy(() => import("@/pages/Profiles"));
const ProfileDetailPage = lazy(() => import("@/pages/ProfileDetail"))
const BookingPage = lazy(() => import("@/pages/Bookings"));

interface Props {
  Child: React.LazyExoticComponent<() => JSX.Element>;
  classes?: string;
  fallback?: React.ReactNode;
}

const LazyLoadedComponent: React.FC<Props> = ({Child, fallback}) => {
  const fallbackLoader = fallback ?? <LoadingSpinner />;
  return (
    <Suspense fallback={fallbackLoader}>
      <Child/>
    </Suspense>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/profiles" element={<LazyLoadedComponent Child={ProfilesPage} />} />
          <Route path="/profiles/:id" element={<LazyLoadedComponent Child={ProfileDetailPage} />} />
          <Route path="/bookings" element={<LazyLoadedComponent Child={BookingPage} />} />
          <Route path="/bookings/create/:profileId" element={<BookingCreatePage />} />
          <Route path="/bookings/create" element={<BookingCreatePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
