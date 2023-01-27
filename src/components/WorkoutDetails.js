import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { MdOutlineDelete } from 'react-icons/md';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const data = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: data })
    }
  }

  return <div className='workout-details'>
    <h4>{workout.title}</h4>
    <p><strong>Load(kg): </strong>{workout.load}</p>
    <p><strong>Reps: </strong>{workout.reps}</p>
    <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    <span onClick={handleClick}><MdOutlineDelete /></span>
  </div>
}

export default WorkoutDetails;