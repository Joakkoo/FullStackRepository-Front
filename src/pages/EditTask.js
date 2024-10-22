import React, { useState, useEffect } from "react";
import { Modal, Form, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import AdminButton from "../components/AdminButton";
import "./taskcreate.css";
import EditTask from "../components/EditTasksForm";

const TaskEdit = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const { id } = useParams(); 

  // Cargar la tarea actual por ID desde la URL
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const getTaskUrl = `${baseUrl}/${id}`;
        const response = await axios.get(getTaskUrl);
        // Aquí establecemos currentTask directamente con response.data
        setCurrentTask(response.data); 
        form.setFieldsValue(response.data); // Rellenar el formulario con los datos de la tarea
      } catch (error) {
        message.error("Error al cargar los datos de la tarea");
      }
    };
    
    if (id) {
      fetchTask(); // Solo llamar a la API si existe un id
    }
  }, [id, form, baseUrl]); 

  // Manejar la actualización de la tarea
  const handleOk = async (values) => {
    try {
      const putTaskUrl = `${baseUrl}/${currentTask._id}`;
      await axios.put(putTaskUrl, values);
      message.success("Tarea actualizada correctamente");
      setIsModalVisible(false);
    } catch (error) {
      message.error("Error al actualizar la tarea");
    }
  };

  // Confirmar antes de guardar los cambios
  const onFinishEdit = (values) => {
    confirm({
      title: "Confirmar Cambio de Tarea",
      content: "¿Deseas hacer este cambio en la tarea?",
      okText: "Sí",
      cancelText: "No",
      onOk: () => handleOk(values), // Aquí se pasan los valores del formulario a `handleOk`
      onCancel: () => {
        message.warning("Se ha cancelado la modificación de la tarea");
      },
    });
  };

  return (
    <div className="App-Card-Container">
      <div className="App-Card-Register">
        {/* Pasar los datos de la tarea y la función onFinishEdit */}
        {currentTask && (
          <EditTask 
            onFinishEdit={onFinishEdit} 
            task={currentTask} 
            form={form} // Asegúrate de pasar el formulario para que pueda ser editado
          />
        )}
        <div className="App-Card-AdminButton">
          <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
