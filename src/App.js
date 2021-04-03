import 'antd/dist/antd.css';
import './App.css'
import {DatePicker} from 'antd'
import Todos from './components/Todos'

function App() {
  return (
    <div className="container">
      <Todos />
    </div>
  );
}

export default App;
