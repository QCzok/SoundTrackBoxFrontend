import { Canvas } from '@react-three/fiber'
import Box from './Box';
import Sphere from './Sphere';
import '../../App.css';
import ReactDOM from 'react-dom'

const draw = (id, canvas, bufferLength, dataArray, ctx) => {

    switch (id) {
        case 1: drawVisualizationOne(canvas, bufferLength, dataArray, ctx); break;
        case 2: drawVisualizationSecond(canvas, bufferLength, dataArray, ctx); break;
        case 3: drawVisualizationThird(canvas, bufferLength, dataArray, ctx); break;
        default: drawVisualizationOne(canvas, bufferLength, dataArray, ctx); break;
    }
}

const myArray = Array.from(Array(32).keys())

const normalize = (val, max, min) => { return (val - min) / (max - min); }


function FillLight({ brightness, color }) {
    return (
        <rectAreaLight
            width={3}
            height={3}
            intensity={brightness}
            color={color}
            position={[2, 1, 4]}
            lookAt={[0, 0, 0]}
            penumbra={2}
            castShadow
        />
    );
}

function RimLight({ brightness, color }) {
    return (
        <rectAreaLight
            width={2}
            height={2}
            intensity={brightness}
            color={color}
            position={[1, 4, -2]}
            rotation={[0, 180, 0]}
            castShadow
        />
    );
}

// Geometry
function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[5, 0, 0]} position={[0, -1, 0]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
    );
  }
  function BackDrop() {
    return (
      <mesh receiveShadow position={[0, -1, -5]}>
        <planeBufferGeometry attach="geometry" args={[500, 500]} />
        <meshStandardMaterial attach="material" color="white" />
      </mesh>
    );
  }

const drawVisualizationOne = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            const barWidth = (canvas.width / bufferLength) - 1;
            let posX = 0;
            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] + 140) * 2;
                ctx.fillStyle = 'chocolate';
                ctx.fillRect(posX, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                posX += barWidth + 1;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const drawVisualizationSecond = (canvas, bufferLength, dataArray, ctx) => {
    try {
        if (canvas) {
            
            ReactDOM.render(
                <Canvas id="canvas">
                    <GroundPlane></GroundPlane>
                    <BackDrop></BackDrop>
                    <FillLight brightness={2.6} color={"#bdefff"} />
                    <RimLight brightness={54} color={"#fff"} />
                    <pointLight position={[10, 10, 10]} />

                    {myArray.map((person, index) => (
                        <Box key={index} position={[index/4, 0, 0]} scale={normalize(dataArray[index], -40, 40)} color={'hotpink'} />
                    ))}
                                        {myArray.map((person, index) => (
                        <Box key={index} position={[-index/4, 0, 0]} scale={normalize(dataArray[index], -40, 40)} color={'orange'} />
                    ))}
                </Canvas>,
                document.getElementById('container')
            )
            
        }
    } catch (error) {
        console.log(error);
    }
}

const drawVisualizationThird = (canvas, bufferLength, dataArray, ctx) => {
    try {
        const sum = dataArray.reduce((a, b) => a + b, 0);
        const avg = (sum / bufferLength) || 0;
        if (canvas) {
            ReactDOM.render(
                <Canvas id="canvas">
                    <GroundPlane></GroundPlane>
                    <BackDrop></BackDrop>
                    <FillLight brightness={2.6} color={"blue"} />
                    <RimLight brightness={54} color={"red"} />
                    <pointLight position={[10, 10, 10]} />
                    <Sphere volume={avg * -0.03}/>
                </Canvas>,
                document.getElementById('container'),
            )
        }
    } catch (error) {
        console.log(error);
    }
}

export default draw;