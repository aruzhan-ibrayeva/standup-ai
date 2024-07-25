import { CameraControls, Environment, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { DaveChapelle } from "./DaveChapelle";
import { Kharlamov } from "./Kharlamov";
import { Saburov } from "./Saburov";

export const Scenario = ({ selectedComedian }) => {
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
                return <Kharlamov position={[0, 1.45, 0.5]} />;
            case "Saburov":
                return <Saburov position={[0, 1.3,0.5]} />;
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
                <planeGeometry args={[viewport.width*1.7, viewport.height*1.7]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    );
};
