import { CameraControls, Environment, useTexture, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DaveChapelle } from "./DaveChapelle";
import { Kharlamov } from "./Kharlamov";
import { Saburov } from "./Saburov";
import { useSpeech } from "../hooks/useSpeech";
import { ChatInterface } from "./ChatInterface";

export const Scenario = ({ selectedComedian }) => {
    const { setComedian } = useSpeech();
    
    useEffect(() => {
        setComedian(selectedComedian);
    }, [selectedComedian, setComedian]);

    const texture = useTexture(`textures/${selectedComedian.toLowerCase()}.jpg`);
    const viewport = useThree((state) => state.viewport);

    const cameraControls = useRef();
    useEffect(() => {
        cameraControls.current.setLookAt(0, 2.5, 10, 0, 2.5, 0, true);
    }, []);

    const renderComedian = () => {
        switch (selectedComedian) {
            case "DaveChapelle":
                return <DaveChapelle position={[0, 1.6, 0.8]} />;
            case "Kharlamov":
                return <Kharlamov position={[0, 1.5, 0.5]} />;
            case "Saburov":
                return <Saburov position={[0, 1.45, -2]} />;
            default:
                return null;
        }
    };

    return (
        <>
            <CameraControls ref={cameraControls} />
            {renderComedian()}
            <Environment preset="sunset" />
            <mesh position={[0, 2.5, -7]}>
                <planeGeometry args={[viewport.width * 1.7, viewport.height * 1.7]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <Html position={[0, 0, 0]} className="chat-interface-container">
                <ChatInterface selectedComedian={selectedComedian} />
            </Html>
        </>
    );
};
