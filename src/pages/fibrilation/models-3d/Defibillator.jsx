import { useGLTF } from "@react-three/drei";

const Lung = (props) => {
  const { nodes, materials } = useGLTF("../../../assets/fibrilation/Defibillator.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Lung.geometry}
        material={materials.LungMaterial}
        castShadow
      />
    </group>
  );
};

export default Lung;

useGLTF.preload("../../../assets/fibrilation/Defibillator.glb");