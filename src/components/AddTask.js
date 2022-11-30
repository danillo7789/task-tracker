import { useState } from 'react';

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        //e.preventDefault so it doesnt submit to a page or to prevent the page from refreshing when d form is submitted

        if (!text) {
            alert('Please add a task');
            return;
        }

        onAdd({ text, day, reminder })
        //to clear the form to be able to add another task
        setText('')
        setDay('')
        setReminder(false)


    }


    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task'
                    value={text} onChange={(e) => setText(e.target.value)} />
            </div>

            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time'
                    value={day} onChange={(e) => setDay(e.target.value)} />
            </div>

            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' value={reminder} checked={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>


    )
}

export default AddTask;