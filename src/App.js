
import './App.css';
import { useEffect, useState } from 'react';


let _ = require('lodash')
function App() {

  const data = {
    // "United States": "Washington, D.C.",
    // "Canada": "Ottawa",
    // "Mexico": "Mexico City",
    // "Brazil": "Brasília",
    // "Argentina": "Buenos Aires",
    // "United Kingdom": "London",
    // "Germany": "Berlin",
    // "France": "Paris",
    // "Italy": "Rome",
    // "Spain": "Madrid",
    "Russia": "Moscow",
    "China": "Beijing",
    "Japan": "Tokyo",
    "India": "New Delhi",
    "Australia": "Canberra",
    // "Egypt": "Cairo",
    // "Nigeria": "Abuja",
    // "Saudi Arabia": "Riyadh",
    // "Turkey": "Ankara",
    // "South Korea": "Seoul"
  };

  const [displayData, setDisplayData] = useState([])
  const [selectedOption, setSelectedOption] = useState([])
  const [counter, setCounter] = useState(0)
  const [highlightclass, setHighlightClass] = useState(undefined)

  useEffect(function onMount() {
    const temp_data = Object.entries(data).flat()
    let optionsToDisplay = _.shuffle(temp_data)
    setDisplayData(optionsToDisplay)

    return () => {
      setCounter(0)
    }
  }, [])

  const handleSelection = (e) => {
    setSelectedOption([...selectedOption, (e.target.textContent)])
    setCounter(counter + 1)
  }

  const nextTurn = () => {
    setCounter(0)
    setSelectedOption([])
  }

  useEffect(function counterData() {
    if (counter >= 2) {
      const firstElement = selectedOption[0]
      const secondElement = selectedOption[1]
      if ((data[firstElement] === secondElement) || (data[secondElement] === firstElement)) {
        const index1 = displayData.indexOf(firstElement)
        const index2 = displayData.indexOf(secondElement)
        setHighlightClass(true)
        setTimeout(() => {
          setDisplayData(prevItems => prevItems.filter((item, index) => (index !== index1) && (index !== index2)))
          nextTurn()
        }, 1000)
      }
      else {
        setHighlightClass(false)
        setTimeout(() => {
          console.log("Data not matching")
          nextTurn()
        }, 1000)
      }
    }
    else {
      console.log("haven't selected data enough", selectedOption)
    }
  }, [selectedOption])

  return (
    <div className="App">
      <h1 className='text-center font-semibold m-10 text-4xl text-cyan-700'> Game Time!</h1>
      <div className='flex flex-row mx-32 p-8 flex-wrap justify-center'>
        {displayData.map((data, index) => {
          const isSelected = selectedOption.includes(data);
          return (
            <button key={index}
              onClick={handleSelection}
              className={`border-2 m-2 rounded-lg p-2 ${isSelected ? "border-blue-600" : "border-gray-800"} 
              ${isSelected && counter === 2 ? highlightclass ? "border-green-500" : "border-red-500" : ""}`}
            >
              {data}
            </button>
          )
        }
        )}
      </div>
      <div className='text-3xl text-red-700 font-semibold'>
        {displayData.length === 0 ? "Congratulations! You won" : ""}
      </div>
    </div >
  );
}

export default App;

