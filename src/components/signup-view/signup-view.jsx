import { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://vanessamovieapi-02068b25de4f.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <label>
        Username:
        <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="3"
        />
      </label>
      </div>
      <div>
      <label>
        Password:
        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      </label>
      </div>
      <div>
      <label>
        Email:
        <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        />
      </label>
      </div>
      <div>
      <label>
        Birthday:
        <input 
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required 
        />
      </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};