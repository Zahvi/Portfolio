import React, { useEffect, useState } from "react";
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

  if (!buildUrl) return <div className="game-not-found">Game not found.</div>;

  const loaderUrl = `${buildUrl}/Dist.loader.js`;
  const dataUrl = `${buildUrl}/Dist.data.unityweb`;
  const frameworkUrl = `${buildUrl}/Dist.framework.js.unityweb`;
  const codeUrl = `${buildUrl}/Dist.wasm.unityweb`;

  const [loaderCheck, setLoaderCheck] = useState({ checking: true, ok: false, info: null });

  // Pre-check loader URL
  useEffect(() => {
    let cancelled = false;
    async function checkLoader() {
      try {
        const resp = await fetch(loaderUrl);
        const ct = resp.headers.get("content-type") || "";
        if (!resp.ok) {
          if (!cancelled) setLoaderCheck({ checking: false, ok: false, info: `HTTP ${resp.status} ${resp.statusText}` });
          return;
        }
        if (ct.includes("text/html")) {
          if (!cancelled)
            setLoaderCheck({
              checking: false,
              ok: false,
              info: `Returned content-type text/html (probably server misconfigured).`,
            });
          return;
        }
        if (!cancelled) setLoaderCheck({ checking: false, ok: true, info: `OK — content-type: ${ct}` });
      } catch (err) {
        if (!cancelled) setLoaderCheck({ checking: false, ok: false, info: String(err) });
      }
    }
    checkLoader();
    return () => { cancelled = true; };
  }, [loaderUrl]);

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
  });

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Portfolio
      </button>

      {loaderCheck.checking && <div className="loading-screen">Checking game loader…</div>}

      {!loaderCheck.checking && !loaderCheck.ok && (
        <div className="error-screen">
          <h3>Unable to load Unity loader</h3>
          <p>{loaderCheck.info}</p>
          <p>Check backend URL: <code>{loaderUrl}</code></p>
        </div>
      )}

      {!loaderCheck.checking && loaderCheck.ok && (
        <div className="game-container">
          {!isLoaded && (
            <div className="loading-screen">
              Loading {Math.round(loadingProgression * 100)}%
            </div>
          )}
          <Unity unityProvider={unityProvider} className="unity-canvas" />
        </div>
      )}
    </div>
  );
}

export default GamePage;
