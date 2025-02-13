import React, { useState } from "react";
import { Button, Input, Card, List, Modal } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
}

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Partial<Task>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const showModal = (editTask?: Task) => {
    setTask(editTask || {});
    setIsEditing(!!editTask);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTask({});
  };

  const handleSave = () => {
    if (!task.title || !task.description) return;

    if (isEditing) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
    } else {
      setTasks([...tasks, { id: uuidv4(), ...task } as Task]);
    }
    setIsModalVisible(false);
    setTask({});
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>Todo List</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
        Create Task
      </Button>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={tasks}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={item.title}
              bordered
              style={{ boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
              actions={[
                <EditOutlined key="edit" onClick={() => showModal(item)} />,
                <DeleteOutlined key="delete" onClick={() => handleDelete(item.id)} />,
              ]}
            >
              <p>{item.description}</p>
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title={isEditing ? "Edit Task" : "Create Task"}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Input
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          style={{ marginBottom: 10 }}
        />
        <Input.TextArea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          style={{ marginBottom: 10 }}
        />
      </Modal>
    </div>
  );
};

export default TodoApp;
