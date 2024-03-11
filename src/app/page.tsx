import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./map/page"), {
	loading: () => <p>loading...</p>,
	ssr: false,
});

export default function Home() {
	return (
		<div>
			<DynamicMap />
		</div>
	);
}
