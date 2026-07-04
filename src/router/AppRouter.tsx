import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import ProjectDetails from '../pages/ProjectDetails';

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default AppRouter;