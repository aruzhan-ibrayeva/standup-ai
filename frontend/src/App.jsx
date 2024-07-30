import { useState } from "react";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Scenario } from "./components/Scenario";
import { ChatInterface } from "./components/ChatInterface";
import ErrorBoundary from "./ErrorBoundary";
import './App.css';
import { SpeechProvider } from "./hooks/useSpeech";
import { Analytics } from '@vercel/analytics/react';

function App() {
    const [selectedComedian, setSelectedComedian] = useState("DaveChapelle");

    return (
        <>
        <SpeechProvider>
            <div className="app-container flex flex-col md:flex-row">
                <Loader />
                <ChatInterface selectedComedian={selectedComedian} />
                <ErrorBoundary>
                    <div className="sidebar flex flex-col">
                        <div className="thumbnail" onClick={() => setSelectedComedian("DaveChapelle")}>
                            <img src="/davechapelle-thumbnail.jpg" alt="Dave Chapelle" />
                            <p>Dave Chappelle</p>
                        </div>
                        <div className="thumbnail" onClick={() => setSelectedComedian("Kharlamov")}>
                            <img src="/kharlamov-thumbnail.jpg" alt="Kharlamov" />
                            <p>Garik Kharlamov</p>
                        </div>
                        <div className="thumbnail" onClick={() => setSelectedComedian("Saburov")}>
                            <img src="/saburov-thumbnail.jpg" alt="Saburov" />
                            <p>Nurlan Saburov</p>
                        </div>
                    </div>
                    <div className="canvas-container">
                        <Canvas
                            shadows
                            camera={{ position: [0, 0, -10], fov: 17 }}
                            onCreated={({ camera }) => {
                                camera.lookAt(0, 0, 0);
                                camera.updateProjectionMatrix();
                            }}
                            style={{ pointerEvents: 'none' }}
                        >
                            <Scenario selectedComedian={selectedComedian} />
                        </Canvas>
                    </div>
                </ErrorBoundary>
            </div>
        </SpeechProvider>
        <Analytics />
        </>
    );
}

export default App;
