function Watch(props) {
    const {offset, name, id, refDate, onDeleteClick} = props;

    const formatTime = (offset, refDate) => {
        const d = refDate;
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * offset));
    }

    const deleteClickHandler = (e) => {
        onDeleteClick(id);
    }
    return (
        <>
            <div>{name}</div>
            <div>{formatTime(offset, refDate).toLocaleTimeString()}</div>
            <button onClick={deleteClickHandler}>Delete</button>
        </>
    )
}

export default Watch;
