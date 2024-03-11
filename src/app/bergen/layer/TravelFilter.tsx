"use client";
import { PolygonRequestOptions } from "@targomo/core";
import { GeoJSON } from "leaflet";
import { LayersControl } from "react-leaflet";

export const TravelFilter = ({ travelFilter, setTravelFilter }) => {
	if (travelFilter) {
		const { coordinates } = travelFilter.feature.geometry;
		const layer = (
			<Circle
				center={[coordinates[1], coordinates[0]]}
				color={"lightgreen"}
			/>
		);
	}
};
