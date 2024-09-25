import { useMemo } from "react";

const usePositionStyles = (position) => {
	const baseStyles = {
		position: "fixed",
		zIndex: 1000,
	};

	const positionStyles = useMemo(() => {
		switch (position) {
			case "top-left":
				return { ...baseStyles, top: "10px", left: "10px" };
			case "top-right":
				return { ...baseStyles, top: "10px", right: "10px" };
			case "bottom-left":
				return { ...baseStyles, bottom: "10px", left: "10px" };
			case "bottom-right":
				return { ...baseStyles, bottom: "10px", right: "10px" };
			case "center":
				return {
					...baseStyles,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				};
			default:
				return { ...baseStyles, position: "absolute", top: "100%", left: 0 };
		}
	}, [position]);

	return positionStyles;
};

export default usePositionStyles;
