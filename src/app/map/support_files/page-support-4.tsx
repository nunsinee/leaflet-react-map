"use client";

import React, { useEffect, useState } from "react";
import { LatLngId, TargomoClient } from "@targomo/core";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import Button from "../../components/Button";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

const Page = () => {
	const [data, setData] = useState(null);
	const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
const center: [number, number] = [60.36367102829055, 5.346489526985267]; // Coordinates to center the map
	const travelTimes: number[] = [300, 600, 900, 1200, 1500, 1800];
	const sources: LatLngId[] = [{ id: 0, lat: center[0], lng: center[1] }]; //	// define the starting point
	const mode: string[] = ["walk", "bike", "transit", "car"];

	useEffect(() => {
		const options: {
			travelType: string[];
			travelEdgeWeights: number[];
			maxEdgeWeight: number;
			edgeWeight: string;
			transitMaxTransfers: (number | null)[];
			serializer: string;
			disableDefaultUI: true;
		} = {
			travelType: mode,
			travelEdgeWeights: travelTimes,
			maxEdgeWeight: 1800,
			edgeWeight: "time",
			transitMaxTransfers: mode.map((m) => (m === "transit" ? 5 : null)),
			serializer: "geojson",
		};
		const fetchData = async () => {
			try {
				const client = new TargomoClient(
					"westcentraleurope",
					`${apiKey}`
				);
				const polygons = await client.polygons.fetch(sources, options); // get the polygons
				const geojsonData = polygons.features;
				setData(geojsonData);

				console.log(geojsonData);
			} catch (error) {
				console.error("Error fetching polygons:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<MapContainer
				style={{ height: "100vh", width: "100%" }}
				center={[60.36367102829055, 5.346489526985267]}
				// Bergen 60.3950500675943, 5.342653218198782
				zoom={15}
				scrollWheelZoom={false}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{/* {data && (
					<GeoJSON
						data={data}
						style={() => ({
							fillColor: "green",
							weight: 2,
							opacity: 1,
							color: "red",
							fillOpacity: 0.5,
							strokeWidth: 20,
						})}
					/>
				)} */}

				{data && (
					<GeoJSON
						data={data}
						style={() => ({
							fillColor: "green",
							color: "red",
							weight: 2,
							fillOpacity: 0.5,
						})}
					/>
				)}

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
					// Zrch 60.3950500675943, 5.342653218198782
				>
					<Popup className="text-green-700">
						Zrch Company
						<br />
						Kanalveien 60, 5068 Bergen.
					</Popup>
				</Marker>
				<div className="markers">
					<Button id="btn-walk" title="walk mode">
						<FaWalking />
					</Button>
					<Button id="btn-bike" title="bike mode">
						<MdDirectionsBike />
					</Button>
					<Button id="btn-car" title="car mode">
						<FaCar />
					</Button>
					<Button id="btn-transit" title="transit mode">
						<MdOutlineDirectionsTransitFilled />
					</Button>
				</div>
			</MapContainer>
		</>
	);
};

export default Page;
