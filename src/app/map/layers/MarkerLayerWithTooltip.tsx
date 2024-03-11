"use client";
import {
	Marker,
	Tooltip,
	useMap,
	LayersControl,
	LayerGroup,
} from "react-leaflet";
import { mountainIcon } from "../../../../public/icons/mountainIcon";

export const MarkerLayerWithTooltip = ({ data }) => {
	const leafletMap = useMap();
	const layer = data.features.map((feature) => {
		const { coordinates } = feature.geometry;
		const { name, elevation, continent } = feature.properties;
		const tooltip_key = `tooltip_&_${name}`;

		return (
			<>
				<Marker
					key={String(coordinates)}
					icon={mountainIcon}
					eventHandlers={{
						click: (e) => leafletMap.panTo(e.latlng),
					}}
					position={[coordinates[1], coordinates[0]]}
					// Zrch 60.3950500675943, 5.342653218198782
				>
					<Tooltip className="text-green-700" key={tooltip_key}>
						<h3>Mt. {name}</h3>
						Continent:<b>{continent}</b>
						<br></br>
						Elevation:<b>{elevation}</b>
					</Tooltip>
				</Marker>
			</>
		);
	});
	return (
		<LayersControl.Overlay name="Highest points">
			<LayerGroup> {layer}</LayerGroup>
		</LayersControl.Overlay>
	);
};
