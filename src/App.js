
import { QueryClient, QueryClientProvider } from 'react-query';

// components
import TodoList from './components/TodoList';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
