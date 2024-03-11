"use client";
import React, { useEffect, useRef } from "react";
import { LatLngId, PolygonArray, TargomoClient, geometry } from "@targomo/core";
import L from "leaflet";
import { TgmLeafletTileLayer } from "@targomo/leaflet";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { PolygonGeoJsonOptions } from "@targomo/core/typings/api/payload/polygonRequestPayload";

const Page = () => {
	const mapRef = useRef<MapContainer>(null);
	const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
	const center: [number, number] = [60.36367102829055, 5.346489526985267];
	const sources: LatLngId[] = [{ id: 0, lat: center[0], lng: center[1] }];
	const mode: string[] = ["walk", "bike", "transit", "car"];
	const travelTimes = [300, 600, 900, 1200, 1500, 1800];

	// Define the options for the polygon service
	const options = {
		travelType: "bike",
		travelEdgeWeights: travelTimes,
		edgeWeight: "time",
		srid: 4326,
		serializer: "geojson",
		simplify: 200,
		buffer: 0.002,
		elevation: true,
		quadrantSegments: 6,
		walkSpeed: {
			speed: 5,
		},
		bikeSpeed: {
			speed: 15,
		},
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const client = new TargomoClient(
					"westcentraleurope",
					`${apiKey}`
				);

				const result = await client.polygons.fetch(sources, options);
				console.log(result);
				const polygonsGeoJson = result.features;
				// Create Leaflet polygon layers from fetched polygons data
				polygonsGeoJson.forEach((polygon) => {
					L.geoJSON(polygon).addTo(mapRef.current.leafletElement);
				});
			} catch (error) {
				console.error("Error fetching polygons:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<MapContainer
			ref={mapRef}
			style={{ height: "100vh", width: "100%" }}
			center={center}
			zoom={15}
			scrollWheelZoom={false}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
				//Zrch  60.3950500675943, 5.342653218198782
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
