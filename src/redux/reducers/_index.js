import { combineReducers } from "redux";
import tasks from "./tasks";
import pagination from "./pagination";
import alerts from "./alerts";
import user from "./user";

export default combineReducers({ tasks, pagination, alerts, user });
