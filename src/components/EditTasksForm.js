import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';


const EditTask = ({ task , onFinishEdit }) => {
  const [form] = Form.useForm(); // Instancia del formulario


    // Utilizar useEffect para actualizar el formulario cuando los datos de task cambien
    useEffect(() => {
      if (task) {
        form.setFieldsValue(task); // Rellena los campos del formulario con los valores de la tarea
      }
    }, [task, form]);

  return (
    <div>
      <div>
        <h2 style={{ marginBottom: 10 }}>Ingrese una tarea</h2>
        <p style={{ marginBottom: 7, color: 'grey' }}>Por favor, rellene el siguiente formulario.</p>
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => onFinishEdit(values, form)}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Por favor ingresa el titulo de la tarea" }]}
            style={{ marginBottom: 6 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Por favor ingresa una descripción" }
            ]}
            style={{ marginBottom: 6 }}
          >
            <Input.TextArea rows={4} autoSize={{ minRows: 4, maxRows: 8 }}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', color: 'white', backgroundColor: '#252526'}}>Editar</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditTask;
