import './App.css';

function handleThemeSelector(event) {
  document.documentElement.setAttribute('data-theme', event.target.value);
  // localStorage.setItem('theme', event.target.value);
}

function App() {
  return (
    <div className="App">
      <header className="flex">
        <h1>calc</h1>
        <fieldset className='themeSelector'>
          <legend>theme</legend>

          <div className="flex column">
            <div className="flex toggle-container">
              <label htmlFor="theme1">1</label>
              <label htmlFor="theme2">2</label>
              <label htmlFor="theme3">3</label>
            </div> 
            <div className="flex toggle-container radio-group" onClick={handleThemeSelector}>
              <div className="radio-item">
                <input type="radio" id="theme1" name="theme" value="theme1" defaultChecked />
              </div>
              <div className="radio-item">
                <input type="radio" id="theme2" name="theme" value="theme2" />
              </div>            
              <div className="radio-item">
                <input type="radio" id="theme3" name="theme" value="theme3" />
              </div>
            </div>
          </div>

        </fieldset>           
      </header>

      <main>
          <div className='displayContainer'>
            399,981
          </div>
          <div className='keypadContainer'>
            <button className='key'>7</button>
            <button className='key'>8</button>
            <button className='key'>9</button>
            <button className='key delete'>Del</button>
            <button className='key'>4</button>
            <button className='key'>5</button>
            <button className='key'>6</button>
            <button className='key'>+</button>
            <button className='key'>1</button>
            <button className='key'>2</button>
            <button className='key'>3</button>
            <button className='key'>-</button>
            <button className='key'>.</button>
            <button className='key'>0</button>
            <button className='key'>/</button>
            <button className='key'>x</button>
            <button className='key reset'>reset</button>
            <button className='key equal'>=</button>
          </div>
      </main> 
      <footer className="attribution">
          Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="#">Erland Van Olmen</a>.
      </footer>      
    </div>
  );
}

export default App;
