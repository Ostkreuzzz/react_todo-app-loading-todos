/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { getTodos } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessages } from './types/ErrorTypes';
import { FilterTypes } from './types/FilterTypes';

import { getVisibleTodos } from './utils/getVisibleTodos';
import { handleError } from './utils/handleError';

import { TodoHeader } from './TodoHeader/TodoHeader';
import { TodoList } from './TodoList/TodoList';
import { TodoFooter } from './TodoFooter/TodoFooter';
import { ErrorPannel } from './ErrorPannel/ErrorPannel';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedFilterType, setSelectedFilterType] = useState<FilterTypes>(
    FilterTypes.ALL,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>(
    ErrorMessages.NONE,
  );

  const filteredTodos = getVisibleTodos(todos, selectedFilterType);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError(setErrorMessage, ErrorMessages.LOAD_FAIL));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />
        {!!todos.length && (
          <>
            <TodoList todos={todos} />
            <TodoFooter
              selectedFilterType={selectedFilterType}
              onSelectedFilterType={setSelectedFilterType}
              todos={filteredTodos}
            />
          </>
        )}
      </div>
      <ErrorPannel errorMessage={errorMessage} />
    </div>
  );
};
