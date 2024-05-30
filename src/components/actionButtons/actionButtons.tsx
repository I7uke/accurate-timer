import './styles.css';

interface Props {
    readonly eventAddTimer: () => void;
    readonly eventRemoveTimer: () => void;
}

export default function ActionButtons(props: Props) {
    return (
        <div className='actionButtonsContainer'>
            <button onClick={props.eventAddTimer}>Add timer</button>
            <button onClick={props.eventRemoveTimer}>Remove</button>
        </div>
    );
}