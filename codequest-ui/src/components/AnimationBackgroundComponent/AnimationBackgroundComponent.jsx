// AnimationComponent.jsx
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";


const LottieBackgroundAnimation = ({ animationData }) => {
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
      className="lottieBackgroundAnimation"
      style={{ width: "100vw"}}
    ></div>
  );
};

export default LottieBackgroundAnimation;