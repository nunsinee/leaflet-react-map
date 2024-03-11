"use client";

import React, { useEffect } from "react";
import {
	TargomoClient,
	TgmLeafletPolygonOverlay,
	TgmLeafletTileLayer,
} from "@targomo/core";
import L, { LatLng, LatLngBounds } from "leaflet";

const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;

const Page: React.FC = () => {
	useEffect(() => {
		async function initMap() {
			const client = new TargomoClient("westcentraleurope", `${apiKey}`);
			const tileLayer = new TgmLeafletTileLayer(client, "light");
			const center: [number, number] = [47.597132, -122.333797]; // Coordinates to center the map

			// define the map
			var map = L.map("map", {
				layers: [tileLayer],
				scrollWheelZoom: false,
			}).setView(center, 11);
			// set the attributions
			const attributionText =
				'<a href="https://www.targomo.com/developers/resources/attribution/" target="_blank">&copy; Targomo</a>';

			map.attributionControl.addAttribution(attributionText);

			// define the starting point
			const sources: LatLingId[] = [
				{ id: 0, lat: center[0], lng: center[1] },
			];

			// Add marker for the source on the map
			sources.forEach((source) => {
				L.marker([source.lat, source.lng]).addTo(map);
			});

			// define the polygon overlay
			const polygonOverlayLayer = new TgmLeafletPolygonOverlay({
				strokeWidth: 20,
			});
			polygonOverlayLayer.addTo(map);

			// get the polygon
			const polygons = await client.polygons.fetch(sources, options);

			//calculate bounding box for polygons
			const bounds = polygons.getMaxBounds();

			// add polygons to overlay
			polygonOverlayLayer.setData(polygons);

			// zoom to the polygon bounds
			map.fitBounds(
				new L.latLngBounds(bounds.northEast, bounds.southWest)
			);
		}
		initMap();
	}, []);

	return <div>test test</div>;
};

export default Page;
