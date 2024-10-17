import { FilterTypes } from '../types/FilterTypes';
import cn from 'classnames';

interface Props {
  selectedFilterType: FilterTypes;
  onSelectedFilterType: (type: FilterTypes) => void;
  activeTodosCount: number;
}

export const TodoFooter: React.FC<Props> = ({
  selectedFilterType,
  onSelectedFilterType,
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount === 1
          ? `${activeTodosCount} item left`
          : `${activeTodosCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterTypes).map(value => (
          <a
            key={value}
            href={value === FilterTypes.ALL ? `#/` : `#/${value.toLowerCase()}`}
            className={cn('filter__link', {
              selected: selectedFilterType === value,
            })}
            data-cy={`FilterLink${value}`}
            onClick={() => onSelectedFilterType(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!!activeTodosCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
