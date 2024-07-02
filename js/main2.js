// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나오게 된다.
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input'); // 유저가 값을 입력하는 input 창

let addButton = document.getElementById('add-button'); // + 버튼 추출
let taskBoard = document.getElementById('task-board')
let taskList = [];

// + 버튼 클릭 시 함수 실행 : onClickAdd
let onClickAdd = () => {
    let taskValue = taskInput.value; // 사용자가 입력한 값 추출
    //console.log('text');
    taskList.push(taskValue);
    //console.log(taskList);

    let taskItem = document.createElement('div');
    //taskItem.textContent = taskValue;
    taskItem.classList.add('task');
    taskItem.innerHTML=`<div>${taskValue}</div>
                    <div>
                        <button class="check-button">Check</button>
                        <button class="delete-button">Delete</button>
                    </div>`;

    taskBoard.appendChild(taskItem);
};

addButton.addEventListener('click', onClickAdd); // + 버튼 클릭시 onClickAdd 함수 실행

//삭제 기능 추가!!
taskBoard.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        let taskItem = event.target.closest('.task');
        taskBoard.removeChild(taskItem);
    }
});

