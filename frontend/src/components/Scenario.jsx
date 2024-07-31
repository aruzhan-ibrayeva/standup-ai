import { CameraControls, Environment, useTexture, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DaveChapelle } from "./DaveChapelle";
import { Kharlamov } from "./Kharlamov";
import { Saburov } from "./Saburov";
import { useSpeech } from "../hooks/useSpeech";
import { ChatInterface } from "./ChatInterface";
import * as THREE from "three";

export const Scenario = ({ selectedComedian }) => {
    const { setComedian } = useSpeech();

    useEffect(() => {
        setComedian(selectedComedian);
    }, [selectedComedian, setComedian]);

    const texture = useTexture(`textures/${selectedComedian.toLowerCase()}.jpg`);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1); // Set this to 1, 1 for no repeating

    const cameraControls = useRef();
    useEffect(() => {
        cameraControls.current.setLookAt(0, 2.5, 10, 0, 2.5, 0, true);
    }, []);

    const renderComedian = () => {
        switch (selectedComedian) {
            case "DaveChapelle":
                return <DaveChapelle position={[0, 1.56, 0]} />;
            case "Kharlamov":
                return <Kharlamov position={[0, 1.59, -1]} />;
            case "Saburov":
                return <Saburov position={[0, 1.6, -2.5]} />;
            default:
                return null;
        }
    };

    return (
        <>
            <CameraControls ref={cameraControls} />
            {renderComedian()}
            <Environment preset="sunset" />
            <mesh position={[0, 3.0, -8]}>
                <planeGeometry args={[15, 6]} />
                <meshBasicMaterial map={texture} />
            </mesh>
            <Html position={[0, 0, 0]} className="chat-interface-container">
                <ChatInterface selectedComedian={selectedComedian} />
            </Html>
        </>
    );
};
