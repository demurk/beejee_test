import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTask, editTask, setEditActive } from "../redux/actions/tasks";

import "../styles/modal.scss";

const TaskModal = ({ data = {} }) => {
  const data_bool = Object.keys(data).length != 0;

  const dispatch = useDispatch();

  const [email, setEmail] = useState(data.email);
  const [username, setUsername] = useState(data.username);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data_bool ? data.completed : false);

  const saveHandler = () => {
    if (data_bool) {
      dispatch(editTask({ id: data.id, description, completed: status }));
    } else {
      dispatch(addTask({ username, email, description, completed: status }));
    }
  };

  return (
    <div className="modal-main">
      <div className="modal-content">
        <div className="modal-fields">
          <div>Username</div>
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="text-field modal-username"
            placeholder="Your username.."
            disabled={data_bool}
          />
          <div>Email</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="text-field modal-email"
            placeholder="Your email.."
            disabled={data_bool}
          />
          <div>Description</div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="text-field modal-description"
            placeholder="Task description.."
          />
          <label className="noselect modal-checkbox">
            <input
              type="checkbox"
              value={status}
              onClick={() => setStatus(!status)}
            />
            Is completed?
          </label>
        </div>
        <div className="modal-buttons">
          <button
            className="modal-cancel"
            onClick={() => dispatch(setEditActive(false))}
          >
            Cancel
          </button>
          <button className="modal-save" onClick={() => saveHandler()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
