/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { ViewToDo } from './ViewToDo';
import { TaskProps } from '@/types/TodoList';
import { ScrollArea } from './ui/scroll-area';
import dayjs from 'dayjs';
import { Label } from './ui/label';

export const ToDoList = () => {
  const [groupedData, setGroupedData] = useState({});

  //firestoreからリアルタイムでデータ取得
  useEffect(() => {
    const getData = () => {
      const collectionRef = collection(db, 'todos');

      onSnapshot(collectionRef, (todo) => {
        const data = todo.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
              date: dayjs(doc.data().date.toDate()).format('YYYY/MM/DD'),
            }) as unknown as TaskProps,
        );

        // フォーマットしたデータをソート
        const sortedData = data.sort(
          (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
        );

        const groupedData = sortedData.reduce((prev, current) => {
          const date = current.date;
          prev[date] = prev[date] ? [...prev[date], current] : [current];
          return prev;
        }, {});
        setGroupedData(groupedData);
      });
    };
    getData();
  }, []);

  return (
    <>
      <ScrollArea className='h-full rounded-md border border-primary'>
        {Object.keys(groupedData).map((date) => (
          <div key={date} className='pt-2'>
            <Label className='pl-4'>{date}</Label>
            {groupedData[date].map((todo: TaskProps) => (
              <ViewToDo key={todo.id} todo={todo} />
            ))}
          </div>
        ))}
      </ScrollArea>
    </>
  );
};
