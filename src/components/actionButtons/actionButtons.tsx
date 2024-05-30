import './styles.css';

interface Props {
    /**
     * Событие добавить новый таймер
     * @returns 
     */
    readonly eventAddTimer: () => void;
    /**
     * Событие удалить последний таймер
     * @returns 
     */
    readonly eventRemoveTimer: () => void;
}

/**
 * Кнопки добавить/удалить таймер
 * @param props 
 * @returns 
 */
export default function ActionButtons(props: Props) {
    return (
        <div className='actionButtonsContainer'>
            <button onClick={props.eventAddTimer}>Add timer</button>
            <button onClick={props.eventRemoveTimer}>Remove</button>
        </div>
    );
}