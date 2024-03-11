"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cities } from "../data/cities";
import { mountains } from "../data/hightestpoint";
import { continents } from "../data/continents";

import { MarkerLayer } from "./layers/MarkerLayer";
import { MarkerLayerWithTooltip } from "./layers/MarkerLayerWithTooltip";
import { RadiusFilter } from "./layers/RadiusFilter";
import { ContinentsPolygonLayer } from "./layers/ContinentsPolygonLayer";

import { FitBoundToDataControl } from "../bergen/controls/FitBoundToDataControl";
import { ShowActiveFiltersControl } from "../bergen/controls/ShowActiveFilters";

import { MarkerLayerWithTooltipCluster } from "./layers/MarkerLayerWithTooltipCluster";
import { MarkerLayerWithTooltipReproject } from "./layers/MarkerLayerWithTooltipReproject";
import { irishCities2157 } from "../data/irishCities2157";

const Page = () => {
	const [geoFilter, setGeoFilter] = useState(null);
	const [radiusFilter, setRadiusFilter] = useState(null);
	const getRadiusFilter = () => radiusFilter;
	const getGeoFilter = () => geoFilter;

	const [asyncCities, setAsyncCities] = useState({ features: [] });
	useEffect(() => {
		const L = require("leaflet");
		const fetchData = async () => {
			const response = await fetch(
				"https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson"
			);
			const cities = await response.json();
			setAsyncCities(cities);
		};
		fetchData().catch(console.error);
	}, []);

	console.log(asyncCities);
	return (
		<MapContainer
			center={[0, 0]}
			zoom={3}
			scrollWheelZoom={true}
			style={{ width: "100%", height: "100vh" }}
		>
			<LayersControl position="topright">
				<LayersControl.BaseLayer checked name="Osm Streets">
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
				</LayersControl.BaseLayer>
				{/* Make multi layer */}
				<LayersControl.BaseLayer name="Stadia AlidadeSmooth">
					<TileLayer
						attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
					/>
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer name="Esri NatGeoWorldMap">
					<TileLayer
						attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
						url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
					/>
				</LayersControl.BaseLayer>
				<MarkerLayer
					// data={cities}
					data={asyncCities}
					setRadiusFilter={setRadiusFilter}
					getRadiusFilter={getRadiusFilter}
					getGeoFilter={getGeoFilter}
				/>
				<MarkerLayerWithTooltip data={mountains} />
				<MarkerLayerWithTooltipCluster data={cities} />
				<MarkerLayerWithTooltipReproject data={irishCities2157} />
				<RadiusFilter
					radiusFilter={radiusFilter}
					setRadiusFilter={setRadiusFilter}
				/>
				<ContinentsPolygonLayer
					data={continents}
					setGeoFilter={setGeoFilter}
					getGeoFilter={getGeoFilter}
				/>
			</LayersControl>
			<FitBoundToDataControl />
			<ShowActiveFiltersControl
				getFilters={() => ({ geoFilter, radiusFilter })}
			/>
		</MapContainer>
	);
};

export default Page;
