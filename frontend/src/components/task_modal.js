import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addTask, editTask } from "../redux/actions/tasks";

import "../styles/task_modal.scss";

const TaskModal = ({ active, handler, data = {} }) => {
  const data_bool = Object.keys(data).length != 0;

  const dispatch = useDispatch();

  const [email, setEmail] = useState(data.email);
  const [username, setUsername] = useState(data.username);
  const [description, setDescription] = useState(data.description);
  const [status, setStatus] = useState(data_bool ? data.completed : false);

  const saveHandler = () => {
    console.log(data_bool, data, username, email, description, status);
    if (data_bool) {
      dispatch(editTask(data.id, description));
    } else {
      dispatch(addTask({ username, email, description, status }));
    }
  };

  return (
    active && (
      <div className="modal-main">
        <div className="modal-content">
          <div>Username</div>
          <input
            onChange={() => setUsername(event.target.value)}
            value={username}
            className="text-field modal-username"
            placeholder="Your username.."
            disabled={data_bool}
          />
          {data_bool && data.username}
          <div>Email</div>
          <input
            onChange={() => setEmail(event.target.value)}
            value={email}
            className="text-field modal-email"
            placeholder="Your email.."
            disabled={data_bool}
          />
          {data_bool && data.email}
          <div>Description</div>
          <textarea
            onChange={() => setDescription(event.target.value)}
            value={description}
            className="text-field modal-description"
            placeholder="Task description.."
          />
          {data_bool && data.description}
          <label
            className="noselect modal-checkbox"
            onClick={() => setStatus(!status)}
            disabled={data_bool}
          >
            <input type="checkbox" value={status} />
            Completed?
          </label>

          <div className="modal-buttons">
            <button className="modal-cancel" onClick={() => handler(false)}>
              Cancel
            </button>
            <button className="modal-save" onClick={() => saveHandler()}>
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskModal;
