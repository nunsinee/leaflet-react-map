"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import { Button } from "antd";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { LatLngId, TargomoClient } from "@targomo/core";
import L from "leaflet";

const Page = () => {
	const [center] = useState([60.364, 5.346]);
	const [isochrone, setIsochrone] = useState(null);
	const [travelMode, setTravelMode] = useState("walk"); // Default travel mode

	useEffect(() => {
		const fetchIsochrone = async () => {
			try {
				const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
				const client = new TargomoClient("westcentraleurope", apiKey);
				const data = await client.polygons.fetch(
					[{ id: 0, lat: center[0], lng: center[1] }],
					{ travelType: travelMode }
				);
				setIsochrone(data);
			} catch (error) {
				console.error("Error fetching isochrone data:", error);
				setIsochrone(null); // Reset isochrone data in case of error
			}
		};
		fetchIsochrone();
	}, [center, travelMode]);

	const handleModeChange = (mode) => {
		setTravelMode(mode);
	};

	return (
		<MapContainer
			style={{ height: "100vh", width: "100%" }}
			center={center}
			zoom={13}
		>
			<TileLayer
				attribution="Your tile layer attribution here"
				url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
			/>

			{isochrone && (
				<GeoJSON
					key={travelMode} // Ensure GeoJSON updates when travel mode changes
					data={isochrone}
					style={() => ({
						fillColor: "red",
						fillOpacity: 0.3,
						color: "red",
						weight: 2,
					})}
				/>
			)}

			<div className="leaflet-top leaflet-right">
				<Button
					id="btn-walk"
					title="walk mode"
					className={`ant-btn-primary ${
						travelMode === "walk" ? "selected" : ""
					}`}
					onClick={() => handleModeChange("walk")}
				>
					<FaWalking />
				</Button>
				<Button
					id="btn-bike"
					title="bike mode"
					className={`ant-btn-primary ${
						travelMode === "bike" ? "selected" : ""
					}`}
					onClick={() => handleModeChange("bike")}
				>
					<MdDirectionsBike />
				</Button>
				<Button
					id="btn-car"
					title="car mode"
					className={`ant-btn-primary ${
						travelMode === "car" ? "selected" : ""
					}`}
					onClick={() => handleModeChange("car")}
				>
					<FaCar />
				</Button>
				<Button
					id="btn-transit"
					title="transit mode"
					className={`ant-btn-primary ${
						travelMode === "transit" ? "selected" : ""
					}`}
					onClick={() => handleModeChange("transit")}
				>
					<MdOutlineDirectionsTransitFilled />
				</Button>
			</div>
		</MapContainer>
	);
};

export default Page;

// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
// import { GeoJSON } from "react-leaflet";
// import { Polygon } from "react-leaflet/Polygon";
// import { Button } from "antd";

// //icons
// import { FaWalking } from "react-icons/fa";
// import { MdDirectionsBike } from "react-icons/md";
// import { FaCar } from "react-icons/fa";
// import { MdOutlineDirectionsTransitFilled } from "react-icons/md";

// ///
// import { LatLngId, TargomoClient } from "@targomo/core";
// import L from "leaflet";

// const Page = () => {
// 	const [center] = useState([60.364, 5.346]);
// 	const [isochrone, setIsochrone] = useState({ features: [] });
// 	const IsochroneLayer = () => {
// 		const map = useMap();

// 		useEffect(() => {
// 			const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
// 			const center: [number, number] = [60.364, 5.346];
// 			const travelTimes: number[] = [300, 600, 900, 1200, 1500, 1800];
// 			const sources: LatLngId[] = [
// 				{ id: 0, lat: center[0], lng: center[1] },
// 			];
// 			const mode: string[] = ["walk", "bike", "transit", "car"];
// 			const options = {
// 				travelType: "walk",
// 				travelEdgeWeights: travelTimes,
// 				maxEdgeWeight: 1800,
// 				edgeWeight: "time",
// 				transitMaxTransfers: mode.map((m) =>
// 					m === "transit" ? 5 : null
// 				),
// 				serializer: "json",
// 			};

// 			const fetchIsochrone = async () => {
// 				try {
// 					const client = new TargomoClient(
// 						"westcentraleurope",
// 						`${apiKey}`
// 					);
// 					// const data = await client.polygons.fetch(sources, options);
// 					const data = await client.polygons.fetch(
// 						[{ id: 0, lat: center[0], lng: center[1] }],
// 						{ travelType: travelMode }
// 					);
// 					setIsochrone(data);
// 					console.log("Isochrone data:", data);
// 				} catch (error) {
// 					console.error("Error fetching isochrone data:", error);
// 					setIsochrone(null); // Reset isochrone data in case of error
// 				}
// 			};

// 			fetchIsochrone();
// 		}, [center, travelMode]);

// 		return null;
// 	};
//    const handleModeChange = (mode) => {
// 		setTravelMode(mode);
//    };
// 	return (
// 		<MapContainer
// 			style={{ height: "100vh", width: "100%" }}
// 			center={center}
// 			zoom={13}
// 		>
// 			<TileLayer
// 				attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 				url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
// 			/>

// 			{isochrone && (
// 				<>
// 					<GeoJSON
// 						key="some key here"
// 						data={isochrone}
// 						style={() => ({
// 							fillColor: "red", // Set fill color for polygons
// 							fillOpacity: 0.3, // Adjust opacity as needed
// 							color: "red", // Set border color for polygons
// 							weight: 2, // Border width
// 						})}
// 					/>
// 				</>
// 			)}

// 			<div className="leaflet-top leaflet-right">
// 				<Button
// 					id="btn-walk"
// 					title="walk mode"
// 					className="ant-btn-primary "
// 				>
// 					<FaWalking />
// 				</Button>
// 				<Button
// 					id="btn-bike"
// 					title="bike mode"
// 					className="ant-btn-primary "
// 				>
// 					<MdDirectionsBike />
// 				</Button>
// 				<Button
// 					id="btn-car"
// 					title="car mode"
// 					className="ant-btn-primary"
// 				>
// 					<FaCar />
// 				</Button>
// 				<Button
// 					id="btn-transit"
// 					title="transit mode"
// 					className="ant-btn-primary"
// 				>
// 					<MdOutlineDirectionsTransitFilled />
// 				</Button>
// 			</div>
// 			<IsochroneLayer />
// 		</MapContainer>
// 	);
// };

// export default Page;
