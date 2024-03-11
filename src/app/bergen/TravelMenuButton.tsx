import React from "react";
import { Button } from "antd";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";

export const TravelMenuButton = ({ mode, setMode }) => {
	const handleModeChange = (mode) => {
		setMode(mode);
		// Set area color based on mode
		switch (mode) {
			case "walk":
				setAreaColor("green");
				break;
			case "bike":
				setAreaColor("blue");
				break;
			case "car":
				setAreaColor("red");
				break;
			case "transit":
				setAreaColor("yellow");
				break;
			default:
				setAreaColor("blue");
		}
	};

	return (
		<div className="leaflet-top leaflet-right">
			<div className="leaflet-control leaflet-bar leaflet-control-layers">
				<div className="markers">
					<Button
						onClick={() => handleModeChange("walk")}
						title="Walk mode"
						className={mode === "walk" ? "active" : ""}
					>
						<FaWalking />
					</Button>
					<Button
						onClick={() => handleModeChange("bike")}
						title="Bike mode"
						className={mode === "bike" ? "active" : ""}
					>
						<MdDirectionsBike />
					</Button>
					<Button
						onClick={() => handleModeChange("car")}
						title="Car mode"
						className={mode === "car" ? "active" : ""}
					>
						<FaCar />
					</Button>
					<Button
						onClick={() => handleModeChange("transit")}
						title="Transit mode"
						className={mode === "transit" ? "active" : ""}
					>
						<MdOutlineDirectionsTransitFilled />
					</Button>
				</div>
			</div>
		</div>
	);
};

// "use client";

// import React, { useState } from "react";
// import { Button } from "antd";
// import { FaWalking } from "react-icons/fa";
// import { MdDirectionsBike } from "react-icons/md";
// import { FaCar } from "react-icons/fa";
// import { MdOutlineDirectionsTransitFilled } from "react-icons/md";

// import { LayersControl } from "react-leaflet";
// import { GeoJSON } from "react-leaflet"; // test

// export const TravelMenuButton = ({ asyncTgm, mode, setMode }) => {
// 	const handleModeChange = (mode) => {
// 		setMode(mode);
// 	};
// 	return (
// 		<div className="leaflet-top leaflet-right">
// 			<div className="leaflet-control leaflet-bar leaflet-control-layers">
// 				<div className="markers">
// 					<Button
// 						onClick={() => handleModeChange("walk")}
// 						title="walk mode"
// 					>
// 						<FaWalking />
// 					</Button>
// 					<Button
// 						onClick={() => handleModeChange("bike")}
// 						title="bike mode"
// 					>
// 						<MdDirectionsBike />
// 					</Button>
// 					<Button
// 						onClick={() => handleModeChange("car")}
// 						title="car mode"
// 					>
// 						<FaCar />
// 					</Button>
// 					<Button
// 						onClick={() => handleModeChange("walk")}
// 						title="transit mode"
// 					>
// 						<MdOutlineDirectionsTransitFilled />
// 					</Button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
