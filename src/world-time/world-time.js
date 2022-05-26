import TimezoneForm from "./timezone-form";
import {useEffect, useState} from "react";
import {v4 as uuidV4} from "uuid";
import Watch from "./watch";

function WorldTime(props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [watches, setWatches] = useState([]);
    const [watchesRun, setWatchesRun] = useState(false);

    useEffect(() => {
        if (!watchesRun) {
            return;
        }

        const intervalID = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalID);
        }
    }, [watchesRun]);

    const addWatch = ({name, offset}) => {
        const newWatch = {offset, name, id: uuidV4()};
        setWatches(prevState => [...prevState, newWatch]);
        setWatchesRun(true)
    }

    const deleteWatch = (id) => {
        setWatches(prevState => {
            const newState = prevState.filter(watch => watch.id !== id);
            if (newState.length <= 0) {
                setWatchesRun(false);
            }
            return newState;
        });
    }

    return (
        <>
            <TimezoneForm onSubmit={addWatch}/>
            <div className={'wt-watch-container'}>
                {watches.map(watch =>
                    <div key={watch.id}>
                        <Watch {...watch} refDate={currentDate} onDeleteClick={deleteWatch}/>
                    </div>
                )}
            </div>
        </>
    )
}

export default WorldTime;
