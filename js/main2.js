let taskInput = document.getElementById('task-input'); // 유저가 값을 입력하는 input 창
let addButton = document.getElementById('add-button'); // + 버튼 추출
let taskBoard = document.getElementById('task-board');
let tabs = document.querySelectorAll('.tab');
let underLine = document.getElementById('under-line');
let taskList = []; // 할 일 목록을 저장하는 배열
let currentTab = 'all';

// 랜덤 ID 생성 함수
function randomIDGenerate() {
    return '_' + Math.random().toString(36).substring(2, 9);
}

// 할 일 목록을 화면에 출력하는 함수
let renderTaskList = () => {
    taskBoard.innerHTML = ""; // 기존 내용 초기화
    let filteredList = [];

    if (currentTab === 'all') {
        filteredList = taskList;
    } else if (currentTab === 'ongoing') {
        filteredList = taskList.filter(task => !task.isComplete);
    } else if (currentTab === 'done') {
        filteredList = taskList.filter(task => task.isComplete);
    }

    filteredList.forEach(task => {
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
        isComplete: false
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

// 탭 클릭 시 언더라인 이동 및 필터링
tabs.forEach(tab => {
    tab.addEventListener('click', function(event) {
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        currentTab = event.target.id;
        moveUnderLine(event.target);
        renderTaskList();
    });
});

// 언더라인 이동 함수
function moveUnderLine(target) {
    underLine.style.left = target.offsetLeft + 'px';
    underLine.style.width = target.offsetWidth + 'px';
}

// 초기 렌더링
window.onload = function() {
    renderTaskList();
    let activeTab = document.querySelector('.tab.active');
    moveUnderLine(activeTab);
};
