import React, { useState } from "react";
import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { type meshRef } from "./types/mesh";
import { useEffect } from "react";
import { type Object3D } from "./types";

export function PingPongBall({ Ball }: { Ball: Object3D }) {
    const [ref, api] = useSphere(() => ({
        mass: 0.1,
        position: Ball.position,
        rotation: Ball.rotation,
        args: [Ball.scale],
        type: Ball.type,
        material: Ball.material,
        scale: Ball.scale,

        onCollide(e) {
            // make the ball bounce
            api.velocity.set(0, 2.5, -1);
            api.angularVelocity.set(-50, 0, 0);

            // if the ball hits the table, make it bounce
            // console.log(e.body.id); 

            // if (e.body.id === 532 || e.body.id === 546 || e.body.id === 547 || e.body.id === 538 || e.body.id === 533) {
                api.velocity.set(0, 1.6, -2);
                api.angularVelocity.set(0, 0, 0);
            // } else { 
            console.log(e.body.id);
        },
    }));

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                // reset the ball
                api.position.set(Ball.position[0], Ball.position[1], Ball.position[2]);
                api.velocity.set(0, 0, 0);
                api.angularVelocity.set(0, 0, 0);
            }
        });
    }, []);

    return (
        <mesh ref={ref as meshRef} castShadow receiveShadow>
            <sphereGeometry args={[Ball.scale]} />
            <meshStandardMaterial color={"red"} />
        </mesh>
    );
}
