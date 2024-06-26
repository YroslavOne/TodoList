import style from "./VitalTask.module.css";
import Pending from "./../../../public/image/dashboard/Pending.svg";
import Plus from "./../../../public/image/dashboard/taSK.svg";
import Task from "../../components/task/Task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getTasks, getVitalTasks } from "../../store/tasks.slice";
import { useEffect, useState } from "react";
import { toggle } from "../../store/toggle.slice";

function VitalTask() {
  const dispatch = useDispatch();
  const taskList = useSelector((s: RootState) => s.tasks.tasks);
  const openWindowForm = () => {
    dispatch(toggle());
  };
  useEffect(() => {
    dispatch(getTasks("Vital"));
  }, [dispatch]);
  console.log(taskList)

  const arrayForRending = taskList?.filter((elem) =>elem)
  const d = new Date();
  const day = d.getDate();
  const mount = d.toLocaleDateString("en-US", { month: "long" });
  return (
    <div className={style["container"]}>
      <div className={style["list-task"]}>
        <div className={style["top-bar"]}>
          <div className={style["title"]}>
            <img src={Pending} alt="" />
            <p className={style["todo"]}>To-Do</p>
          </div>
          <div className={style["button"]}>
            <img className={style["image"]} src={Plus} alt="" />
            <p onClick={openWindowForm}> Add task</p>
          </div>
        </div>
        <div>
          <p className={style["today"]}>
            {day} {mount} <span> &bull; Today</span>
          </p>
        </div>
        <div className={style["task"]}>
          {arrayForRending ? (
            arrayForRending.map((t) => (
              <Task 
							key={t.id}
                id={t.id}
                title={t.title}
                date={t.date}
                description={t.description}
                priority={t.priority}
                status={t.status}
                image={t.image}
              />
            ))
          ) : (
            <div>тютю задач</div>
          )}
        </div>
      </div>
    </div>
  );
}
export default VitalTask;
