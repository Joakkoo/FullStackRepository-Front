import React, { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";
import RegistroTarea from "./../components/RegistroTarea";
import "./taskcreate.css";
import AdminButton from "../components/AdminButton";

const TaskCreate = () => {
  const postTask = process.env.REACT_APP_API_POSTTASKS;

  const [setTasks] = useState([]);
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const onFinishRegister = (values, form) => {
    const { title, description } = values;

    confirm({
      title: "Confirmar registro",
      content: "¿Deseas registrar una nueva tarea?",
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await axios.post(postTask, { title, description });

          if (response.status === 200) {
            message.success("Tarea registrada correctamente");
            form.resetFields();
          } else {
            message.error("Error al registrar la tarea");
          }
        } catch (error) {
          message.error("Error al registrar la tarea");
        }
      },
      onCancel: () => {
        message.warning("Se ha cancelado el registro de la tarea");
      },
    });
  };

  return (
    <div className="App-Card-Container">
      <div className="App-Card-Register">
        <RegistroTarea onFinishRegister={onFinishRegister} />
        <div className="App-Card-AdminButton">
        <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default TaskCreate;
