import { FilterTypes } from '../types/FilterTypes';
import { Todo } from '../types/Todo';
import cn from 'classnames';

interface Props {
  selectedFilterType: FilterTypes;
  onSelectedFilterType: (type: FilterTypes) => void;
  todos: Todo[];
}

export const TodoFooter: React.FC<Props> = ({
  selectedFilterType,
  onSelectedFilterType,
  todos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.length === 1
          ? `${todos.length} item left`
          : `${todos.length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectedFilterType === 'All',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onSelectedFilterType(FilterTypes.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectedFilterType === 'Active',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onSelectedFilterType(FilterTypes.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectedFilterType === 'Completed',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onSelectedFilterType(FilterTypes.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
