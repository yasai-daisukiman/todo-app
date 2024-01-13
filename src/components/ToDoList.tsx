import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { ViewToDo } from './ViewToDo';
import { TaskProps } from '@/types/TodoList';

export const ToDoList = () => {
  const [todos, setTodos] = useState<TaskProps[]>();

  useEffect(() => {
    const getData = async () => {
      const collectionRef = collection(db, 'todos');

      onSnapshot(collectionRef, (todo) => {
        setTodos(todo.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TaskProps)));
      });
    };
    getData();
  }, []);

  return (
    <>
      <ul>
        {todos?.map((todo) => (
          <ViewToDo key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
};
