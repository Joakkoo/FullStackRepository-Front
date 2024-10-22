import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal, Form, message, Card } from "antd";
import axios from "axios";
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "antd";
import LogoutButton from "../components/LogoutButton";
import { useNavigate } from 'react-router-dom';
import "./admin.css"
import RegistrarTask from "../components/RegistrarTask";


const AdminTasks = () => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [currentTask, setCurrentTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1, // Página actual
    pageSize: 5, // Elementos por página
    total: 0, // Total de elementos
  });

  useEffect(() => {
    const fetchTasks = (page, pageSize) => {
      setLoading(true);
      axios
        .get(`${baseUrl}?perPage=${pageSize}&page=${page - 1}`) // Le restas 1 a `page` porque la API espera un índice basado en 0
        .then(response => {
          setTasks(response.data.tasks);
          setPagination({
            current: page,
            pageSize: pageSize,
            total: response.data.total, // Total de elementos que te devuelve el backend
          });
          setLoading(false);
        })
        .catch(() => message.error("Error al cargar las tareas"));
    };

    fetchTasks(pagination.current, pagination.pageSize);
  }, [baseUrl, pagination.current, pagination.pageSize]);

  // Editar una tarea
  const handleEdit = (record) => {
    setCurrentTask(record);
    axios.get(`${baseUrl}/${record._id}`)
      .then(response => {
        navigate("/EditTask/" + record._id);
        form.setFieldsValue(response.data);
      })
      .catch(() => message.error("Error al obtener la tarea"));
  };

  // Eliminar una tarea
  const handleDelete = (record) => {
    axios.delete(`${baseUrl}/${record._id}`)
      .then(() => {
        message.success("Tarea eliminada");
        setTasks(tasks.filter((task) => task._id !== record._id));
      })
      .catch(() => message.error("Error al eliminar la tarea"));
  };

  // Guardar cambios en la tarea
  const handleOk = () => {
    form.validateFields().then(values => {
      axios.put(`${baseUrl}/${currentTask._id}`, values)
        .then(() => {
          message.success("Tarea actualizada correctamente");
          setIsModalVisible(false);
          // Actualizar la lista de tareas
          const updatedTasks = tasks.map(task =>
            task._id === currentTask._id ? { ...task, ...values } : task
          );
          setTasks(updatedTasks);
        })
        .catch(() => message.error("Error al actualizar la tarea"));
    });
  };

  const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
      isAuthenticated && (
        <div>
          <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={user.picture} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )
    )
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" className="edit-button" onClick={() => handleEdit(record)} icon={<FormOutlined />}></Button>
          <Button danger onClick={() => handleDelete(record)} icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
  ];

  // Código JSX sin cambios importantes

  return (
    <div className="App">
      {/* Tarjeta de perfil alineada a la izquierda en vertical */}
      <div className="Card-Profile">
        <Card>
          <Profile />
          <RegistrarTask />
          <br />
          <LogoutButton />
        </Card>
      </div>

      {/* Contenedor de la tabla a la derecha */}
      <div className="Table-Container">
        <Table
          columns={columns}
          dataSource={tasks}
          rowKey={(record) => record._id}
          loading={loading}
          pagination={{
            current: pagination.current, // Página actual
            pageSize: pagination.pageSize, // Elementos por página
            total: pagination.total, // Total de elementos
            onChange: (page, pageSize) => {
              setPagination({ ...pagination, current: page, pageSize });
            },
          }}
        />
        <Modal
          title="Editar Tarea"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Actualizar"
          cancelText="Cancelar"
        >
        </Modal>
      </div>
    </div>
  );
};

export default AdminTasks;