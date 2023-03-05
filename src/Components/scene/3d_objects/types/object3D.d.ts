interface Object3D {
    id?: string;
    mass: number;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    collide: {
        scale: number;
    }
    material: {
        friction: number;
        restitution: number;
    },
    type: "Kinematic" | "Dynamic" | "Static"; 
    body?: any | null;
}

export {
    Object3D
}