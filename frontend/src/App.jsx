import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Scenario } from "./components/Scenario";
import { ChatInterface } from "./components/ChatInterface";
import ErrorBoundary from "./ErrorBoundary";

function App() {
    return (
        <>
            <Loader />
            <ChatInterface />
            <ErrorBoundary>
            <Canvas shadows camera={{ position: [0,0,-10], fov: 17 }}>
                <Scenario />
            </Canvas>
            </ErrorBoundary>
        </>
    );
}

export default App;
