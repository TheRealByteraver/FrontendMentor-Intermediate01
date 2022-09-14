import './App.css';

import Header from './header.js';
import Footer from './footer.js';
import Calculator from './Calculator.js';

function App() {
  return (
    <div className="App">
      <Header />
        <Calculator />
      <Footer />
    </div>
  );
}

export default App;