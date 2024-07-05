import React, { useState } from "react";
import { ipcRenderer } from "electron";

const AddStudent = () => {
	const [student, setStudent] = useState({ name: "", age: "", grade: "" });

	const handleChange = (e) => {
		setStudent({ ...student, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Here you would typically send the student data to the main process
		// For now, we'll just log it and close the window
		console.log("Adding student:", student);
		ipcRenderer.send("close-add-window");
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-xl font-bold mb-4">Add New Student</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block">
						Name:
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={student.name}
						onChange={handleChange}
						className="border p-2 w-full"
						required
					/>
				</div>
				<div>
					<label htmlFor="age" className="block">
						Age:
					</label>
					<input
						type="number"
						id="age"
						name="age"
						value={student.age}
						onChange={handleChange}
						className="border p-2 w-full"
						required
					/>
				</div>
				<div>
					<label htmlFor="grade" className="block">
						Grade:
					</label>
					<input
						type="text"
						id="grade"
						name="grade"
						value={student.grade}
						onChange={handleChange}
						className="border p-2 w-full"
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
				>
					Add Student
				</button>
			</form>
		</div>
	);
};

export default AddStudent;
