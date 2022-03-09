import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasks, setEditActive } from "../redux/actions/tasks";
import { loadUser } from "../redux/actions/user";

import Task from "../components/task";
import LoadingBlock from "../components/loading_block";
import PaginationBlock from "../components/pagination_block";
import TaskModal from "../components/task_modal";
import AuthModal from "../components/auth_modal";

import "../styles/tasks.scss";

const MainPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(({ tasks }) => tasks.isLoading);
  const tasks = useSelector(({ tasks }) => tasks.items);
  const maxPageIndex = useSelector(({ tasks }) => tasks.totalPages);
  const addedNewTask = useSelector(({ tasks }) => tasks.addedNewTask);
  const currentPage = useSelector(({ pagination }) => pagination.currentPage);
  const isAdministrator = useSelector(({ user }) => user.isAdmin);

  const authWindowActive = useSelector(({ user }) => user.authWindowActive);
  const editWindowActive = useSelector(({ tasks }) => tasks.editWindowActive);

  const isInitialMount = useRef(true);

  const [orderGroup, setOrderGroup] = useState("username");
  const [orderCourse, setOrderCourse] = useState("asc");
  const [editingData, setEditingData] = useState({});

  const groupFilter = [
    { value: "username", text: "username" },
    { value: "email", text: "email" },
    { value: "completed", text: "status" },
  ];

  const orderFilter = [
    { value: "asc", text: "ascending" },
    { value: "desc", text: "descending" },
  ];

  const DefaultSorterBlock = ({ data, handler, value }) => {
    return (
      <select onChange={(e) => handler(e.target.value)} value={value}>
        {data.map((el, index) => (
          <option value={el.value} key={index}>
            By {el.text}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {
    dispatch(getTasks(currentPage, orderGroup, orderCourse));
  }, [currentPage, orderGroup, orderCourse]);

  useEffect(() => {
    if (addedNewTask) {
      dispatch(getTasks(currentPage, orderGroup, orderCourse));
    }
  }, [addedNewTask]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (isAdministrator) {
        dispatch(setEditActive(true));
      }
    }
  }, [editingData]);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      {editWindowActive && <TaskModal data={editingData} />}
      {authWindowActive && <AuthModal />}
      <div className="content">
        <div className="task-headers">
          <button
            className="task-add"
            onClick={() => {
              setEditingData({}), dispatch(setEditActive(true));
            }}
          >
            ADD TASK
          </button>
          <div className="task-filter">
            <DefaultSorterBlock
              data={groupFilter}
              handler={setOrderGroup}
              value={orderGroup}
            />
            <DefaultSorterBlock
              data={orderFilter}
              handler={setOrderCourse}
              value={orderCourse}
            />
          </div>
        </div>
        <div className="tasks-content">
          {isLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <LoadingBlock key={index} />)
            : Object.values(tasks).map((obj) => (
                <Task key={obj.id} data={obj} handler={setEditingData} />
              ))}
        </div>
        <PaginationBlock maxPageIndex={maxPageIndex} />
      </div>
    </>
  );
};

export default MainPage;
