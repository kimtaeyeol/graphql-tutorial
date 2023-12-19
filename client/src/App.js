import './App.css';
import AddTopic from './components/AddTopic';
import GetTopics from './components/GetTopics';

function App() {
  return (
    <div className="container mx-auto">
      <div>
        <h3 className='mb-3'>Topics</h3>
        <AddTopic />
        <GetTopics />
      </div>
    </div>
  );
}

export default App;
