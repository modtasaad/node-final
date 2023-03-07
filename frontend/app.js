
let courses=[]

let users=[]

async function displayAllCourse(){
    courses=await getAllCourses();
    let html = courses.map(course=> `
    <tr>
        <td>${course.Name}</td>
        <td>${course.Time}</td>
        <td><button onclick="editCourseBtn('${course._id}')" >Edit</button></td>
        <td><button onclick="deleteCourseBtn('${course._id}')" >Delete</button></td>
    </tr>
    `).join("\n");


    document.getElementById("coursesTable").innerHTML=html;
} 


async function addNewCourseBtn(){
    let course = {};
    course.Name=document.getElementById("CourseName").value;
    course.Time=document.getElementById("CourseTime").value;
    await addNewCourse(course);
    displayAllCourse();
} 


async function editCourseBtn(id){
    let course = courses.find(x=>x._id==id);
    document.getElementById("CourseNameEdit").value = course.Name;
    document.getElementById("CourseIdEdit").value = course._id;
    document.getElementById("CourseTimeEdit").value = course.Time;
}


async function saveCourseBtn(){
    let course = {};
    course.Name=document.getElementById("CourseNameEdit").value;
    course.Time=document.getElementById("CourseTimeEdit").value;
    course._id=document.getElementById("CourseIdEdit").value;
    await updateCourse(course);
    displayAllCourse();
}

async function deleteCourseBtn(id){
    await deleteCourse(id);
    displayAllCourse();
}

displayAllCourse();









async function displayAllUsers(){
    users=await getAllUsers();
    let html = users.map(user=> `
    <tr>
        <td>${user.Name}</td>
        <td>${user.Age}</td>
        <td><button onclick="editUserBtn('${user._id}')" >Edit</button></td>
        <td><button onclick="deleteUserBtn('${user._id}')" >Delete</button></td>
    </tr>
    `).join("\n");


    document.getElementById("usersTable").innerHTML=html;
} 


async function addNewUserBtn(){
    let user = {};
    user.Name=document.getElementById("UserName").value;
    user.Age=document.getElementById("UserAge").value;
    user.Password=document.getElementById("UserPassword").value;
    await addNewUser(user);
    displayAllUsers();
} 


async function editUserBtn(id){
    let user = users.find(x=>x._id==id);
    document.getElementById("UserNameEdit").value = user.Name;
    document.getElementById("UserIdEdit").value = user._id;
    document.getElementById("UserAgeEdit").value = user.Age;
}


async function saveUserBtn(){
    let user = {};
    user.Name=document.getElementById("UserNameEdit").value;
    user.Age=document.getElementById("UserAgeEdit").value;
    user._id=document.getElementById("UserIdEdit").value;
    user.Password=document.getElementById("UserPasswordEdit").value;
    await updateUser(user);
    displayAllUsers();
}

async function deleteUserBtn(id){
    await deleteUser(id);
    displayAllUsers();
}

async function loginBtn(){
    let user = {};
    user.Name=document.getElementById("UserNameLogin").value;
    user.Password=document.getElementById("UserPasswordLogin").value;

    let sessionId = await login(user);
    localStorage.sessionId = sessionId;
}

displayAllUsers();