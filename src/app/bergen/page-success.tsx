"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoJSON } from "react-leaflet";

const Page = () => {
	const [center] = useState([60.364, 5.346]);
	const [isochrone, setIsochrone] = useState();

	const IsochroneLayer = () => {
		const map = useMap();

		useEffect(() => {
			if (!map) {
				console.log("Map is not available yet");
				return;
			}

			const fetchIsochrone = async () => {
				try {
					const response = await fetch(
						`https://api.mapbox.com/isochrone/v1/mapbox/walking/${center[1]},${center[0]}?contours_minutes=15&polygons=true&access_token=pk.eyJ1IjoibnVuc2luZWUiLCJhIjoiY2tzeDRva2liMjZmbzJwb2R2eHU4enZhMCJ9.ift5ZzGntmn3UXSUaUvfMw`
					);
					const data = await response.json();
					setIsochrone(data);
					console.log("Isochrone data:", data);
				} catch (error) {
					console.error("Error fetching isochrone data:", error);
				}
			};

			map.on("moveend", fetchIsochrone);
			// fetchIsochrone(); this is the error that give error

			return () => {
				map.off("moveend", fetchIsochrone);
			};
		}, [center]);

		return null;
	};

	return (
		<MapContainer
			style={{ height: "100vh", width: "100%" }}
			center={center}
			zoom={13}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{isochrone && (
				<GeoJSON
					key={"geo-json-layer"}
					data={isochrone}
					style={() => ({
						fillColor: "red", // Red background color
						fillOpacity: 0.3, // Adjust opacity as needed
						color: "red", // Border color
						weight: 2, // Border width
					})}
				/>
			)}
			{/* this how to show Isocrone */}
			<IsochroneLayer />
		</MapContainer>
	);
};

export default Page;
