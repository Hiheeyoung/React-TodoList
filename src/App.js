import React, { useState } from 'react';
import './App.css';
import Template from './components/Template';
import TodoList from './components/TodoList';
import { MdAddCircle} from 'react-icons/md';
import TodoInsert from './components/TodoInsert';

let nextId = 4; // 함수 내에 있으면 리렌더링할때마다 초기값으로 돌아가므로 바깥으로 빼줌
const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);

  // todo-list 배열
  const [todos, setTodos] = useState([ // 할일 목록이 담긴 객체 배열 선언
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    },
  ]);

  // 토글 상태 변경으로 팝업이 뜸
  const onInsertToggle = () => { 
    if (selectedTodo) { 
      setSelectedTodo(null);
    }
    setInsertToggle(prev => !prev);
  };

  // 새로운 todo 객체를 todos배열에 추가  
  const onInsertTodo = (text) => {
    if (text === "" || text.trim().length === 0) {  // 입력값이 없거나 공백만 있다면
      return alert('할 일을 입력해주세요.');
    } else {
      const todo = { 
        id: nextId,
        text,
        checked: false
      }
      setTodos(todos => todos.concat(todo)); 
      // todos를 받아서 todos에 input에 입력한 새로운 값(todo)를 todos에 추가해줌
      // 불변성 유지를 위해 concat함수를 사용하여 새로운 배열 생성
      nextId++;
    }
  };

  // 체크박스에 체크/언체크 함수
  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, checked: !todo.checked} : todo)))
    // map함수를 이용하여 각 객체의 id와 TodoItem에서 인자로 받은 id가 일치하면 
    // 해당 todo 객체의 checked를 반대값으로, 불일치면 todo 객체 값 그대로
  };

  // TodoItem에서 각 item 클릭 시 todo를 매개변수로 보내어 아래 함수 실행
  const onChangeSelectedTodo = (todo) => {
    // slectedTodo상태를 변경함으로써 TodoInsert에서 실행되는 함수가 달라짐
    setSelectedTodo(todo);
  }; 

  // todo 삭제 함수
  const onRemove = id => {
    onInsertToggle(); // 토글 닫기
    setTodos(todos => todos.filter(todo => todo.id !== id));
    // filter() : 조건이 true이면 요소 유지, false이면 제거
  };

  // todo 업데이트 함수
  const onUpdate = (id, text) => {
    onInsertToggle(); // 토글 닫기
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, text} : todo))
    // todo원소는 그대로 갖고 가면서 text만 바꿔주기
  };

  return (
        <Template todos={todos}> {/* 오늘의 할일을 객체배열의 길이로 표현 */}
           <TodoList todos={ todos } onCheckToggle={onCheckToggle} onInsertToggle={onInsertToggle} 
                     onChangeSelectedTodo={onChangeSelectedTodo} />
           <div className='add-todo-button' onClick={onInsertToggle}><MdAddCircle /></div>
           {/* insertToggle이 true이면 TodoInsert 컴포넌트 호출 */}
           {insertToggle && <TodoInsert 
                              selectedTodo={selectedTodo}
                              onInsertToggle={onInsertToggle}
                              onInsertTodo={onInsertTodo}
                              onRemove={onRemove} onUpdate={onUpdate} />} {/* insertToggle이 true인 경우에만 TodoInsert 컴포넌트 사용 */}
        </Template>
  )
}

export default App;
