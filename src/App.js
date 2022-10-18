import { useState } from 'react'
import { CARS } from './data/car'
import './App.css'

function App() {
  const [state, setState] = useState(CARS)

  function onChange({ e, index }) {
    const shiftKeyPressing = e.nativeEvent.shiftKey
    const { selected } = state[index]
    const newState = [...state]

    if (shiftKeyPressing) {
      for (let i = index; i >= 0; i--) {
        if (newState[i].selected !== selected) break
        newState[i].selected = !selected
      }
    } else {
      newState[index].selected = !selected
    }
    setState(newState)
  }

  function toggleAllCheckboxes(e) {
    const { checked } = e.target
    setState((prevState) =>
      prevState.map((el) => ({
        ...el,
        selected: checked,
      }))
    )
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                value={'all'}
                onChange={toggleAllCheckboxes}
              />
            </td>
            <td>編號</td>
            <td>狀態</td>
          </tr>
        </thead>
        <tbody>
          {state.map(({ name, number, selected, disabled }, index) => (
            <tr key={number}>
              <td>
                {!disabled && (
                  <input
                    type="checkbox"
                    value={name}
                    checked={selected}
                    onChange={(e) => onChange({ e, index })}
                  />
                )}
              </td>
              <td>{number}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
