const Recipient = () => {
    return (
      <mesh
        rotation-x={-Math.PI / 2}
        receiveShadow={true}
        position-y={-0.1}
      >
        <circleGeometry args={[4, 32]} />
        <meshStandardMaterial roughness={0.8} metalness={1} />
      </mesh>
    );
  };
  
  export default Recipient;
  