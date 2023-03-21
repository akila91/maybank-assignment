export function getTodos(state) {
  const allTodos = state.todosReducer.todos;

  let pagination = {
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} todos`,
    pageSizeOptions: ['1', '2', '5', '10', '25', '50', '100', '250', '500'],
  };

  return {
    name: `Todos`,
    tracker: state.todosReducer.todosTracker,
    timestamp: state.todosReducer.todosTimestamp,
    data: allTodos,
    noRecordMessage: `No Todos Found`,
    pagination: pagination,
  }
}

