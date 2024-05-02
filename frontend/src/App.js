import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from './LoginScreen';
import MainHomepage from './MainHomepage';
import TopNavigationBar from './TopNavigationBar';
import BottomFooter from './BottomFooter';
import EmotionDetector from './EmotionDetector';
import Dashboard from './Dashboard';

function PageLayout() {
  const currentLocation = useLocation();
  const showNavigationBarAndFooter = !currentLocation.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen justify-between">
      {showNavigationBarAndFooter && <TopNavigationBar />}
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/voice" element={<EmotionDetector />} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path="/" element={<MainHomepage />} />
      </Routes>
      {showNavigationBarAndFooter && <BottomFooter />}
    </div>
  );
}

function MainApplication() {
  return (
    <Router>
      <PageLayout />
    </Router>
  );
}

export default MainApplication;