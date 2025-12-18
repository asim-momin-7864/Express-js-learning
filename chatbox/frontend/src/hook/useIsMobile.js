// hooks/useIsMobile.js
import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  return useMediaQuery({ maxWidth: 640 }); // Adjust breakpoint as needed
};

export default useIsMobile;
