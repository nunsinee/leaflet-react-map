import L from "leaflet";
import mountainPng from "../mountain.png";
import Image from "next/image";

// Define a custom Leaflet icon class
const LeafIcon = L.Icon.extend({
	options: {
		iconSize: [35, 23],
		iconAnchor: [17, 16],
		tooltipAnchor: [15, -5],
	},
});

// Create a new instance of the custom icon with the Next.js Image component
export const mountainIcon = new LeafIcon({
	iconUrl: mountainPng.src,
	iconRetinaUrl: mountainPng.src,
	iconSize: [35, 23],
	iconAnchor: [17, 16],
	tooltipAnchor: [15, -5],
	// Define the HTML for the image marker using Next.js Image component
	html: Image,
});
