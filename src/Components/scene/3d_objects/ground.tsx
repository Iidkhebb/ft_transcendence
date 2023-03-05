import { TextureLoader, RepeatWrapping, LinearEncoding, Vector2 } from "three";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { Debug, usePlane } from "@react-three/cannon";
import { useEffect } from "react";

// mesh ref type
interface meshRef extends React.MutableRefObject<THREE.Mesh> {}

export function Ground() {
    const [normal, roughness, base_color] = useLoader(TextureLoader, [
        "/textures/ground/normal.jpg",
        "/textures/ground/roughness.jpg",
        "/textures/ground/base_color.jpg",
    ], (loader) => {
        // info about the loader
    });

    const [ref, api] = usePlane(() => ({
        mass: 10,
        type: "Static",
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
    }));

    useEffect(() => {
        [normal, roughness, base_color].forEach((texture) => {
            texture.wrapS = RepeatWrapping; // horizontal
            texture.wrapT = RepeatWrapping; // vertical
            texture.repeat.set(25, 25);
        });

        normal.encoding = LinearEncoding;
    }, [normal, roughness, , base_color]);

    return (
        <mesh receiveShadow castShadow ref={ref as meshRef}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
                mirror={0.2}
                metalness={0.05}
                normalMap={normal}
                roughnessMap={roughness}
                roughness={5}
                map={base_color}
                // color={"er"}
                // normalScale={new Vector2(0.15, 0.15)}
            />
        </mesh>
    );
}
