import TimezoneForm from "./timezone-form";
import {useEffect, useState} from "react";
import {v4 as uuidV4} from "uuid";
import Watch from "./watch";

function WorldTime(props) {
    const [watches, setWatches] = useState([]);
    const [refDate, setRefDate] = useState(null);
    const [ticker, setTicker] = useState(null);

    const addWatch = ({name, offset}) => {
        setRefDate(new Date());
        createTicker();
        const watch = {offset, name, id: uuidV4()};
        setWatches(prevState => [...prevState, watch]);
    }

    const deleteWatch = (id) => {
        setWatches(prevState => prevState.filter(watch => watch.id !== id));
    }

    useEffect(() => {
        if (watches.length === 0) {
            clearTicker();
        }
    }, [watches]);

    const createTicker = () => {
        if (!ticker) {
            setTicker(setInterval(() => {
                console.log('tick');
                setRefDate(new Date());
            }, 1000));
        }
    }

    const clearTicker = () => {
        setTicker(prevValue => prevValue ? clearInterval(prevValue) : null);
    }

    return (
        <>
            <TimezoneForm onSubmit={addWatch}/>
            <div className={'wt-watch-container'}>
                {watches.map(watch =>
                    <div key={watch.id}>
                        <Watch {...watch} refDate={refDate} onDeleteClick={deleteWatch}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default WorldTime;
