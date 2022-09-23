import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import './TodoInsert.css';

// todo 추가, 삭제, 수정을 위한 팝업을 반환하는 컴포넌트
const TodoInsert = ({ onInsertToggle, onInsertTodo, selectedTodo, onRemove, onUpdate }) => {
    // input에 입력되는 값
    const [value, setValue] = useState(""); 

    // input에 입력되는 값을 value에 저장
    const onChange = (e) => {
        setValue(e.target.value);
    };

    // 새로운 todo 추가 시 실행되는 함수
    const onSubmit = (e) => {
        e.preventDefault(); // +버튼 클릭시 자동 새로고침 방지
        onInsertTodo(value);
        onInsertToggle(); // 버튼 클릭 시 폼이 닫아지도록
    };

    // 컴포넌트 최초 렌더링 + []에 있는 selectedTodo 값이 변경되면 실행
    // TextItem에서 text 클릭 시 onChangeSelectedTodo(todo) 실행
    // selectedTodo의 상태가 변화하였으므로 useEffect 실행
    useEffect(() => {
        if (selectedTodo) {
            setValue(selectedTodo.text);
        }
    }, [selectedTodo]); 
    // 의존성을 위해 인자로 받아온 값을 배열에 넣어줌->selectedTodo 값이 변경되면 실행되도록 하기 위해

    return (
        <div>
            {/* 배경을 누르면 팝업창이 꺼져야하므로 onInsertToggle 실행 */}
            <div className="background">
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
        </div>
    );
};

export default TodoInsert;