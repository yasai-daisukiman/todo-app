import Layout from '@/components/Layout';
import { InputTask } from '@/components/inputTask';
import { ToDoList } from '@/components/ToDoList';

const TopPage = () => {
  return (
    <>
      <Layout>
        <main className=' flex flex-col items-center justify-center'>
          <h1 className=' '>ToDoリスト</h1>
          <div className='w-full max-w-xl'>
            <InputTask />
            <ToDoList />
          </div>
        </main>
      </Layout>
    </>
  );
};
export default TopPage;
