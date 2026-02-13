"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [file, setFile] = useState(null);

  // Fetch user
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data) {
          setForm({
            firstname: data.firstname || "",
            lastname: data.lastname || "",
            email: data.email || "",
          });
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstname", form.firstname);
    formData.append("lastname", form.lastname);
    formData.append("email", form.email);

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    setUser(data.user);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Profile Page</h1>

      <p><strong>ID:</strong> {user._id}</p>

      {user.profileImage && (
        <Image
          src={`/uploads/${user.profileImage}`}
          alt="Profile"
          width={150}
          height={150}
        />
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>
          <label>First Name:</label><br />
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name:</label><br />
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Profile Image:</label><br />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Update Profile
        </button>
      </form>
    </div>
  );
}
