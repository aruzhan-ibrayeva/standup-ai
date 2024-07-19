import { CameraControls, Environment, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Avatar } from "./Avatar";

export const Scenario = () => {
    const texture = useTexture("textures/nomic.jpg");
    const viewport = useThree((state) => state.viewport);

    const cameraControls = useRef();
    useEffect(() => {
        cameraControls.current.setLookAt(0, 2.5, 10, 0, 2.5, 0, true);
    }, []);

    return (
        <>
            <CameraControls ref={cameraControls} />
            <Avatar position={[0, 1.6, 1.4]} />
            <Environment preset="sunset" />
            <mesh position={[0, 2.5, -7]}>
                <planeGeometry args={[viewport.width*1.7, viewport.height*1.7]} />
                <meshBasicMaterial map={texture} />
            </mesh>
        </>
    );
};
