import "./App.css";
import "./Images.css";
import Layer from "./Layer";

function App() {
  return (
    <>
      <div id="container">
        <div id="image">
          <Layer
            src={"/images/reference.webp"}
            start={[0, 0]}
            end={[1, 1]}
            z={0}
          />
        </div>
      </div>
    </>
  );
}

export default App;
