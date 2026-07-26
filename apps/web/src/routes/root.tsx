import { useState, useEffect } from "react";

function Root() {
	const [serverData, setServerData] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('http://localhost:8080');
			if (!res.ok) {
				const error = await res.text();
				throw error;
			}
			setServerData(await res.text());
		}

		fetchData();
	})

	return (
    <div className="flex flex-col items-center gap-4">
    	<h1 className="flex justify-center text-2xl pt-4">BenStack v1</h1>
			<p>From the server: {serverData}</p>
    </div>
	)
}

export default Root;
