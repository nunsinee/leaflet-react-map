import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "antd/dist/antd.variable.min.css";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Targomo App",
	description: "Learn time travel",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<link
					rel="stylesheet"
					href="https://releases.targomo.com/tgm-icons/webfont/tgm-icon.css"
				/>
				<link
					rel="stylesheet"
					href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/0.4.2/leaflet.draw.css"
				/>

				<style>
					{`	body, html, #map {
            margin: 0;
            width: 100%;
            height: 100vh;
        }
        #map {
            z-index: 0;
        }
        .markers {
            position: fixed; top: 10px; right: 10px;
			
        }
        .marker-container {
            padding: 4px 6px;
            background-color: darkblue;
            display: flex; align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 2px solid rgba(0,0,0,0.2);
            background-clip: padding-box;
            border-radius: 4px;
            margin-bottom: 6px;
						color:#fff;
        }
        .marker-container.active {
            background-color: yellow;
        }
				`}
				</style>
			</Head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
