import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';

const initialFormValues = {item: ''};

export default function Add() {
    const [items, setItem] = useState([]);
    const [file, setFile] = useState(null);
    const { bindInput, values } = useForm(initialFormValues);
    const { user } = useContext(AuthContext);
    const db = firebase.firestore();

    useEffect(() => {
        if(user) {
            db.collection("todos")
                .where("user", "==", user.uid)
                .onSnapshot((docs) => {
                    const todos = [];
                    docs.forEach((doc) => {
                        const todo = {...doc.data(), id: doc.id}
                        todos.push(todo);
                    });
                    setItem(todos);
                    console.log(todos)
                });   
        }     
    }, [db, user]);

    
    async function handleChange(todoId) {
        const todo = items.find(todo => todo.id === todoId);
        const todoRef = db.collection("todos").doc(todoId);
        
        todo.status = todo.status === 'NOT_COMPLETED' ? 'COMPLETED' : 'NOT_COMPLETED'
        
        try {
            await todoRef.update({
                status: todo.status
            });            
            console.log("Document successfully updated!");
        } catch(error) {
            // The document probably doesn't exist.
            console.warn("Error updating document: ", error);
        };
        
        setItem([...items]);
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const storage = firebase.storage().ref();

            const upload = storage.child(`images/${file.name}`);
            const snapshot = await upload.put(file)
            const fileUrl = await snapshot.ref.getDownloadURL();

            const docRef = await db.collection("todos").add({
                title: values.todo,
                status: 'NOT_COMPLETED',
                user: user.uid,
                fileUrl
            });
            
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.warn("Error adding document: ", error);
        };
    }

    function handleFile(e) {
        setFile(e.target.files[0]);
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Todos</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" {...bindInput('todo')} />
                        </div>
                        <div className="form-group">
                            <input type="file" className="" id="customFile" onChange={ handleFile } />
                            {/* <label class="custom-file-label" for="customFile">Choose file</label> */}
                        </div>
                        <button className="btn btn-primary">Add Todo</button>
                    </form>
                </div>
            </div>
            <br />
            { items.map(todo => (
                <p key={todo.id}>
                    <label>
                        <input type="checkbox" checked={ todo.status === 'COMPLETED' } onChange={ () => handleChange(todo.id) } />
                        { todo.title }
                        <img src={todo.fileUrl} alt="Todo" />
                    </label>
                </p>
            )) }
        </div>
    )
}
