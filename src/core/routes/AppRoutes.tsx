import AppLayout from "core/layouts/AppLayout";
import Sample from "features/sample/Sample";
import SampleView from "features/sample/views/SampleView";
import { FC } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const AppRouter: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="sample" element={<Sample />}>
            <Route path="home" element={<SampleView />} />
            <Route index element={<Navigate to="home" replace />} />
          </Route>
          <Route index element={<Navigate to="sample" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
