"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import { Button } from "antd";

// add import { LatLngId, TargomoClient } from "@targomo/core";

const Page = () => {
	const [center] = useState([60.364, 5.346]);
	const [isochrone, setIsochrone] = useState();
	const [mode, setMode] = useState("walking"); // Default mode is walking
	const [modeColor, setModeColor] = useState({
		walking: "green",
		cycling: "yellow",
		driving: "red",
	});

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
						`https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${center[1]},${center[0]}?contours_minutes=15&polygons=true&access_token=pk.eyJ1IjoibnVuc2luZWUiLCJhIjoiY2tzeDRva2liMjZmbzJwb2R2eHU4enZhMCJ9.ift5ZzGntmn3UXSUaUvfMw`
					);
					const data = await response.json();
					setIsochrone(data);
					setModeColor(data);

					console.log("Isochrone data:", data);
				} catch (error) {
					console.error("Error fetching isochrone data:", error);
				}
			};

			map.on("moveend", fetchIsochrone);
			fetchIsochrone();

			return () => {
				map.off("moveend", fetchIsochrone);
			};
		}, [center, mode, map]);

		return null;
	};

	return (
		<div>
			<MapContainer
				style={{ height: "100vh", width: "100%" }}
				center={center}
				zoom={13}
			>
				{/* <LayersControl.BaseLayer> */}
				<TileLayer
					attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
				/>
				{/* </LayersControl.BaseLayer> */}
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
				{/* Buttons to select mode */}
				<div className="leaflet-top leaflet-right">
					<Button
						type="primary"
						className="ant-btn-primary bg-blue-900"
						onClick={() => setMode("walking")}
					>
						Walk
					</Button>
					<Button
						type="primary"
						className="ant-btn-primary bg-blue-900"
						onClick={() => setMode("driving")}
					>
						Car
					</Button>
					<Button
						type="primary"
						className="ant-btn-primary bg-blue-900"
						onClick={() => setMode("cycling")}
					>
						Bike
					</Button>
				</div>
			</MapContainer>
		</div>
	);
};

export default Page;
