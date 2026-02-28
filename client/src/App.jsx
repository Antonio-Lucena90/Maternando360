
import './App.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider'
import { AppRoutes } from './routes/AppRoutes'

function App() {


  return (
    <>
    <AuthContextProvider>
      <AppRoutes/>
    </AuthContextProvider>
    </>
  )
}

export default App
