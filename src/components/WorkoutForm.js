import { useState } from 'react';
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

function WorkoutForm() {
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('') /* let the default value be string and not number */
  const [reps, setReps] = useState('') /* let the default value be string and not number */
  const [error, setError] = useState(null)
  const { workouts, dispatch } = useWorkoutsContext()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (!response.ok) {
      setError(data.message)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      console.log('New Workout Added => ', data)
      dispatch({ type: 'CREATE_WORKOUT', payload: data })
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>

      <label>
        <span>Exercise Title:</span>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      </label>

      <label>
        <span>Load(in kg):</span>
        <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} />
      </label>

      <label>
        <span>Reps:</span>
        <input type="number" onChange={e => setReps(e.target.value)} value={reps} />
      </label>

      <button>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm;