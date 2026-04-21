/* ============================================
   App — Root Component
   Routes views based on state
   ============================================ */

import { AppProvider, useApp } from './context';
import Header from './components/Header';
import Landing from './components/Landing';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import StepGuide from './components/StepGuide';
import Eligibility from './components/Eligibility';
import MythsFacts from './components/MythsFacts';
import Deadlines from './components/Deadlines';
import Chat from './components/Chat';
import './App.css';

function AppContent() {
  const { state } = useApp();
  const { currentView } = state;

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing />;
      case 'onboarding':
        return <Onboarding />;
      case 'dashboard':
        return <Dashboard />;
      case 'guide':
        return <StepGuide />;
      case 'eligibility':
        return <Eligibility />;
      case 'myths':
        return <MythsFacts />;
      case 'deadlines':
        return <Deadlines />;
      case 'chat':
        return <Chat />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className="app">
      <a href="#main-content" className="sr-only">Skip to main content</a>
      <Header />
      <div id="main-content">
        {renderView()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
