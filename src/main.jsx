import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./scss/Main.scss";
import { BrowserRouter } from "react-router-dom";
import { AllCryptoProvider } from "./context/Context.jsx";
import 'react-alice-carousel/lib/alice-carousel.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AllCryptoProvider>
      <App />
    </AllCryptoProvider>
  </BrowserRouter>
);
