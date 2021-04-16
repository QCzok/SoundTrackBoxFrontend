import React, { useRef } from 'react'

function Sphere(props) {
    return (
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={props.volume}>
            <sphereGeometry attach="geometry" args={[1, 64, 64]} />
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                roughness={0.1}
                metalness={0.1}
            />
        </mesh>
    );
}

export default Sphere;