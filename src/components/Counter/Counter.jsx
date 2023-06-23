import { useState } from 'react';

const Counter = () => {
    const [ counter, setCounter ] = useState(0)
    const handleClick = (updatedValue) => {
        setCounter(updatedValue)
    }
    return (
        <>
        <p>{counter}</p>
        <button onClick={() => handleClick(counter + 1)}>add</button>
        </>
    )
}

export default Counter