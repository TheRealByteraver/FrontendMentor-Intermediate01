import { useState } from 'react';

function Calculator() {
    const maxLen = 12;
    const emptyDisplay = '0';

    const [display, setDisplay] = useState(emptyDisplay);
    const [memory, setMemory] = useState({
        avail: false,
        value: 0
    });
    const [operator, setOperator] = useState({
        resetFlag: false,
        avail: false,
        value: ''
    });

    function handler(event) {
        // note: 'compute' returns a string, not a float
        function compute(val1, val2, operator) {
            // console.log('computing: ', val1, operator, val2);
            let result;
            switch (operator) {
                case '-': result = val1 - val2;
                break;
                case '+': result = val1 + val2;
                break;
                case '/': result = (val2 !== 0) ? val1 / val2 : 'Error';
                break;
                case 'x': result = val1 * val2;
                break;
                default: result = 'Error';
            }
            const resultStr = result.toString();
            if (resultStr.length > maxLen) {
                return result.toExponential(maxLen - 6);
            }
            return resultStr;
        }

        // only handle button presses
        if (event.target.tagName !== 'BUTTON') return;

        // identify which button was pressed
        const elem = event.target;
        const input = elem.textContent || elem.innerText;

        // initialize some booleans for later logic
        const INPUT = input.toUpperCase();
        const isDigit = '0123456789.'.includes(input);
        const isDecimalPoint = input === '.';
        const decimalPresent = display.toString().includes('.');
        const isEmpty = display === emptyDisplay;
        const isOperator = ['+', '-', 'x', '/', '='].includes(input);

        // handle reset key
        if (INPUT === 'RESET') {
            setDisplay(emptyDisplay);
            setMemory({
                avail: false,
                value: 0
            });
            setOperator({
                resetFlag: false,
                avail: false,
                value: ''
            });  
            return;          
        }
  
        // handle operators
        if (isOperator) {
            // handle unary minus
            if (input === '-') {
                // set unary minus
                if (isEmpty) {
                    setDisplay('-'); 
                    return;
                }
                // cancel unary minus
                if (display === '-') {
                    setDisplay(emptyDisplay); 
                    return;
                }
                // check if we are ready to enter a new number after
                // an operator was entered
                if (operator.resetFlag && (operator.value !== '=')) {
                    // store previous value in memory
                    setMemory({
                        avail: true,
                        value: parseFloat(display)
                    });
                    // reset flag, we are in digit entering mode now
                    setOperator(prev => ({
                        ...prev,
                        resetFlag: false
                    }));
                    // first character of new number is unary minus
                    setDisplay('-');
                    return;
                }
            }

            // we do not handle other operators on 0 because useless
            if (isEmpty) return;

            // deal with previous operation if any
            if (memory.avail) {
                const val = compute(memory.value, parseFloat(display), operator.value);
                setMemory({
                    avail: false,
                    value: 0
                });
                setDisplay(val);
                if (input === '=') {
                    setOperator({
                        resetFlag: true,
                        avail: false,
                        value: '='  // so we can check it later
                    });
                    return;
                }
            }
            // Ok so we have a value, set flag to enter next number
            setOperator({
                resetFlag: true,
                avail: true,
                value: input
            });
            return;
        }

        // Handle DEL key
        if (INPUT === 'DEL') {
            if (operator.resetFlag) {
                // cancel operator
                setOperator({
                    resetFlag: false,
                    avail: false,
                    value: ''
                });               
                // empty memory     
                setMemory({
                    avail: false,
                    value: 0
                });
            }
            if (display.length > 0) {
                setDisplay(prev => {
                    let val = prev.slice(0, -1);
                    return val.length ? val : emptyDisplay;
                });
            }
            return;
        }

        // handle digits
        if (isDigit) {
            // check if previous input was an operator.
            // if so, handle previous operation first
            if (operator.resetFlag) {
                if (operator.value !== '=') {
                    // store previous value in memory
                    setMemory({
                        avail: true,
                        value: parseFloat(display)
                    });
                }

                // reset flag, we are in digit entering mode now
                setOperator(prev => ({
                    ...prev,
                    resetFlag: false
                }));

                // put start of new number on display
                setDisplay(input);
                return;
            }
            // No, we are just busy entering numbers here.
            // we do not accept more than one decimalpoint
            if (isDecimalPoint && decimalPresent) return;

            // We do not accept more than 12 characters
            if (display.length >= maxLen ) return;

            setDisplay(prev => isEmpty ? input : prev + input);
        }
    } 

    return (
        <>
            <div className='displayContainer'>
                {display}
            </div>
            <div className='keypadContainer' onClick={handler}>
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
        </>
    );
}

export default Calculator;