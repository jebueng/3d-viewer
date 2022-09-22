import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";
import { softShadows, MeshWobbleMaterial, OrbitControls, Box } from "drei";

const Quarter = ({ position, color, speed, args }) => {
    const mesh = useRef();

    //useFrame allows us to re-render/update rotation on each frame
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  
    //Basic expand state
    const [expand, setExpand] = useState(false);
    // React spring expand animation
    const props = useSpring({
      scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
    });

    args = [0.955, 0.955, 0.069, 16]

    return (
      <a.mesh
        position={position}
        ref={mesh}
        onClick={() => setExpand(!expand)}
        scale={props.scale}
        castShadow>
        <cylinderBufferGeometry attach='geometry' args={args} />
        <MeshWobbleMaterial
          color={color}
          speed={speed}
          attach='material'
          factor={0.1}
        />
      </a.mesh>
  
    // drei version
    //   <Box {...props} ref={mesh} castShadow>
    //     <MeshWobbleMaterial
    //       {...props}
    //       attach='material'
    //       factor={0.6}
    //       Speed={1}
    //     />
    //   </Box>
    );
};

export default Quarter;
