"use client";

import React, { useEffect, useState } from "react";
import tgm, { LatLngId, TargomoClient, TravelType } from "@targomo/core";
import mapboxgl from "mapbox-gl";

export default function Page() {
	// create targomo client
	const apiKey = process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY;
	const client = new tgm.TargomoClient(
		"westcentraleurope",
		process.env.NEXT_PUBLIC_TARGOMO_MAP_API_KEY
	);

	// Create the source point and polygon range bands
	const lnglat = [13.37, 52.51];
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

	// Mapbox Parameters
	const timeColors = [
		"#006837",
		"#39B54A",
		"#8CC63F",
		"#F7931E",
		"#F15A24",
		"#C1272D",
	];
	const emptyData = { type: "FeatureCollection", features: [] };
	const attributionText = `<a href="https://www.targomo.com/developers/resources/attribution/" target="_blank">&copy; Targomo</a>`;
	const marker = new mapboxgl.Marker({ draggable: true }).setLngLat(lnglat);

	// Add the map
	const map = new mapboxgl.Map({
		container: "map",
		style: "https://api.maptiler.com/maps/streets/style.json?key=K4sgtwVLGm2oBFBwur9f",
		zoom: 12,
		center: lnglat,
		attributionControl: false,
	})
		.addControl(new mapboxgl.NavigationControl())
		.addControl(
			new mapboxgl.AttributionControl({
				compact: true,
				customAttribution: attributionText,
			})
		);

	// Add update on click for travel type buttons
	const travelTypes = document.querySelectorAll(".marker-container.type");
	for (let type of travelTypes) {
		type.onclick = function () {
			updateButton(type, travelTypes, updateTravelType);
		};
	}

	// Update on click
	function updateButton(button, buttons, updateFunction) {
		for (let tp of buttons) {
			tp.classList.remove("active");
		}
		button.classList.add("active");
		updateFunction(button);
	}

	// Update the travel type
	function updateTravelType(type) {
		options.travelType = type.dataset.type;
		console.log(`TravelType updated to ${options.travelType}`);
		getPolygons();
	}

	// Perform the polygon request and update the map using the result
	async function getPolygons() {
		let source = {
			id: "source",
			lng: marker.getLngLat().lng,
			lat: marker.getLngLat().lat,
		};
		client.polygons.fetch([source], options).then((geojsonPolygons) => {
			map.getSource("polygon").setData(geojsonPolygons);
			map.fitBounds(turf.bbox(geojsonPolygons), { padding: 20 });
		});
	}

	// height stops function
	function getHeightPolygons(travelTimes, heightFactor) {
		return [
			[travelTimes[0], travelTimes.length * (10 * heightFactor)],
			[
				travelTimes[travelTimes.length - 1],
				travelTimes.length * heightFactor,
			],
		];
	}

	// color stop function
	function getColorPolygons(times, colors) {
		const colorsConfig = times.map((time, idx) => {
			return [times[idx], colors[idx]];
		});
		return colorsConfig;
	}

	// Update the map
	marker.on("dragend", getPolygons).addTo(map);

	map.on("load", () => {
		// call the Targomo service
		map.addSource("polygon", {
			type: "geojson",
			data: emptyData,
		});
		map.addLayer({
			id: "polygons",
			type: "fill-extrusion",
			layout: {},
			source: "polygon",
			paint: {
				"fill-extrusion-base": 0,
				"fill-extrusion-height": {
					property: "time",
					stops: getHeightPolygons(travelTimes, 2),
				},
				"fill-extrusion-color": {
					property: "time",
					stops: getColorPolygons(travelTimes, timeColors),
				},
				"fill-extrusion-opacity": 0.5,
			},
		});
		getPolygons();
	});
	return (
		<>
			<div id="map"></div>
			<div className="markers travel-type">
				<div data-type="walk" className="marker-container type">
					<span className="tgm-icon tgm-ux-mode-walk"></span>
					<span className="tooltiptext">Walk</span>
				</div>
				<div data-type="bike" className="marker-container type active">
					<span className="tgm-icon tgm-ux-mode-bike"></span>
					<span className="tooltiptext">Bike</span>
				</div>
				<div data-type="car" className="marker-container type">
					<span className="tgm-icon tgm-ux-mode-car"></span>
					<span className="tooltiptext">Car</span>
				</div>
				<div data-type="transit" className="marker-container type">
					<span className="tgm-icon tgm-ux-mode-transit"></span>
					<span className="tooltiptext">Transit</span>
				</div>
			</div>
		</>
	);
}
