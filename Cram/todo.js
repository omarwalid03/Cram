
//if input box == empty //
//and you press add it will 
//display message you must write a task 
//else -> creates a list element --> then storing in li 
// then add li in innerhtml then display by lis container 




const InputBox=document.getElementById("input-box");
const list=document.getElementById("list");
function addtask(){
    if(InputBox.value==''){
        alert("you must write a task")
    }
    else{
        let li=document.createElement("li");
        li.innerHTML=InputBox.value;
        list.appendChild(li);
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    InputBox.value="";
    saveData();

}
/// click function to cross out task --> 
list.addEventListener("click",function(e){
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName==="SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
},false);

//data store for checklist 
function saveData(){
    localStorage.setItem("data",list.innerHTML);
}

function showTask(){
    list.innerHTML=localStorage.getItem("data");
}
showTask();


let timer;
let seconds;
let isTimerRunning = false;

function startPomodoro() {
    if (!isTimerRunning) {
        const studyDuration = parseInt(document.getElementById('studyDuration').value, 10) * 60 || 0;
        const breakDuration = parseInt(document.getElementById('breakDuration').value, 10) * 60 || 0;
        const numRounds = parseInt(document.getElementById('numRounds').value, 10) || 1;

        seconds = studyDuration;
        isTimerRunning = true;

        timer = setInterval(updateTimer, 1000);

        function updateTimer() {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            document.getElementById('pomodoro-display').innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

            if (seconds === 0) {
                numRounds--;

                if (numRounds === 0) {
                    clearInterval(timer);
                    isTimerRunning = false;
                    alert('Pomodoro session completed!');
                } else {
                    seconds = breakDuration;
                    alert('Take a break!');
                }
            } else {
                seconds--;
            }
        }
    }
}

function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isTimerRunning = false;
    document.getElementById('pomodoro-display').innerText = '';
    document.getElementById('studyDuration').value = '';
    document.getElementById('breakDuration').value = '';
    document.getElementById('numRounds').value = '';
}


// Function to add a task to the to-do list
function addTask2() {
    var taskInput = document.getElementById("input-box");
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value));

    // Check if there's a session name and update the title
    var sessionName = $("#sessionName").val();
    if (sessionName) {
        $("#sessionTitle").text(sessionName);
    }

    ul.appendChild(li);
    taskInput.value = "";
}

// jQuery function to handle the Enter key for adding tasks
$(document).ready(function () {
    $("#input-box").keypress(function (e) {
        if (e.which === 13) {
            addTask2();
        }
    });

    // Additional jQuery function to handle the Add button click
    $("#addButton").click(function () {
        addTask2();
    });
});


function saveToFile() {
    var content = document.getElementById('textArea').value;

    // Create a Blob with the content
    var blob = new Blob([content], { type: 'text/plain' });

    // Create a temporary link and trigger a click event to download the file
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'textFile.txt';
    link.click();
}