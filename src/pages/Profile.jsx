import { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/profile")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Page</h1>

      <p><strong>ID:</strong> {user._id}</p>
      <p><strong>First Name:</strong> {user.firstname}</p>
      <p><strong>Last Name:</strong> {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>

      {user.profileImage && (
        <div>
          <img
            src={`http://localhost:3000/uploads/${user.profileImage}`}
            alt="Profile"
            width="150"
          />
        </div>
      )}
    </div>
  );
}

export default Profile;
