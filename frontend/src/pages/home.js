import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTasks } from "../redux/actions/tasks";

import Task from "../components/task";
import TaskUnloaded from "../components/task_unloaded";
import PaginationBlock from "../components/pagination_block";
import TaskModal from "../components/task_modal";

import "../styles/tasks.scss";

const MainPage = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(({ tasks }) => tasks.isLoading);
  const tasks = useSelector(({ tasks }) => tasks.items);
  const maxPageIndex = useSelector(({ tasks }) => tasks.totalPages);
  const currentPage = useSelector(({ pagination }) => pagination.currentPage);

  const [orderGroup, setOrderGroup] = useState("username");
  const [orderCourse, setOrderCourse] = useState("asc");
  const [modalActive, setModalActive] = useState(false);

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

  return (
    <>
      <TaskModal active={modalActive} handler={setModalActive} />
      <div className="content">
        <div className="task-headers">
          <button
            className="task-add"
            onClick={() => setModalActive((prev) => !prev)}
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
                .map((_, index) => <TaskUnloaded key={index} />)
            : Object.values(tasks).map((obj) => (
                <Task key={obj.id} data={obj} />
              ))}
        </div>
        <PaginationBlock maxPageIndex={maxPageIndex} />
      </div>
    </>
  );
};

export default MainPage;
