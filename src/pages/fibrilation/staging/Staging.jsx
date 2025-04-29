import {
    Cloud,
    // Environment,
    Sky,
    Sparkles,
    Stars,
  } from "@react-three/drei";
  import { Color } from "three";
  
  const Staging = () => {
    return (
      <>
        <Stars
          radius={100} // Radius of the sphere in which stars are placed
          depth={50} // Depth of the star field, creating a layered effect
          count={5000} // Total number of stars in the scene
          factor={4} // Star size factor, affecting how large they appear
          saturation={0} // Color saturation of the stars, 0 means grayscale
          fade // Enables fading effect for a more realistic sky
          speed={1} // Speed at which the stars move (if animated)
        />
        <Cloud
          seed={1} // A seeded random will show the same cloud consistently, default: Math.random()
          segments={50} // How many segments or particles the cloud will have, default: 20
          bounds={[8, 3, 2]} // The box3 bounds of the cloud, default: [5, 1, 1]
          concentrate="inside" // How to arrange segment volume inside the bounds, default: inside
          scale={[3, 1.5, 1]} // The general scale of the segments
          volume={7} // The volume/thickness of the segments, default: 6
          smallestVolume={0.3} // The smallest volume when distributing clouds, default: 0.25
          growth={4} // Growth factor for animated clouds (speed > 0), default: 4
          speed={0.3} // Animation factor, default: 0
          fade={12} // Camera distance until the segments will fade, default: 10
          opacity={0.9} // Opacity, default: 1
          color={new Color("#ff9966")} // Color, default: white (sunset orange)
        />
        <Sparkles
          count={256} // Number of particles (default: 100)
          speed={1.5} // Speed of particles (default: 1)
          opacity={1} // Opacity of particles (default: 1)
          color={"yellow"} // Color of particles (default: 100)
          size={4} // Size of particles (default: randomized between 0 and 1)
          scale={[10, 10, 10]} // The space the particles occupy (default: 1)
          noise={1} // Movement factor (default: 1)
        />
        <Sky
          sunPosition={[0, 0, -1]} // Places the sun below the horizon
          inclination={0.2} // Adjusts the inclination to simulate the sunset
          azimuth={180} // Adjusts the azimuth angle to change the light direction
          mieCoefficient={0.005} // Adjusts the atmospheric dispersion
          mieDirectionalG={0.07} // Adjusts the sun's brightness
          rayleigh={3} // Adjusts Rayleigh scattering
          turbidity={10} // Adjusts the sky clarity
        />
      </>
      // <Environment
      //   files={"staging/hdris/hospital/hospital-2k.hdr"}
      //   files={[
      //     "px.png",
      //     "nx.png",
      //     "py.png",
      //     "ny.png",
      //     "pz.png",
      //     "nz.png",
      //   ]}
      //   path="staging/cubemaps/hospital/"
      //   ground={{
      //     height: 60,
      //     radius: 100,
      //     scale: 4,
      //   }}
      //   background
      // />
    );
  };
  
  export default Staging;