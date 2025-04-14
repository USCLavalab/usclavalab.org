import { useEffect, useState } from "react";

function useScreenWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Only run on the client
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default useScreenWidth;
