import { Analytics } from "@vercel/analytics/react"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SpeechProvider } from "./hooks/useSpeech";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SpeechProvider>
            <App />
            <Analytics />
        </SpeechProvider>
    </React.StrictMode>
);
