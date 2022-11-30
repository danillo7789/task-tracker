import Task from './Task';

const Tasks = ({ tasks, onDelete, doubleClick }) => {

    return(
        <>
            {tasks.map((eachTask) => (
                <Task task={eachTask}
                key={eachTask.id}
                onDelete={onDelete}
                doubleClick={doubleClick}
                />
            ))}
        </>
    );
};

export default Tasks;