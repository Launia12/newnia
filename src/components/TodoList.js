import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingText, setEditingText] = useState('');

    // Function untuk menambah Todo
    const addTodo = () => {
        if (newTodo.trim()) {
            setTodos([...todos, newTodo]);
            setNewTodo('');
        }
    };

    // Function untuk menghapus Todo
    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    // Function untuk mengedit Todo
    const editTodo = (index) => {
        setEditingIndex(index);
        setEditingText(todos[index]);
    };

    // Function untuk menyimpan perubahan
    const saveEdit = () => {
        const updatedTodos = todos.map((todo, index) => 
            index === editingIndex ? editingText : todo
        );
        setTodos(updatedTodos);
        setEditingIndex(null);
        setEditingText('');
    };

    return (
        <div className="container mt-4">
            <h2>Todo List</h2>
            <Form onSubmit={(e) => e.preventDefault()} className="mb-3">
                <Form.Group controlId="todoInput">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter new todo" 
                        value={newTodo} 
                        onChange={(e) => setNewTodo(e.target.value)} 
                    />
                </Form.Group>
                <Button variant="primary" onClick={addTodo}>Add Todo</Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Todo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {editingIndex === index ? (
                                    <Form.Control 
                                        type="text" 
                                        value={editingText} 
                                        onChange={(e) => setEditingText(e.target.value)} 
                                    />
                                ) : (
                                    todo
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <>
                                        <Button variant="success" onClick={saveEdit} className="mr-2">Save</Button>
                                        <Button variant="secondary" onClick={() => setEditingIndex(null)}>Cancel</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="warning" onClick={() => editTodo(index)} className="mr-2">Edit</Button>
                                        <Button variant="danger" onClick={() => deleteTodo(index)}>Delete</Button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TodoList;
