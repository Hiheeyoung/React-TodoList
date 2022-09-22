import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import './TodoInsert.css';

const TodoInsert = ({ onInsertToggle, onInsertTodo, selectedTodo, onRemove, onUpdate }) => {
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault(); // +버튼 클릭시 자동 새로고침 방지
        onInsertTodo(value);
        setValue("");
        onInsertToggle(); // 버튼 클릭 시 폼이 닫아지도록
    };

    // 컴포넌트가 처음 렌더링 되면 어떤 것을 실행할지 결정
    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.text);
        }
    }, [selectedTodo]); // 의존성을 위해 인자로 받아온 값을 배열에 넣어줌

    return (
        <div>
            {/* 팝업창, 배경을 누르면 팝업창이 꺼져야하므로 onInsertToggle 실행 */}
            <div className="background" onClick={onInsertToggle}></div>
            <form onSubmit={selectedTodo ? () => {onUpdate(selectedTodo.id, value)} : onSubmit}> 
            {/* selectedTodo가 있으면 수정모드, 없으면 새로 작성모드 */}
                <input placeholder="please type" value={value} onChange={onChange}></input>
                {/* selectedTodo가 있으면 수정버튼, 없으면 submit(+) 버튼 */}
                {selectedTodo ? (
                    <div className="rewrite">
                        <TiPencil onClick={() => {onUpdate(selectedTodo.id, value)}} />
                        {/* 현재 선택되어있는 todo(selectedTodo에서 id를 추출) */}
                        <TiTrash onClick={()=> {onRemove(selectedTodo.id)}} /> 
                    </div>
                ) : (
                    <button type="submit">
                        <MdAddCircle />
                    </button>
                )}
            </form>
        </div>
    );
};

export default TodoInsert;