import "./App.css";
import "./Images.css";
import Layer from "./Layer";
import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

function App() {
  const [resetKey, setResetKey] = useState(0);
  const handleReset = () => setResetKey((k) => k + 1);

  const [showInfo, setShowInfo] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoText, setInfoText] = useState("");

  const [currentInfo, setCurrentInfo] = useState(-1);

  return (
    <>
      <div id="container">
        <button
          onClick={() => {
            handleReset();
            setShowInfo(false);
          }}
          className="reset-button"
        >
          Réinitialiser
        </button>
        <div id="image-container">
          <div id="image" key={resetKey}>
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
              onPress={() => {
                setInfoTitle("Lannion, France");
                setInfoText(
                  "Cette photo vient d'un café dans le centre de Lannion."
                );
                if (currentInfo == 1) {
                  setShowInfo(false);
                  setCurrentInfo(-1);
                } else {
                  setShowInfo(true);
                  setCurrentInfo(1);
                }
              }}
            />
            <Layer
              src={"/images/granit.png"}
              start={[0, 0]}
              size={[0.45, 0.47]}
              z={12}
              draggable
              onPress={() => {
                setInfoTitle("Île aux Lapins");
                setInfoText("C'est un rocher sympa de la côte de granit rose.");
                if (currentInfo == 2) {
                  setShowInfo(false);
                  setCurrentInfo(-1);
                } else {
                  setShowInfo(true);
                  setCurrentInfo(2);
                }
              }}
            />
            <Layer
              src={"/images/rennes.png"}
              start={[0.13, 0]}
              size={[0.43, 0.51]}
              z={11}
              draggable
              onPress={() => {
                setInfoTitle("Rennes, France");
                setInfoText("Objectivement la meilleure ville du pays.");
                if (currentInfo == 3) {
                  setShowInfo(false);
                  setCurrentInfo(-1);
                } else {
                  setShowInfo(true);
                  setCurrentInfo(3);
                }
              }}
            />
            <Layer
              src={"/images/lannion.png"}
              start={[0.5, 0]}
              size={[0.44, 0.51]}
              z={12}
              draggable
              onPress={() => {
                setInfoTitle("Lannion, France");
                setInfoText("Lieu de résidence d'Alexandre Picogna");
                if (currentInfo == 4) {
                  setShowInfo(false);
                  setCurrentInfo(-1);
                } else {
                  setShowInfo(true);
                  setCurrentInfo(4);
                }
              }}
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

        <div id="informations" className={showInfo ? "open" : ""}>
          <AnimatePresence mode="wait">
            {showInfo && (
              <motion.div
                id="informations-content"
                key={currentInfo}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
              >
                {infoTitle.trim().length > 0 && <h3>{infoTitle}</h3>}
                <p>{infoText}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="credits">Vince LINISE - MMI 1A1 - 2025</p>
      </div>
    </>
  );
}

export default App;
