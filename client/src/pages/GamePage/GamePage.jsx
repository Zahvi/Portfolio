import { useNavigate, useParams } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./GamePage.css";

function GamePage() {
  const navigate = useNavigate();

  const { id } = useParams(); // matches App.jsx route

  // Map project slugs to Unity build directories
  const gameBuilds = {
    "planet-protection": "/unity/planet-protection/Build",
    "project-starship": "/unity/project-starship/Build"
  };

  const buildUrl = gameBuilds[id];

  if (!buildUrl) {
    return <div className="game-not-found">Game not found.</div>;
  }

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: `${buildUrl}/Dist.loader.js`,
    dataUrl: `${buildUrl}/Dist.data`,
    frameworkUrl: `${buildUrl}/Dist.framework.js`,
    codeUrl: `${buildUrl}/Dist.wasm`,
  });

  return (
    <div>
      <button
        className="back-button"
        onClick={() => navigate("/")}
      >
        ← Back to Portfolio
      </button>
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
