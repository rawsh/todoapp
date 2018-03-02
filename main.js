function idGen() {
    return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
}

function addTask(text) {
    currtasks = JSON.parse(localStorage.getItem("tasks"));
    num = currtasks.length;
    currtasks.push({
        checked: false, 
        text: text,
        id: idGen()
    });
    localStorage.setItem("tasks", JSON.stringify(currtasks));

    renderNthTask(num, currtasks);
    document.getElementById("new-task").value = "";
}

function removeTask(elem) {
    document.getElementById(elem.id.substring(2)).remove();
    currtasks = JSON.parse(localStorage.getItem("tasks"));
    currtasks.splice(elem.dataset.number, 1);
    localStorage.setItem("tasks", JSON.stringify(currtasks));
}

function updateData(num, key, val) {
    currtasks = JSON.parse(localStorage.getItem("tasks"));
    currtasks[num][key] = val;
    localStorage.setItem("tasks", JSON.stringify(currtasks));
}

function editText() {
    text = this.innerHTML;
    this.setAttribute("contenteditable", true);
    this.focus();

    this.oncontextmenu = "";

    this.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            text = this.innerHTML;
            num = parseInt(this.dataset.number);
            updateData(num, "text", text);
            this.setAttribute("contenteditable", false);
            this.oncontextmenu = function() {
              removeTask(this);
              return false;
            };
        }

        return key != 13;
    });
}

function editCheck() {
    checked = this.checked;
    num = parseInt(this.dataset.number);
    updateData(num, "checked", checked);
}

function renderNthTask(i, tasks) {
    tasklist = document.getElementById("task-list");
    t = tasks[i];

    var div = document.createElement("div");
    var check = document.createElement("input");
    var span = document.createElement("span");
    var text = document.createTextNode(t.text);

    check.type = "checkbox";
    check.checked = t.checked;
    check.id = "c-" + t.id
    span.id = "s-" + t.id
    div.id = t.id

    div.dataset.number = i;
    span.dataset.number = i;
    check.dataset.number = i;

    check.classList.add("checkbox");
    div.classList.add("task-container");
    span.classList.add("task-span");

    span.onclick = editText;
    check.onclick = editCheck;

    span.oncontextmenu = function() {
      removeTask(this);
      return false;
    };

    span.appendChild(text);
    div.appendChild(check);
    div.appendChild(span);

    tasklist.appendChild(div);
}

function renderTasks(tasks) {
    for (i = 0; i < tasks.length; i++) {
        renderNthTask(i, tasks);
    }

    document.getElementById("new-task").addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            text = this.value;
            addTask(text);
        }

        return key != 13;
    });
}

localtasks = localStorage.getItem("tasks");
if (localtasks === null) {
    tasks =
    [
        {
            checked: false, 
            text: "first item",
            id: idGen()
        },
        {
            checked: true, 
            text: "second item",
            id: idGen()
        },
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks);
} else {
    tasks = JSON.parse(localtasks);
    renderTasks(tasks);
}

window.onload = function() {
    var img1920 = new Image();
    img1920.onload = function () {
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url(backgrounds/ocean/1920x1080.jpg)';
    };
    img1920.src = 'backgrounds/ocean/1920x1080.jpg';
}
