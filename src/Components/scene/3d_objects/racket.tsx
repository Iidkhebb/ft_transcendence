import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useConvexPolyhedron } from "@react-three/cannon";
import { useMemo } from "react";
import { threeToCannon, ShapeType } from "three-to-cannon";
import * as THREE from "three";
import { type meshRef } from "./types/mesh";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "./types";

interface props {
    setRacket: Function;
    Racket: Object3D;
    Camera: any
}

export function PingPongRacket({ Camera, setRacket, Racket }: props) {
    const { scene } = useGLTF("/models/racket.glb", undefined, undefined, (e) => {
        // e.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        //     console.log(
        //         "Loading Rocket file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files."
        //     );
        // };
        // e.manager.onLoad = () => {
        //     console.log(e);
        // };
    });

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        setRacket((prev: any) => {
            prev.id = scene.id | 0;
            return {
                ...prev,
            };
        });
    }, [scene]);

    const shape = useMemo(() => {
        return threeToCannon(scene, { type: ShapeType.BOX })?.shape;
    }, [scene]);
    
    const [ref_racket, api_racket] = useConvexPolyhedron(() => ({
        mass: Racket.mass,
        position: Racket.position,
        rotation: Racket.rotation,
        type: Racket.type,
        material: Racket.material,
        collisionFilterGroup: 5,
        collisionFilterMask: 5,
        args: [
            // @ts-ignore
            shape.convexPolyhedronRepresentation.vertices.map((v) => [
                v.x * Racket.collide.scale,
                v.y * Racket.collide.scale,
                v.z * Racket.collide.scale,
            ]),
            // @ts-ignore
            shape.convexPolyhedronRepresentation.faces,
            // @ts-ignore
            shape.convexPolyhedronRepresentation.faceNormals.map((f) => [
                f.x * Racket.collide.scale,
                f.y * Racket.collide.scale,
                f.z * Racket.collide.scale,
            ]),
        ],
        onCollide(e) {
            console.log(e.body.id);
        },
    }));

    // make the racket follow the mouse
    useEffect(() => {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 3;

        const mouseMove = (e: MouseEvent) => {
            console.log(mouseX, mouseY);

            if (document.pointerLockElement === document.body || true) {
                if (mouseX + e.movementX <= window.innerWidth && mouseX + e.movementX > 0) {
                    mouseX += e.movementX;
                }
                if (mouseY + e.movementY < window.innerHeight && mouseY + e.movementY > -500) {
                    mouseY += e.movementY;
                }
            }

            const x = (mouseX / window.innerWidth) * 2 - 1;
            const y = -(mouseY / window.innerHeight) * 2 + 1;



            // move the racket
            api_racket.position.set(-x * 1, y , -1.7);
            // rotate the racket
            api_racket.rotation.set(Math.PI / 2, x * 2, -x * 0.5);

            // move the camera
            let cameraPosition = Camera.current.position;
            Camera.current.position.set(cameraPosition.x + e.movementX / 2000, cameraPosition.y, cameraPosition.z);
            Camera.current.lookAt(0, 1, 0);

        };
        window.addEventListener("mousemove", mouseMove);

        // // lock the mouse in the center of the screen
        document.addEventListener("pointerlockchange", () => {
            if (document.pointerLockElement) {
                document.addEventListener("mousemove", mouseMove);
            } else {
                document.removeEventListener("mousemove", mouseMove);
            }
        });

        // click to lock the mouse
        document.addEventListener("click", handleClick);

        // escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") handleKeyEscape();

            // change view
            if (e.key == "w") {
                let cameraPosition = Camera.current.position;
                Camera.current.position.set(cameraPosition.x, cameraPosition.y + 0.1, cameraPosition.z);
            }
            if (e.key == "s") {
                let cameraPosition = Camera.current.position;
                Camera.current.position.set(cameraPosition.x, cameraPosition.y - 0.1, cameraPosition.z);
            }
        });

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    function handleClick() {
        document.body.requestPointerLock();
        // remove the mouce icon from the screen
        document.body.style.cursor = "none";
    }

    function handleKeyEscape() {
        document.exitPointerLock();
        // restore the mouse icon
        document.body.style.cursor = "auto";
    }

    return (
        <mesh ref={ref_racket as meshRef} castShadow receiveShadow>
            <primitive object={scene} />
        </mesh>
    );
}
