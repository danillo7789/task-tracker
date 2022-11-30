import Button from './Button';

const Header = ({ title, showTasks, toggleBtn }) => {
    return (
        <div className='header'>
            <h1>{title}</h1>
            <Button color ={toggleBtn ? 'red' : 'green'} text={toggleBtn ? 'Close' : 'Add'} onClick={showTasks} />
        </div>
    );
};

Header.defaultProps = {
    title: 'Task Tracker',
}

export default Header;