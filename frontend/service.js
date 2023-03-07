let Errors = {
    'Course Name Should Be At Least 3 Characters':'الكور لا يقل عن ثلاثه احرف'
}

async function customFetch(url,options){
    if(!options){
        options={}
    }
    if(!options.headers){
        options.headers={};
    }
    options.headers.sessionId=localStorage.sessionId;
    

    let res = await fetch(url,options);
    let resJson = await res.json();
    if(!resJson.Success){
        //alert(Errors[resJson.Error]);
        alert(resJson.Error);
    }
    return resJson;
}


async function getAllCourses(){
    let res = await customFetch("/courses");
    return res.Data;
}

async function addNewCourse(course){
    let res = await customFetch("/courses",{
        method:"POST",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(course)
    })
    return res;
}


async function updateCourse(course){
    let res = await customFetch("/courses",{
        method:"Put",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(course)
    })
    return res;
}

async function deleteCourse(id){
    let res = await customFetch("/courses/"+id,{
        method:"Delete"
    });

    return res;
}





async function getAllUsers(){
    let res = await customFetch("/users");
    return res.Data;
}

async function addNewUser(user){
    let res = await customFetch("/users",{
        method:"POST",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(user)
    })
    return res;
}


async function updateUser(user){
    
    let res = await customFetch("/users",{
        method:"Put",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(user)
    })
    return res;
}

async function deleteUser(id){
    let res = await customFetch("/users/"+id,{
        method:"Delete"
    });

    return res;
}


async function login(user){
    let res = await customFetch("/users/login",{
        method:"POST",
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify(user)
    })
    return res.Data.sessionId;
}
