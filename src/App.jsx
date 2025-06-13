import "./App.css";
import "./Images.css";
import Layer from "./Layer";

function App() {
  return (
    <>
      <div id="container">
        <div id="image">
          <Layer
            className={"background"}
            src={"/images/fond.png"}
            start={[0, 0]}
            size={[1, 1]}
            z={0}
            hoverable={false}
            hide
          />

          <Layer
            className={"griffons"}
            src={"/images/griffons.png"}
            start={[0, 0]}
            size={[1, 1]}
            z={2}
            hoverable={true}
          />

          <Layer
            src={"/images/scotch.png"}
            start={[0, 0]}
            size={[1, 1]}
            z={3}
            hoverable={true}
          />

          <Layer
            className={"texte"}
            src={"/images/texte.png"}
            start={[0, 0]}
            size={[1, 1]}
            z={4}
            hoverable={true}
          />

          <Layer
            src={"/images/ose.png"}
            start={[0, 0.25]}
            size={[0.5, 0.3]}
            z={10}
            draggable
          />

          <Layer
            src={"/images/granit.png"}
            start={[0, 0]}
            size={[0.45, 0.47]}
            z={12}
            draggable
          />

          <Layer
            src={"/images/rennes.png"}
            start={[0.13, 0]}
            size={[0.43, 0.51]}
            z={11}
            draggable
          />

          <Layer
            src={"/images/lannion.png"}
            start={[0.5, 0]}
            size={[0.44, 0.51]}
            z={12}
            draggable
          />

          <Layer
            src={"/images/moi.png"}
            start={[0.22, 0.3]}
            size={[0.76, 0.72]}
            z={100}
            draggable
          />
        </div>
      </div>
    </>
  );
}

export default App;
