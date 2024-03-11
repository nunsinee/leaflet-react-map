"use client";
import React from "react";
import { Marker, Tooltip, useMap, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { defaultIcon } from "../../../../public/icons/defaultIcon";

export const MarkerLayerWithTooltipCluster = ({ data }) => {
	const leafletMap = useMap();
	const layer = data.features.map((feature) => {
		const { coordinates } = feature.geometry;
		const { name } = feature.properties;
		const tooltip_key = `tooltip_&_${name}`;

		return (
			<>
				<Marker
					key={String(coordinates)}
					icon={defaultIcon}
					eventHandlers={{
						click: (e) => leafletMap.panTo(e.latlng),
					}}
					position={[coordinates[1], coordinates[0]]}
				>
					<Tooltip className="text-green-700" key={tooltip_key}>
						<h3>Mt. {name}</h3>
					</Tooltip>
				</Marker>
			</>
		);
	});
	return (
		<LayersControl.Overlay name="World Cities Cluster">
			<MarkerClusterGroup zoomToBoundsOnClick={false}>
				{layer}
			</MarkerClusterGroup>
		</LayersControl.Overlay>
	);
};
