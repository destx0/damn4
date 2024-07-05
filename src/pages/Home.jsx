import React from "react";
import { ipcRenderer } from "electron";

const Home = () => {
	const handleAddStudent = () => {
		ipcRenderer.send("open-add-window");
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">
				Student Management System
			</h1>
			<button
				onClick={handleAddStudent}
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			>
				Add Student
			</button>
			{/* You can add a list of students here later */}
		</div>
	);
};

export default Home;
