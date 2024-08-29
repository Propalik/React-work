import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/routes/AppRoutes.jsx";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
