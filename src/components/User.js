import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";

const User = props => {
  const initialUserState = {
    id: null,
    name: "",
    email: "",
    username: ""
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = id => {
    UserDataService.get(id)
      .then(response => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    UserDataService.update(currentUser.id, currentUser)
      .then(response => {
        console.log(response.data);
        alert("The User was updated successfully!");
        props.history.push("/users");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const cancelRequest = () => {
        props.history.push("/users");
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentUser.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </div>

             <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={currentUser.email}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <div class="row">
          <div className="col-md-6">
           <button className="btn btn-danger" onClick={cancelRequest}>
            Cancel
          </button>
          </div>

          <div className="col-md-6">
           <button type="submit" className="btn btn-success" onClick={updateUser}>
            Update
          </button>
          </div>
          </div>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;
