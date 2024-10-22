import { Modal, Form, message } from "antd";
import axios from "axios";
import RegistroTarea from "./../components/RegistroTarea";
import "./taskcreate.css";
import AdminButton from "../components/AdminButton";

const TaskCreate = () => {
  const postTask = process.env.REACT_APP_API_BASE_URL; // Asegúrate de que esta variable esté configurada correctamente
  const [form] = Form.useForm();
  const { confirm } = Modal;

  const onFinishRegister = (values) => {
    const { title, description } = values;


    confirm({
      title: "Confirmar registro",
      content: "¿Deseas registrar una nueva tarea?",
      okText: "Sí",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await axios.post(postTask, { title, description });

          // Cambia aquí el código de estado a 201
          if (response.status === 201) {
            message.success("Tarea registrada correctamente");
            form.resetFields(); // Reinicia el formulario
            console.log(response.data); // Muestra la respuesta en la consola
          } else {
            // Este bloque ya no debería activarse si la API devuelve 201
            message.error("Algo ha salido mal");
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
