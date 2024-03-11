"use client";

import React, { useEffect, useState } from "react";
import { TargomoClient } from "@targomo/core";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const Page = () => {
	//const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
	// const apiKey: string | undefined =
	// 	process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
	// define the polygon overlay

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
		const fetchData = async () => {
			try {
				const client = new TargomoClient(
					"westcentraleurope",
					`${apiKey}`
				);

				const sources = [{ id: 1, lat: 52.53, lng: 13.403 }];
				const polygons = await client.polygons.fetch(sources, {
					travelType: "walk",
					travelEdgeWeights: [300, 600, 900],
					serializer: "geojson",
				});

				console.log(polygons);
			} catch (error) {
				console.error("Error fetching polygons:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<MapContainer
			style={{ height: "100vh", width: "100%" }}
			center={[60.36367102829055, 5.346489526985267]}
			// 60.3950500675943, 5.342653218198782
			zoom={15}
			scrollWheelZoom={false}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{/* <TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/> */}

			<Marker
				icon={
					new L.Icon({
						iconUrl: MarkerIcon.src,
						iconRetinaUrl: MarkerIcon.src,
						iconSize: [25, 41],
						iconAnchor: [12.5, 41],
						popupAnchor: [0, -41],
						shadowUrl: MarkerShadow.src,
						shadowSize: [41, 41],
					})
				}
				position={[60.36367102829055, 5.346489526985267]}
				// 60.3950500675943, 5.342653218198782
			>
				<Popup className="text-green-700">
					Zrch Company
					<br />
					Kanalveien 60, 5068 Bergen.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Page;

// import L from "leaflet";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import MarkerIcon from "../../node_modules/leaflet/dist/images/marker-icon.png";
// import MarkerShadow from "../../node_modules/leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/leaflet.css";

// const Map = () => {
// 	return (
// 		<div>
// 			<MapContainer
// 				style={{ height: "100vh", width: "100" }}
// 				center={[60.3950500675943, 5.342653218198782]}
// 				zoom={13}
// 				scrollWheelZoom={false}
// 			>
// 				<TileLayer
// 					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// 					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// 				/>

// 				<Marker
// 					icon={
// 						new L.Icon({
// 							iconUrl: MarkerIcon.src,
// 							iconRetinaUrl: MarkerIcon.src,
// 							iconSize: [25, 41],
// 							iconAnchor: [12.5, 41],
// 							popupAnchor: [0, -41],
// 							shadowUrl: MarkerShadow.src,
// 							shadowSize: [41, 41],
// 						})
// 					}
// 					position={[60.36367102829055, 5.346489526985267]}
// 					// 60.3950500675943, 5.342653218198782
// 				>
// 					<Popup className="text-green-700">
// 						Zrch Company
// 						<br />
// 						Kanalveien 60, 5068 Bergen.
// 					</Popup>
// 				</Marker>
// 			</MapContainer>
// 		</div>
// 	);
// };
// export default Map;
