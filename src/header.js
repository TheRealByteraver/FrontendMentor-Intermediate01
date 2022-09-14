
function Header() {
    function handleThemeSelector(event) {
        document.documentElement.setAttribute('data-theme', event.target.value);
        // localStorage.setItem('theme', event.target.value);
    }

    return (
    <header className="flex">
        <h1>calc</h1>
        <fieldset className='themeSelector'>
            <legend>theme</legend>
            <div className="flex column">
                <div className="flex toggle-container">
                    <label htmlFor="theme1">1</label>
                    <label htmlFor="theme2">2</label>
                    <label htmlFor="theme3">3</label>
                    {/* <label htmlFor="theme3">4</label> */}
                </div> 
                <div className="flex toggle-container radio-group" onClick={handleThemeSelector}>
                    <input type="radio" id="theme1" name="theme" value="theme1" defaultChecked />
                    <input type="radio" id="theme2" name="theme" value="theme2" />
                    <input type="radio" id="theme3" name="theme" value="theme3" />
                    {/* <input type="radio" id="theme4" name="theme" value="theme4" /> */}
                </div>
            </div>    
        </fieldset>           
    </header>
    );
}

export default Header;