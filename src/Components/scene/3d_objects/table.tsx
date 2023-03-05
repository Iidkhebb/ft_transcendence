import { useGLTF } from "@react-three/drei";
import { useBox, useCompoundBody } from "@react-three/cannon";
import { useEffect, useState, useMemo, useRef } from "react";
import React from "react";
import * as THREE from "three";
import { Object3D, type meshRef } from "./types";
import { useFrame } from "@react-three/fiber";

import { threeToCannon, ShapeType } from "three-to-cannon";
import { useConvexPolyhedron } from "@react-three/cannon";

export function PingPongTable({ Table, setTable }: { Table: Object3D, setTable: Function }) {
    const [scale, setScale] = useState(2);
    const [position, setPosition] = useState([0, 1, 0]);

    const [loading, setLoading] = useState(true);

    const { scene } = useGLTF("/models/ping_pong_table.gltf", undefined, undefined, (loader) => {
        // turn on the receiveShadow and castShadow properties
        // loader.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        //     console.log(
        //         "Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files."
        //     );
        // };
        // loader.manager.onLoad = () => {
        //     console.log("@@@@@@@@@@@@@@Table loaded@@@@@@@@@@@@@@@@@");
        //     setLoading(false);
        // };
    });
    const tableRef = useRef(null);

    useEffect(() => {
        // turn on the receiveShadow and castShadow properties
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.receiveShadow = true;
                child.castShadow = true;
            }
        });

        // console.log(tableRef);
    }, [scene]);

    interface table_part {
        key: number;
        shape: any;
        mesh: any;
        api: any;
    }

    const table_parts: table_part[] = scene?.children.map((obj: any, index): table_part => {
        const shape = threeToCannon(obj, { type: ShapeType.HULL })?.shape;
        const [ref, api] = useConvexPolyhedron(() => ({
            mass: Table.mass,
            type: Table.type,
            scale: obj.scale,
            position: [
                obj.position.x + Table.position[0],
                obj.position.y + Table.position[1],
                obj.position.z + Table.position[2],
            ],
            rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
            material: Table.material,
            args: [
                // @ts-ignore
                shape.vertices.map((v) => [v.x, v.y, v.z]),
                // @ts-ignore
                shape.faces,
                // @ts-ignore
                shape.faceNormals.map((f) => [f.x, f.y, f.z]),
            ],
        }));

        const mesh = (
            <mesh
                key={index}
                castShadow
                receiveShadow
                scale={obj.scale}
                position={obj.position}
                rotation={obj.rotation}
                geometry={obj.geometry}
                material={obj.material}
            />
        );
        return { key: index, shape: ref, mesh: mesh, api: api };
    });

    useEffect(() => {
        setTable((prev: any) => {
            return {
                ...prev,
                body: table_parts,
            };
        });
    }, []);

    return (
        <mesh ref={tableRef} position={Table.position} rotation={Table.rotation}>
            {table_parts.map(({ mesh }) => {
                return mesh;
            })}
        </mesh>
    );
}
