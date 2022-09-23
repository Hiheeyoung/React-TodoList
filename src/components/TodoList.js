import React from "react";
import TodoItem from "./TodoItem";
import './TodoList.css';

// todoitem이 포함된 todolist 툴을 반환하는 컴포넌트
const TodoList = ({ todos, onCheckToggle, onInsertToggle, onChangeSelectedTodo }) => {  // todos는 할 일 목록이 담긴 배열
    return (
        <div className="TodoList"> 
            { todos.map(todo => (
                <TodoItem todo={ todo } key={todo.id} onCheckToggle={onCheckToggle} 
                    onInsertToggle={onInsertToggle} onChangeSelectedTodo={onChangeSelectedTodo}/> 
                // 각각의 자식 요소들은 고유한 key를 가져야함
                // list를 렌더링 할 때는 반드시 key를 넣어줘야함(여기서는 todo.id가 unique값임)
                ))}
        </div>
    );
}

export default TodoList;