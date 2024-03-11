"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { TravelOptions, TargomoClient, LatLngId } from "@targomo/core";

const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
const center: [number, number] = [60.36367102829055, 5.346489526985267]; // Coordinates to center the map
const travelTimes: number[] = [300, 600, 900, 1200, 1500, 1800];
const sources: LatLngId[] = [{ id: 0, lat: center[0], lng: center[1] }]; //	// define the starting point
const mode: string[] = ["walk", "bike", "transit", "car"];

const Map = () => {
	useEffect(() => {
		const map = L.map("map").setView(center, 13);

		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);

		const client = new TargomoClient("westcentraleurope", `${apiKey}`);

		const fetchAndDisplayPolygons = async () => {
			for (const modeType of mode) {
				for (const time of travelTimes) {
					const options: TravelOptions = {
						travelType: modeType, // Corrected from mode
						travelTimes: [time], // Corrected from travelTimes
						maxEdgeWeight: 1800,
						edgeWeight: "time",
						transitMaxTransfers: modeType === "transit" ? 5 : null, // Corrected from mode
						serializer: "geojson",
					};
					const polygons = await client.polygons.fetch(options);
					console.log(polygons);
					L.geoJSON(polygons, {
						style: {
							fillColor: "green", // Background color
							color: "black", // Border color
							weight: 2, // Border width
							opacity: 1, // Border opacity
						},
					}).addTo(map);
				}
			}
		};

		fetchAndDisplayPolygons();

		return () => {
			map.remove();
		};
	}, []);

	return <div id="map" style={{ height: "100vh", width: "100%" }} />;
};

export default Map;
