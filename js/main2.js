// 유저가 값을 입력한다.
// + 버튼을 클릭하면, 할일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나오게 된다.
// 전체 탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById('task-input'); // 유저가 값을 입력하는 input 창
let addButton = document.getElementById('add-button'); // + 버튼 추출
let taskBoard = document.getElementById('task-board');
let taskList = []; // 할 일 목록을 저장하는 배열

// 랜덤 ID 생성 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

// 할 일 목록을 화면에 출력하는 함수
let renderTaskList = () => {
    taskBoard.innerHTML = ""; // 기존 내용 초기화
    taskList.forEach(task => {
        let taskItem = document.createElement('div');
        taskItem.classList.add('task');
        if (task.isComplete) {
            taskItem.classList.add('true');
        } else {
            taskItem.classList.add('false');
        }
        taskItem.innerHTML = `<div class="line_el">${task.taskContent}</div>
                            <div>
                                <button class="check-button btn btn-primary ${task.isComplete ? 'true' : 'false'}" onclick="toggleComplete('${task.id}')">${task.isComplete ? '<span class="true"><i class="fa-solid fa-check"></i></span>' : '<span class="false"><i class="fa-solid fa-rotate-left"></i></span>'}</button>
                                <button class="delete-button btn btn-secondary" onclick="deleteTask('${task.id}');"><i class="fa-solid fa-trash"></i></button>
                            </div>`;
        taskBoard.appendChild(taskItem);
    });
};

// + 버튼 클릭 시 함수 실행 : onClickAdd
let onClickAdd = () => {
    let taskValue = taskInput.value; // 사용자가 입력한 값 추출
    if (taskValue === "") {
        alert("할 일을 입력하세요!");
        taskInput.focus();
        return;
    }

    let task = { // 객체 생성해주기
        id: randomIDGenerate(),
        taskContent: taskValue,
        isComplete: true
    }

    taskList.push(task); // 할 일 목록에 추가
    renderTaskList(); // 할 일 목록을 다시 렌더링

    // 입력 필드 초기화
    taskInput.value = "";
};

addButton.addEventListener('click', onClickAdd); // + 버튼 클릭시 onClickAdd 함수 실행

// 완료 상태 토글 함수 추가
function toggleComplete(id) {
    taskList = taskList.map(task => {
        if (task.id === id) {
            task.isComplete = !task.isComplete;
        }
        return task;
    });
    renderTaskList();
}

// 삭제 기능 추가
function deleteTask(id) {
    taskList = taskList.filter(task => task.id !== id);
    renderTaskList();
}
