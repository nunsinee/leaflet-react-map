"use client";

import { useState } from "react";

import L from "leaflet";

import { Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import { Space, Button } from "antd";
import { defaultIcon } from "../../../../public/icons/defaultIcon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

const DEFAULT_TRAVEL = 300;
const PopupStatistic = ({ feature, setAreaColor }) => {
	const [radius, setRadius] = useState(DEFAULT_RADIUS);
	const { name, adm0name, pop_max } = feature.properties;
	return (
		<>
			<Card type="inner" title="name" style={{ marginTop: 16 }}>
				<b>{`${name}, ${adm0name}`}</b>
			</Card>
			<Card type="inner" title="Population" style={{ marginTop: 16 }}>
				{`${pop_max}`}
			</Card>
			<Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
				<Space>
					<InputNumber
						defaultValue={DEFAULT_RADIUS}
						min={0}
						onChange={(e) => setRadius(e)}
					></InputNumber>
					<Button
						type="primary"
						shape="round"
						icon={<FilterOutlined />}
						onClick={() =>
							setRadiusFilter((prevState) => {
								let newFilter;
								if (prevState) {
									if (radius === 0) {
										newFilter = prevState;
									} else {
										const sameFeature =
											prevState.feature === feature;
										const sameRadius =
											prevState.radius === radius;
										if (!sameFeature || !sameRadius) {
											newFilter = { feature, radius };
										}
									}
								} else if (radius !== 0) {
									newFilter = { feature, radius };
								}
								return newFilter;
							})
						}
					>
						Fillter by km
					</Button>
				</Space>
			</Card>
		</>
	);
};

export const MarkerLayer = ({ asyncTgm, setMode }) => {
	const geoMode = getGeoFilter();
	const radiusFilter = getRadiusFilter();

	let centerPoint;
	if (radiusFilter) {
		const { coordinates } = radiusFilter.feature.geometry;
		centerPoint = L.latLng(coordinates[1], coordinates[0]);
	}

	const layer = data.features
		.filter((currentFeature) => {
			let filterByRadius;
			let filterByGeo;

			if (centerPoint) {
				const { coordinates } = currentFeature.geometry;
				const currentPoint = L.latLng(coordinates[1], coordinates[0]);
				return (filterByRadius =
					centerPoint.distanceTo(currentPoint) / 1000 <
					radiusFilter.radius);
			}
			if (geoFilter) {
				filterByGeo = booleanPointInPolygon(currentFeature, geoFilter);
			}

			let doFilter = true;

			if (geoFilter && radiusFilter) {
				doFilter = filterByGeo && filterByRadius;
			} else if (geoFilter && !radiusFilter) {
				doFilter = filterByGeo;
			} else if (radiusFilter && !geoFilter) {
				doFilter = filterByRadius;
			}
			return doFilter;
		})
		.map((feature) => {
			const { coordinates } = feature.geometry;

			return (
				<Marker
					key={String(coordinates)}
					icon={defaultIcon}
					position={[coordinates[1], coordinates[0]]}
					doFitToBounds={true}
					// Zrch 60.3950500675943, 5.342653218198782
				>
					<Popup className="text-green-700">
						<PopupStatistic
							feature={feature}
							setRadiusFilter={setRadiusFilter}
						/>
					</Popup>
				</Marker>
			);
		});
	return (
		<LayersControl.Overlay name="World Cities">
			<LayerGroup> {layer}</LayerGroup>
		</LayersControl.Overlay>
	);
};
