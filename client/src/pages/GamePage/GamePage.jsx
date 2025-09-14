import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./GamePage.css";

function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const gameBuilds = {
    "planet-protection": `${backendUrl}/unity/planet-protection/Build`,
    "project-starship": `${backendUrl}/unity/project-starship/Build`,
  };

  const buildUrl = gameBuilds[id];
  if (!buildUrl) return <div>Game not found</div>;

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${buildUrl}/Dist.loader.js`,
    dataUrl: `${buildUrl}/Dist.data.unityweb`,
    frameworkUrl: `${buildUrl}/Dist.framework.js.unityweb`,
    codeUrl: `${buildUrl}/Dist.wasm.unityweb`,
  });

  return (
    <div>
      <button onClick={() => navigate("/")}>← Back</button>
      <div className="game-container">
        {!isLoaded && (
          <div className="loading-screen">
            Loading {Math.round(loadingProgression * 100)}%
          </div>
        )}
        <Unity unityProvider={unityProvider} className="unity-canvas" />
      </div>
    </div>
  );
}

export default GamePage;
