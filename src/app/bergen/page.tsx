"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import { TargomoClient } from "@targomo/core";

const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
const centerCoords = [60.36367102829055, 5.346489526985267];

const Home = () => {
	const [features, setFeatures] = useState([]);
	const [loading, setLoading] = useState(false);

	const mapRef = useRef();

	useEffect(() => {
		const centerCoords = [60.36367102829055, 5.346489526985267];
		const travelTimes = [300, 600, 900, 1200, 1500, 1800];
		const sources = [{ id: 0, lat: centerCoords[0], lng: centerCoords[1] }];
		const mode = ["walk", "bike", "transit", "car"];

		const options = {
			travelType: mode,
			travelEdgeWeights: travelTimes,
			maxEdgeWeight: 1800,
			edgeWeight: "time",
			transitMaxTransfers: mode.map((m) => (m === "transit" ? 5 : null)),
			serializer: "geojson",
		};
		const fetchIsochrone = async () => {
			setLoading(true);
			try {
				const client = new TargomoClient(
					"westcentraleurope",
					`${apiKey}`
				);
				const response = await client.polygons.fetch(sources, options);
				setFeatures(response);
				setLoading(false);
				console.log(response);
				// Get bounding box of the GeoJSON features
				// Get bounding box of the GeoJSON features
				const bounds = response.bbox;
				if (bounds && bounds.length === 4) {
					// Fit map to the bounding box of GeoJSON features
					mapRef.current.fitBounds([
						[bounds[1], bounds[0]],
						[bounds[3], bounds[2]],
					]);
				}
			} catch (error) {
				console.error("Error fetching isochrone data:", error);
				setLoading(false);
			}
		};

		fetchIsochrone();

		// Clean up function
		return () => {
			setFeatures([]);
		};
	}, []);

	return (
		<MapContainer
			style={{ height: "100vh", width: "100%" }}
			zoom={13}
			center={centerCoords}
			ref={mapRef}
		>
			<TileLayer
				attribution="Your tile layer attribution here"
				url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
			/>

			{loading && features && (
				<GeoJSON
					key={"geojson-key"}
					data={features}
					style={{
						fillColor: "red",
						fillOpacity: 1,
						color: "red",
						weight: 2,
					}}
				/>
			)}
		</MapContainer>
	);
};

export default Home;

///////////////////////////////////////////////////////////
