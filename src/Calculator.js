import { useState } from 'react';

/*
    TODO: 
    - handle values that are too long (stringwise)
    or too precise (reduce precision)
    - handle errors (too big nr, div by zero)
*/

function Calculator() {
    const maxVal = 999999999999;
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
        // note: returns a string, not a float
        function compute(val1, val2, operator) {
            console.log('compute called');
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
            return result.toString();
        }

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
                if (isEmpty) {
                    setDisplay('-'); 
                    return;
                } else if (display === '-') {
                    setDisplay(emptyDisplay); 
                    return;
                }
            }
            // we do not handle other operators on 0 because useless
            if (isEmpty) return;

            // deal with previous operation:
            if (memory.avail) {
                const val = compute(memory.value, parseFloat(display), operator.value);
                setMemory({
                    avail: false,
                    value: 0
                });
                setDisplay(val);
                if (input === '=') {
                    setOperator({
                        resetFlag: false,
                        avail: false,
                        value: ''
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
        }

        // handle digits
        if (isDigit || INPUT === 'DEL') {
            // Handle special case: DEL key
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
                if (input.length > 0) {
                    setDisplay(prev => {
                        let val = prev.slice(0, -1);
                        return val.length ? val : emptyDisplay;
                    });
                } 
                return;
            }

            // check if previous input was an operator.
            // if so, handle previous operation first
            if (operator.resetFlag) {
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

                // put start of new number on display
                setDisplay(input);
                return;
            }

            // No, we are just busy entering numbers here.
            // we do not accept more than one decimalpoint
            if (isDecimalPoint && decimalPresent) return;
            setDisplay(prev => isEmpty ? input : prev + input);
        }
    } 

    return (
        <>
            <div className='displayContainer'>
                {display}
            </div>
            <div className='keypadContainer'>
                <button className='key' onClick={handler}>7</button>
                <button className='key' onClick={handler}>8</button>
                <button className='key' onClick={handler}>9</button>
                <button className='key delete' onClick={handler}>Del</button>
                <button className='key' onClick={handler}>4</button>
                <button className='key' onClick={handler}>5</button>
                <button className='key' onClick={handler}>6</button>
                <button className='key' onClick={handler}>+</button>
                <button className='key' onClick={handler}>1</button>
                <button className='key' onClick={handler}>2</button>
                <button className='key' onClick={handler}>3</button>
                <button className='key' onClick={handler}>-</button>
                <button className='key' onClick={handler}>.</button>
                <button className='key' onClick={handler}>0</button>
                <button className='key' onClick={handler}>/</button>
                <button className='key' onClick={handler}>x</button>
                <button className='key reset' onClick={handler}>reset</button>
                <button className='key equal' onClick={handler}>=</button>
            </div>
        </>
    );
}

export default Calculator;