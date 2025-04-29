import { useGLTF } from "@react-three/drei";

const Pain = (props) => {
  const { nodes, materials } = useGLTF("../../../assets/fibrilation/Pain.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Pain.geometry}
        material={materials.PainMaterial}
        castShadow
      />
    </group>
  );
};

export default Pain;

useGLTF.preload("../../../assets/fibrilation/Pain.glb");