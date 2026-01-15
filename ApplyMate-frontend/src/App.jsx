import { useState } from "react";
import Input from "./components/Input";
import Results from "./components/Results";
import './App.css';
import Header from "./components/Header";

function App() {
  const [currentView, setCurrentView] = useState("form"); // "form" or "results"
  const [generatedData, setGeneratedData] = useState(null);

  const handleGenerationComplete = (data) => {
    setGeneratedData(data);
    setCurrentView("results");
  };

  const handleGenerateAnother = () => {
    setCurrentView("form");
    setGeneratedData(null);
  };

  return (
    <div className="main">
      <Header />
      {currentView === "form" ? (
        <Input onGenerationComplete={handleGenerationComplete} />
      ) : (
        <Results data={generatedData} onGenerateAnother={handleGenerateAnother} />
      )}
    </div>
  );
}

export default App;
