import React from "react";
import './Template.css';

const Template = ({children, todos}) => {
    // todo의 checked가 false인 항목만 undonTasks에 담기
    const undoneTasks = todos.filter(todo => !todo.checked);
    // 오늘 날짜
      const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long'});

    return (
        <div className="Template">
            <div className="title">Todo List({todos.length})
            <h3 className="today">{dateString}</h3>
            <div className="today">{dayName}</div>
                <div className="undoneTasks">남은 할 일: {undoneTasks.length}개</div>
            </div>
            <div>{children}</div>
        </div>
    )
}

export default Template;