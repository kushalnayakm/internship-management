import { useEffect, useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export default function AdminPage() {
  const [subs, setSubs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const fetchSubs = () => {
    axios.get('http://localhost:5000/api/submissions')
      .then(res => setSubs(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSubs();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/submissions/${id}`)
      .then(fetchSubs)
      .catch(console.error);
  };

  const handleEdit = (id) => {
    setEditId(id);
    const current = subs.find(sub => sub._id === id);
    setEditedData(current);
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/submissions/${editId}`, editedData)
      .then(() => {
        fetchSubs();
        setEditId(null);
      });
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(subs);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Internships');
    const blob = new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })]);
    saveAs(blob, 'Internships.xlsx');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h2>

      <button
        onClick={exportExcel}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Export to Excel
      </button>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">USN</th>
              <th className="p-2 border">Project</th>
              <th className="p-2 border">Mobile</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subs.map(sub => (
              <tr key={sub._id} className="odd:bg-white even:bg-gray-50">
                <td className="p-2 border">
                  {editId === sub._id
                    ? <input className="border p-1" value={editedData.name} onChange={e => setEditedData({ ...editedData, name: e.target.value })} />
                    : sub.name}
                </td>
                <td className="p-2 border">
                  {editId === sub._id
                    ? <input className="border p-1" value={editedData.usn} onChange={e => setEditedData({ ...editedData, usn: e.target.value })} />
                    : sub.usn}
                </td>
                <td className="p-2 border">{sub.projectTitle}</td>
                <td className="p-2 border">{sub.mobile}</td>
                <td className="p-2 border">
                  {editId === sub._id ? (
                    <>
                      <button onClick={handleSave} className="bg-blue-500 text-white px-2 py-1 mr-2 rounded">Save</button>
                      <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(sub._id)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(sub._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
