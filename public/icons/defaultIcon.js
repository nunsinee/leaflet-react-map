"use client";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
import markerIconPng from "../marker-icon.png";
import markerShadowPng from "../marker-shadow.png";

// Destructure options from the default icon prototype

const {
	iconSize: defaultIconSize,
	shadowSize: defaultShadowSize,
	iconAnchor: defaultIconAnchor,
	popupAnchor: defaultPopupAnchor,
	tooltipAnchor: defaultTooltipAnchor,
} = L.Marker.prototype.options.icon.options;

// Create the default icon with Next.js Image component
export const defaultIcon = L.icon({
	iconUrl: markerIconPng.src,
	shadowUrl: markerShadowPng.src,
	iconSize: defaultIconSize,
	shadowSize: defaultShadowSize,
	iconAnchor: defaultIconAnchor,
	popupAnchor: defaultPopupAnchor,
	tooltipAnchor: defaultTooltipAnchor,
	// Use Next.js Image component as the HTML for the icon
	html: Image,
});
