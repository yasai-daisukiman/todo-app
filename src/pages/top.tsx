import Layout from '@/components/Layout';
import { InputTask } from '@/components/inputTask';
import { ToDoList } from '@/components/ToDoList';

const TopPage = () => {
  return (
    <>
      <Layout>
        <div className='flex flex-row justify-center'>
          <div className='flex flex-row gap-8 w-5/6'>
            <div className='w-1/2 '>
              <InputTask />
            </div>
            <div className='w-1/2 h-96'>
              <ToDoList />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default TopPage;
