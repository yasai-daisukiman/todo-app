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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CiEdit } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

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
    <li
      key={todo.id}
      className='flex flex-row max-w-full justify-center my-2 collapsible font-bold gap-4'
    >
      {isEditing ? (
        <form onSubmit={form.handleSubmit(handleSave)} className='w-2/3'>
          <Input
            className=' px-2 border border-primary rounded-md w-full'
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewTitle(e.target.value);
            }}
          />
        </form>
      ) : (
        <Accordion
          type='multiple'
          className='flex flex-col w-2/3 border rounded-md px-2 '
        >
          <AccordionItem value='item-1'>
            <AccordionTrigger>{todo.title}</AccordionTrigger>
            <AccordionContent className=' font-normal '>{todo.desc}</AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <div className='flex flex-row items-center w-1/3'>
        {isEditing ? (
          <Button size='icon' className='mr-2 ' onClick={handleSave}>
            <FaCheck />
          </Button>
        ) : (
          <Button size='icon' className='mr-2' onClick={handleEdit}>
            <CiEdit className=' size-6' />
          </Button>
        )}
        <Button size='icon' onClick={handleDelete}>
          <MdDeleteOutline className=' size-5' />
        </Button>
      </div>
    </li>
  );
};
