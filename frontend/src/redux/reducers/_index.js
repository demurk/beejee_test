import { combineReducers } from "redux";
import tasks from "./tasks";
import pagination from "./pagination";

export default combineReducers({ tasks, pagination });
