// AnimationComponent.jsx
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";


const LottieAnimation = ({ animationData }) => {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    if (!animationContainerRef.current) return; // Ensure the container is available

    const anim = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => anim.destroy(); // Clean up on unmount
  }, [animationData]);

  return (
    <div
      ref={animationContainerRef}
      className="floating"
      style={{ width: "500px" }}
    ></div>
  );
};

export default LottieAnimation;
