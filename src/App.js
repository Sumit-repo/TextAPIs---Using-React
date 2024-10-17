import "./App.css";
import Navbar from "./components/Navbar";
import AboutUs from "./components/AboutUs";
import TextBar from "./components/TextBar";
import Alert from "./components/Alert";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const switchTheme = () => {
    const element = document.body;
    const isDark = element.dataset.bsTheme === "dark";
    element.dataset.bsTheme = isDark ? "light" : "dark";
    showAlert(`${isDark ? "Light" : "Dark"} mode - Enabled`, "success");
    document.title = `TextAPIs - ${isDark ? "Light" : "Dark"} Mode`;
  };

  return (
    <Router>
      <Navbar title="TextAPI" switchTheme={switchTheme} />
      <div className="container">
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<TextBar
                showAlert={showAlert}
                title="Enter your text to analyze...."
              />} />
          <Route exact path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
