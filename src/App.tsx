
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import RealIndex from '@/pages/RealIndex';
import Profile from '@/pages/Profile';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<RealIndex />} />
          <Route path="/dashboard" element={<RealIndex />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
