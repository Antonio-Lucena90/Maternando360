
import './App.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider'
import { AppRoutes } from './routes/AppRoutes'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {


  return (
    <>
    <AuthContextProvider>
      <AppRoutes/>
      <Analytics/>
      <SpeedInsights/>
    </AuthContextProvider>
    </>
  )
}

export default App
