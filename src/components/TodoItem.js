import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./TodoItem.css";

// 각각의 todoitem을 반환하는 컴포넌트
const TodoItem = ({ todo, onCheckToggle, onInsertToggle, onChangeSelectedTodo }) => {  // TodoList에서 todo객체를 받아옴
    const { id, text, checked } = todo;  // 객체 구조 분해를 이용해서 todo객체의 각 요소를 추출
    return (
        <div className="TodoItem">
            {/* 각 todo의 checked 상태가 true이면 checked 클래스 추가 */}
            <div className={`content ${ checked ? 'checked' : ''}`}> 
                {checked ? (
                    <MdCheckBox onClick={() => {onCheckToggle(id);}} />
                ) : (
                    <MdCheckBoxOutlineBlank onClick={() => {onCheckToggle(id);}} />
                )}   {/* check가 되어있는지 여부에 따라 아이콘 다르게 적용 */}
                <div className="text" 
                    onClick={() => {onChangeSelectedTodo(todo); onInsertToggle();}}>{text}
                </div>
            </div>
        </div>
    )    
};

export default TodoItem;