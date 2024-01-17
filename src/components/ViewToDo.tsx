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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
    <li key={todo.id} className='flex w-full flex-row gap-4'>
      <div className='collapsible my-2 w-4/5 font-bold'>
        {isEditing ? (
          <form onSubmit={form.handleSubmit(handleSave)} className=''>
            <Input
              className='w-full rounded-md border border-primary px-2'
              value={newTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewTitle(e.target.value);
              }}
            />
          </form>
        ) : (
          <Accordion
            type='multiple'
            className='flex w-full flex-col rounded-md border px-2 '
          >
            <AccordionItem value='item-1'>
              <AccordionTrigger>{todo.title}</AccordionTrigger>
              <AccordionContent className=' font-normal '>{todo.desc}</AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
      <div className='flex w-1/5 flex-row items-center justify-center'>
        {isEditing ? (
          <Button size='icon' className='mr-2 ' onClick={handleSave}>
            <FaCheck />
          </Button>
        ) : (
          <Button size='icon' className='mr-2' onClick={handleEdit}>
            <CiEdit className=' size-6' />
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size='icon'>
              <MdDeleteOutline className=' size-6' />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </li>
  );
};
