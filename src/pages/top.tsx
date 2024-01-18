import Layout from '@/components/Layout';
import { InputTask } from '@/components/inputTask';
import { ToDoList } from '@/components/ToDoList';

const TopPage = () => {
  return (
    <>
      <Layout>
        <div className='flex flex-row justify-center'>
          <div className='flex w-5/6 flex-row gap-8'>
            <div className='w-1/2 '>
              <InputTask />
            </div>
            <div className='h-96 w-1/2'>
              <ToDoList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default TopPage;
