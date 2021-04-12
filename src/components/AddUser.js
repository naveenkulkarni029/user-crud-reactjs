import React, { useState } from "react";
import UserDataService from "../services/UserService";

const AddUser = () => {
  const initialUserState = {
    id: null,
    name: "",
    username: "",
    email: "",
  };
  const [User, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...User, [name]: value });
  };

  const saveUser = () => {
    var data = {
      name: User.name,
      username: User.username,
      email: User.email
    };

    UserDataService.create(data)
      .then(response => {
        setUser({
          id: response.data.id,
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newUser = () => {
    setUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newUser}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={User.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={User.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={User.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>

          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
