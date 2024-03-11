"use client";

import React, { useEffect, useState } from "react";
import tgm, { PolygonArray } from "@targomo/core";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { TargomoClient } from "@targomo/core";
import { TravelMenuButton } from "./TravelMenuButton";
import { TravelFilter } from "./layer/TravelFilter";

const Page = () => {
	const [asyncTgm, setAsyncTgm] = useState({ features: [] });
	const [mode, setMode] = useState("walk");
	const [travelFilter, setTravelFilter] = useState();
	// const [areaColor, setAreaColor] = useState("green");

	const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY || "";
	const center: [number, number] = [60.36, 5.35];
	const sources = [{ id: 0, lat: center[0], lng: center[1] }];
	// const mode: string[] = ["walk", "bike", "car", "transit"];
	const travelTimes: number[] = [300, 600, 900, 1200, 1500, 1800];
	const options = {
		travelType: mode,
		travelEdgeWeights: travelTimes,
		maxEdgeWeight: 1800,
		edgeWeight: "time",
		transitMaxTransfers: mode === "transit" ? 5 : null,
		serializer: "geojson",
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const client = new TargomoClient("westcentraleurope", apiKey);
				const tgmData = await client.polygons.fetch(sources, options);
				setAsyncTgm(tgmData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	console.log(asyncTgm);

	return (
		<>
			<MapContainer
				style={{ height: "100vh", width: "100%" }}
				center={center}
				// Bergen 60.3950500675943, 5.342653218198782
				zoom={15}
				scrollWheelZoom={false}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				<TravelMenuButton mode={mode} setMode={setMode} />
				<TravelFilter
					travelFilter={travelFilter}
					setTravelFilter={setTravelFilter}
				/>
			</MapContainer>
		</>
	);
};

export default Page;
