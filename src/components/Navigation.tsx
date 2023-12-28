import React, { useState } from "react";

const Navigation = () => {
	const [isActive, setIsActive] = useState(false);

	return (
		<nav className={isActive ? "active" : ""}>
			// Toggle
			<button onClick={() => setIsActive((value) => !value)}>toggle nav</button>
		</nav>
	);
};

export default Navigation;
