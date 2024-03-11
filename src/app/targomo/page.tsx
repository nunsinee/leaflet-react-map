"use client";

import React, { useEffect, useState, useRef } from "react";
import { LatLngId, TargomoClient } from "@targomo/core";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import Button from "../../components/Button";
import { FaWalking } from "react-icons/fa";
import { MdDirectionsBike } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

interface GeoJSONFeature {
	type: string;
	properties: { [key: string]: any };
	geometry: {
		type: string;
		coordinates: number[][];
	};
}

const transformToGeoJsonObject = (feature: GeoJSONFeature) => ({
	type: "Feature" as const,
	properties: feature.properties,
	geometry: feature.geometry,
});

interface GeoJSONData {
	type: string;
	features: GeoJSONFeature[];
}

const BaseMap = () => {
	const map = useMap();
	console.log("map center:", map.getCenter());
	return null;
};

const Page = () => {
	// const [data, setData] = useState<GeoJSONFeature[]>([]);
	//const [data, setData] = useState([]);
	const [data, setData] = useState<GeoJSONData[]>([]);
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
				style={{ height: "50vh", width: "100%" }}
				center={[60.36367102829055, 5.346489526985267]}
				// Bergen 60.3950500675943, 5.342653218198782
				zoom={10}
			>
				{/* <TileLayer
					attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
				/> */}

				{/* {data.length > 0 &&
					data.map((feature, index) => (
						<>
							<Marker
								key={index}
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
								position={[
									60.36367102829055, 5.346489526985267,
								]}
							>
								<Popup className="text-green-700">
									Zrch Company
									<br />
									Kanalveien 60, 5068 Bergen.
								</Popup>
							</Marker>
							<GeoJSON
								data={feature} // pass GeoJSON object
								style={() => ({
									fillColor: "red", // Red background color
									fillOpacity: 0.5, // Adjust opacity as needed
									color: "red", // Border color
									weight: 2, // Border width
									zIndex: 200,
								})}
							/>
						</>
					))} */}

				{/* <div className="markers">
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
				</div> */}
				<BaseMap />
				{data && (
					<GeoJSON
						data={data.feature} // pass GeoJSON object
						style={() => ({
							fillColor: "red", // Red background color
							fillOpacity: 0.5, // Adjust opacity as needed
							color: "red", // Border color
							weight: 2, // Border width
							zIndex: 200,
						})}
					/>
				)}
			</MapContainer>
		</>
	);
};

export default Page;
