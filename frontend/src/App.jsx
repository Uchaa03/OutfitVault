import './assets/sass/main.sass';
import { UserProvider } from './context/userContext.jsx';
import AppContent from "./components/AppContent.jsx";

function App() {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
}

export default App;
