// client/src/pages/GamePage/GamePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UnityPlayer = ({ loaderUrl, dataUrl, frameworkUrl, codeUrl }) => {
  const { Unity, useUnityContext } = require("react-unity-webgl");

  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl,
    dataUrl,
    frameworkUrl,
    codeUrl,
  });

  return (
    <div className="game-container">
      {!isLoaded && (
        <div className="loading-screen">Loading {Math.round(loadingProgression * 100)}%</div>
      )}
      <Unity unityProvider={unityProvider} className="unity-canvas" />
    </div>
  );
};

function GamePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loaderCheck, setLoaderCheck] = useState({ checking: true, ok: false, info: null });

  const rawBackend = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const backendUrl = String(rawBackend).replace(/\/+$/, "");

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

  useEffect(() => {
    let cancelled = false;
    async function checkLoader() {
      setLoaderCheck({ checking: true, ok: false, info: null });
      try {
        const resp = await fetch(loaderUrl, { method: "GET" });
        const ct = resp.headers.get("content-type") || "";
        if (!resp.ok) {
          if (!cancelled) setLoaderCheck({ checking: false, ok: false, info: `HTTP ${resp.status} ${resp.statusText}` });
          return;
        }
        if (ct.includes("text/html")) {
          if (!cancelled) setLoaderCheck({ checking: false, ok: false, info: `Returned content-type text/html (probably a rewrite). URL: ${loaderUrl}` });
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

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Portfolio
      </button>

      {loaderCheck.checking && <div className="loading-screen">Checking game loader…</div>}

      {!loaderCheck.checking && !loaderCheck.ok && (
        <div style={{ color: "red", padding: 20 }}>
          <h3>Unable to load Unity loader</h3>
          <p>{loaderCheck.info}</p>
          <p>
            Check that your backend is deployed and reachable:
            <br />
            <code>{loaderUrl}</code>
          </p>
        </div>
      )}

      {!loaderCheck.checking && loaderCheck.ok && (
        <UnityPlayer loaderUrl={loaderUrl} dataUrl={dataUrl} frameworkUrl={frameworkUrl} codeUrl={codeUrl} />
      )}
    </div>
  );
}

export default GamePage;
