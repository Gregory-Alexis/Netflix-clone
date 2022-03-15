import Home from "./pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 300 });

function App() {
  return (
    <>
      <div className="bg-darknet min-h-screen">
        <Home />
      </div>
    </>
  );
}

export default App;
