"use client";
import React from "react";
import {
	Marker,
	LayerGroup,
	Tooltip,
	useMap,
	LayersControl,
} from "react-leaflet";
import { defaultIcon } from "../../../../public/icons/defaultIcon";
import proj4 from "proj4";

const ITM = "EPSG:2157"; // coordinates system
const WGS = "EPSG:4326";

proj4.defs(
	ITM,
	"+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=0.99982 +x_0=600000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

proj4.defs(WGS, "+proj=longlat +datum=WGS84 +no_defs +type=crs");

export const MarkerLayerWithTooltipReproject = ({ data }) => {
	const leafletMap = useMap();
	const layer = data.features.map((feature) => {
		const { coordinates } = feature.geometry;
		const { name } = feature.properties;
		const tooltip_key = `tooltip_&_${name}`;

		const reprojectedCoorinates = proj4(ITM, WGS, coordinates);
		return (
			<>
				<Marker
					key={String(reprojectedCoorinates)}
					icon={defaultIcon}
					eventHandlers={{
						click: (e) => leafletMap.panTo(e.latlng),
					}}
					position={[
						reprojectedCoorinates[1],
						reprojectedCoorinates[0],
					]}
				>
					<Tooltip className="text-green-700" key={tooltip_key}>
						<h3>Mt. {name}</h3>
					</Tooltip>
				</Marker>
			</>
		);
	});
	return (
		<LayersControl.Overlay name="Irish Cities Reprojecter">
			<LayerGroup>{layer}</LayerGroup>
		</LayersControl.Overlay>
	);
};
