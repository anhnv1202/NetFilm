import React, { useState } from "react";
import jsonData from "../data/alldata.json";
import "../style/Admin.css";

const Admin = () => {
  const [data, setData] = useState(jsonData);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (idToDelete) => {
    setData((prevData) =>
      prevData.map((title) => ({
        ...title,
        film: title.film.filter((film) => film.id !== idToDelete),
      }))
    );
    setEditingId(null);
  };

  const handleEdit = (idToEdit, column, newValue) => {
    setData((prevData) =>
      prevData.map((title) => ({
        ...title,
        film: title.film.map((film) =>
          film.id === idToEdit ? { ...film, [column]: newValue } : film
        ),
      }))
    );
    setEditingId(null);
  };

  return (
    <div className="admin-container">
      <table>
        <thead>
          <tr>
            <th>Title ID</th>
            <th>Title</th>
            <th>Film Name</th>
            <th>Year</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((title) =>
            title.film.map((film) => (
              <tr key={film.id}>
                <td>{title.id}</td>
                <td>{title.title}</td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="text"
                      defaultValue={film.name}
                      onChange={(e) =>
                        handleEdit(film.id, "name", e.target.value)
                      }
                    />
                  ) : (
                    film.name
                  )}
                </td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="number"
                      defaultValue={film.year}
                      onChange={(e) =>
                        handleEdit(film.id, "year", parseInt(e.target.value))
                      }
                    />
                  ) : (
                    film.year
                  )}
                </td>
                <td>
                  {editingId === film.id ? (
                    <input
                      type="text"
                      defaultValue={film.description}
                      onChange={(e) =>
                        handleEdit(film.id, "description", e.target.value)
                      }
                    />
                  ) : (
                    film.description
                  )}
                </td>
                <td>
                  <img src={film.img} alt={film.name} className="poster" />
                </td>
                <td>
                  {editingId === film.id ? (
                    <>
                      <button onClick={() => handleEdit(film.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(film.id)}>Update</button>
                      <button onClick={() => handleDelete(film.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
