
import './App.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider'
import { AppRoutes } from './routes/AppRoutes'
import { Analytics } from "@vercel/analytics/next"
function App() {


  return (
    <>
    <AuthContextProvider>
      <AppRoutes/>
      <Analytics/>
    </AuthContextProvider>
    </>
  )
}

export default App
