import {useRef} from "react";

function TimezoneForm(props) {
    const nameInpRef = useRef();
    const offsetInpRef = useRef();
    const { onSubmit } = props;

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmit({
            name: nameInpRef.current.value,
            offset: offsetInpRef.current.value,
        });
    }

    return (
        <form className={'wt-form'} onSubmit={onSubmitHandler}>
            <div className={'wt-form-element'}>
                <label className={'wt-form-label'} htmlFor={'zoneName'}>Название</label>
                <input className={'wt-form-input'} name={'zoneName'} ref={nameInpRef}
                    type={"text"} maxLength={20} minLength={2}/>
            </div>
            <div className={'wt-form-element'}>
                <label className={'wt-form-label'} htmlFor={'zoneOffset'}>Временная зона</label>
                <input className={'wt-form-input'} name={'zoneOffset'} ref={offsetInpRef}
                    type={"number"} min={-12} max={12} step={0.5}/>
            </div>
            <div className={'wt-form-element'}>
                <button className={'wt-form-button'}>Добавить</button>
            </div>
        </form>
    )
}

export default TimezoneForm;
