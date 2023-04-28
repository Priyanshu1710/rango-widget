import "./App.css";
import { Widget } from "@rango-dev/widget-embedded";

function App() {
  const config = {
    // use your own api key
    apiKey: "3635c597-77fe-4988-b258-23e1c13d98d6"
  };

  return (
    <div className="App">
      <Widget config={config} />
    </div>
  );
}

export default App;
