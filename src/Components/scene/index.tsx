import React, { useEffect } from "react";
import { OrbitControls, PerspectiveCamera, Html } from "@react-three/drei";
import { Physics, Debug } from "@react-three/cannon";
import { Canvas, useFrame } from "@react-three/fiber";
import { Euler, Vector3 } from "three";

// components
import { HomePage } from "@/Components/home_page";

// 3d objects
import { PingPongTable } from "@/Components/scene/3d_objects/table";
import { PingPongBall } from "@/Components/scene/3d_objects/ball";
import { Ground } from "@/Components/scene/3d_objects/ground";
import { PingPongRacket } from "./3d_objects/racket";
import { type Object3D } from "@/Components/scene/3d_objects/types";

import { World3d } from "@/Components/scene/3d_objects/world";

export function Scene() {
    const [gravity, setGravity] = React.useState(-5);
    const CameraRef = React.useRef<any>();

    const [Racket, setRacket] = React.useState<Object3D>({
        mass: 10,
        position: [0, 1.5, -1.3],
        rotation: [Math.PI / 2, 0, 0],
        scale: 1.3,
        collide: {
            scale: 1.3,
        },
        material: {
            friction: 0.1,
            restitution: 0.5,
        },
        type: "Kinematic",
        body: null
    });

    const [Ball, setBall] = React.useState<Object3D>({
        mass: 0.1,
        position: [0, 1.3, 0.1],
        rotation: [0, 0, 0],
        scale: 0.03,
        collide: {
            scale: 0.03,
        },
        material: {
            friction: 0.1,
            restitution: 0.5,
        },
        type: "Dynamic",
        body: null
    });

    const [Table, setTable] = React.useState<Object3D>({
        mass: 10,
        position: [0, 0.55, 0],
        rotation: [0, 0, 0],
        scale: 1.5,
        collide: {
            scale: 2,
        },
        material: {
            friction: 0.1,
            restitution: 0.5,
        },
        type: "Static",
        body: null
    });

    useEffect(() => {
        // console.log("Racket", Racket);
        // console.log("Ball", Ball);
        console.log("Table", Table);

        if (CameraRef?.current)
            CameraRef?.current.lookAt(new Vector3(0, 1, 0));
    }, [Racket, Ball, Table]);

    return (
        <>
            <Canvas shadows>
                <Physics
                    gravity={[0, gravity, 0]}
                    iterations={20}
                    tolerance={0.0001}
                    defaultContactMaterial={{
                        friction: 0.1,
                        restitution: 0.5, // restitution is a property that determines how much energy is conserved when two objects collide. In Three.js, restitution is used to simulate the way objects bounce off each other when they collide.
                    }}
                >
                    {/* change the background of the Scene */}
                    <color attach="background" args={["#000"]} />
                    {/* simulate atmospheric effects */}
                    <fog attach="fog" args={["#000", 10, 80]} />

                    {/* <pointLight
                        color={"white"}
                        position={[0, 2, 0]}
                        castShadow
                        shadow-bias={-0.0001}
                        intensity={0.5}
                    /> */}
                    {/* <OrbitControls
                        target={[0, 0.35, 0]}
                        maxPolarAngle={Math.PI / 2}
                        enablePan={false}
                        enableZoom={true}
                        enableRotate={true}
                    /> */}
                    <PerspectiveCamera
                        makeDefault
                        position={new Vector3(0, 1.4, -2.5)}
                        fov={75}
                        ref={CameraRef}
                    />

                    <ambientLight intensity={0.9} position={new Vector3(0, 10, 10)} />

                    <spotLight
                        // color={"#f48fb1"}
                        color={"#fff"}
                        intensity={1.5}
                        angle={0.6}
                        penumbra={0.5}
                        position={[5, 40, -16]}
                        castShadow
                        shadow-bias={-0.00001}
                        shadow-mapSize-width={1048}
                        shadow-mapSize-height={1048}
                    />
                    {/* 

                    <spotLight
                        // color={"#0d47a1"}
                        color={"#fff"}
                        intensity={4}
                        angle={0.6}
                        penumbra={0.5}
                        position={[-10, 0, 16]}
                        castShadow
                        shadow-bias={-0.00001}
                        shadow-mapSize-width={1048}
                        shadow-mapSize-height={1048}
                    /> */}

                    <Debug scale={1} color={"red"}>
                        <PingPongTable Table={Table} setTable={setTable} />
                    </Debug>
                    <Debug scale={1} color={"blue"}>
                        <PingPongBall Ball={Ball} />
                    </Debug>
                    <Debug scale={1} color={"yellow"}>
                        <PingPongRacket Racket={Racket} setRacket={setRacket} Camera={CameraRef} />
                    </Debug>
                    {/* <Ground /> */}

                    <World3d />

                    <Html fullscreen as="div">
                        {/* <HomePage /> */}
                    </Html>
                    {/* </Debug> */}
                </Physics>
            </Canvas>
        </>
    );
}
