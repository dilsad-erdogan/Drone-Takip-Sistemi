import '../../../ui/panel.css';

const droneUpdate = () => {
  const submitEvent = (event) => {
    event.preventDefault();
  }

  return (
    <div className='topPanel'>
      <div className='top'>
        <h2>Drone Update Page</h2>
      </div>

      <div className='addPanel'>
        <form action='' className='addForm' onSubmit={submitEvent}>
          <input type='text' placeholder='Drone Battery Health'></input>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default droneUpdate