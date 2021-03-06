import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useElevatorController } from '../providers';
import { ElevatorStatus } from '../types';

/**
 * Displays elevator's control panel with floors buttons and current
 * elevator's status.
 */
export const ControlPanel: React.FC = observer(() => {
  const elevatorController = useElevatorController();

  const pressButtonHandler = (floorNumber: number): (() => void) => {
    return () => {
      elevatorController.pressElevatorPanelButton(floorNumber);
    };
  };

  return (
    <div className="control-panel">
      <div className="control-panel__buttons">
        {elevatorController.floorsNumbers.map((floorNumber) => (
          <button
            className="control-panel__button"
            data-open={
              elevatorController.currentFloor === floorNumber &&
              (elevatorController.status === ElevatorStatus.DoorsOpen ||
                elevatorController.status === ElevatorStatus.Idling)
            }
            data-current={floorNumber === elevatorController.currentFloor}
            data-in-queue={elevatorController.isFloorButtonInQueue(floorNumber)}
            key={floorNumber}
            onClick={pressButtonHandler(floorNumber)}
          >
            {floorNumber}
          </button>
        ))}
      </div>

      <p
        className={classNames('control-panel__status', {
          'control-panel__status_operating':
            elevatorController.status !== ElevatorStatus.Idling,
        })}
      >
        {elevatorController.statusLabel}
      </p>
    </div>
  );
});
