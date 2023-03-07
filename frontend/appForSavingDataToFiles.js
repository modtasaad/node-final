
let courses=[]

async function displayAllCourse(){
    courses=await getAllCourses();
    let html = courses.map(course=> `
    <tr>
        <td>${course.Name}</td>
        <td>${course.Time}</td>
        <td><button onclick="editCourseBtn('${course.Id}')" >Edit</button></td>
        <td><button onclick="deleteCourseBtn('${course.Id}')" >Delete</button></td>
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
    let course = courses.find(x=>x.Id==id);
    document.getElementById("CourseNameEdit").value = course.Name;
    document.getElementById("CourseIdEdit").value = course.Id;
    document.getElementById("CourseTimeEdit").value = course.Time;
}


async function saveCourseBtn(){
    let course = {};
    course.Name=document.getElementById("CourseNameEdit").value;
    course.Time=document.getElementById("CourseTimeEdit").value;
    course.Id=document.getElementById("CourseIdEdit").value;
    await updateCourse(course);
    displayAllCourse();
}

async function deleteCourseBtn(id){
    await deleteCourse(id);
    displayAllCourse();
}

displayAllCourse();