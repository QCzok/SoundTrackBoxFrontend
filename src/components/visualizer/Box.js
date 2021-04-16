import React, { useRef } from 'react'

function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    return (
      <mesh
        position={props.position}
        ref={mesh}
        scale={props.scale}>
        <boxGeometry args={[1, 2, 3]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
    )
  }

export default Box;