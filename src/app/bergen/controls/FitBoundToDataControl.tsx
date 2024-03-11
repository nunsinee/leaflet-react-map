"use client";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Button } from "antd";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";

import { BorderOuterOutlined, BorderInnerOutlined } from "@ant-design/icons";

const node = DomUtil.create("div");
const root = createRoot(node);

Control.FitBoundsToDataControl = Control.extend({
	options: {
		position: "topleft",
	},
	onAdd: function (map) {
		const doFitDataToBounds = () => {
			const latLngs = [];
			map.eachLayer((layer) => {
				console.log(layer); // Check the layer object to ensure it's the expected type and contains the desired options
				const latLng = layer.options.doFitToBounds && layer.getLatLng();
				if (latLng) {
					latLngs.push(latLng);
				}
			});
			if (latLngs.length > 0) {
				map.fitBounds(latLngs);
			}
		};

		const commonProps = {
			className: "leaflet-control-layers",
			style: { width: "33px", height: "33px" },
		};

		root.render(
			<div className="fit-bounds-control-container">
				<Button
					{...commonProps}
					title="Fit bounds to data"
					icon={<BorderInnerOutlined />}
					onClick={() => {
						doFitDataToBounds();
					}}
				></Button>
				<Button
					{...commonProps}
					title="Fit bounds to World"
					icon={<BorderOuterOutlined />}
					onClick={() => {
						map.fitWorld();
					}}
				></Button>
			</div>
		);
		return node;
	},
	onRemove: function (map) {
		// root.unmount(node);
	},
});

export const FitBoundToDataControl = createControlComponent(
	(props) => new Control.FitBoundsToDataControl(props)
);
