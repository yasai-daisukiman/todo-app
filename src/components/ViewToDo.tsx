'use client';

import { db } from '@/firebase/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Button } from './ui/button';
import { TaskProps } from '@/types/TodoList';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type ToDoProps = {
  todo: TaskProps;
};

const formSchema = z.object({
  title: z.string().min(0, {}),
});

export const ViewToDo = ({ todo }: ToDoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
    },
  });

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await editDocumet(newTitle);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteDocument();
  };

  const deleteDocument = async () => {
    await deleteDoc(doc(db, 'todos', todo.id));
  };

  const editDocumet = async (newTitle: string) => {
    const ref = doc(db, 'todos', todo.id);
    await updateDoc(ref, {
      title: newTitle,
    });
  };

  return (
    <li key={todo.id} className='flex justify-between border-l-4 border-primary my-6'>
      {isEditing ? (
        <form onSubmit={form.handleSubmit(handleSave)}>
          <Input
            className='ml-2 py-1 px-2 font-bold font-xl rouded border-primary border'
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTitle(e.target.value);
            }}
          />
        </form>
      ) : (
        <span className=' font-bold  pl-4 flex flex-col justify-center'>
          {todo.title}
        </span>
      )}
      <div>
        {isEditing ? (
          <Button className='mr-2' onClick={handleSave}>
            save
          </Button>
        ) : (
          <Button className='mr-2' onClick={handleEdit}>
            edit
          </Button>
        )}
        <Button onClick={handleDelete}>delete</Button>
      </div>
    </li>
  );
};
