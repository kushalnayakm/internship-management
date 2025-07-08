import { useState } from 'react';
import axios from 'axios';

const colleges = {
  'ABC College': '123 Main St, City A',
  'XYZ Institute': '456 South Rd, City B'
};

export default function UserForm() {
  const [f, setF] = useState({
    name:'', usn:'', collegeName:'', projectTitle:'', passNumber:'',
    duration:'', fromDate:'', toDate:'', mobile:'', date:''
  });

  const change = e => setF(s => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async () => {
    try {
      await axios.post('http://localhost:5000/api/submit', f);
      alert('Submitted!');
    } catch (err) {
      alert('Failed to submit');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">Internship Submission Form</h2>

      <div className="grid gap-4">
        <input className="border p-2 rounded" name="name" placeholder="Name" onChange={change} />
        <input className="border p-2 rounded" name="usn" placeholder="USN" onChange={change} />

        <div>
          <label className="font-semibold">College:</label>
          <div className="flex gap-4 mt-2">
            {Object.keys(colleges).map(c => (
              <label key={c} className="flex items-center gap-2">
                <input type="radio" name="collegeName" value={c} onChange={change} /> {c}
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">Address: {colleges[f.collegeName]}</p>
        </div>

        <input className="border p-2 rounded" name="projectTitle" placeholder="Project Title" onChange={change} />
        <input className="border p-2 rounded" name="passNumber" placeholder="Pass Number" onChange={change} />
        <input className="border p-2 rounded" name="duration" placeholder="Duration (e.g. 2 Weeks)" onChange={change} />

        <div className="flex gap-4">
          <input className="border p-2 rounded w-full" name="fromDate" type="date" onChange={change} />
          <input className="border p-2 rounded w-full" name="toDate" type="date" onChange={change} />
        </div>

        <input className="border p-2 rounded" name="mobile" placeholder="Mobile Number" onChange={change} />
        <input className="border p-2 rounded" name="date" type="date" onChange={change} />

        <button
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          onClick={submit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
