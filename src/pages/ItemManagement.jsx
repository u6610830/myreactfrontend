import { useEffect, useState } from "react";

const API = "http://localhost:3000/api/user";

export default function ItemManagement() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateUser = async (u) => {
    await fetch(`${API}/${u._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstname: u.firstname }),
    });
    loadUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadUsers();
  };

  return (
    <div>
      <h2>User Management</h2>

      {users.map((u) => (
        <div key={u._id}>
          <input
            value={u.firstname || ""}
            onChange={(e) =>
              updateUser({ ...u, firstname: e.target.value })
            }
          />
          <button onClick={() => deleteUser(u._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
