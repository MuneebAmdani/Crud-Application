const apiURL='https://66f91c8a2a683ce97310ee52.mockapi.io/api/v1/post';

function fetchPosts(){
    fetch(apiURL)
    .then(response=>response.json())
    .then(data=>displayData(data))  
    .catch(error=> console.log('error',error))
}
fetchPosts();

function displayData(posts){
    const postsDiv=document.getElementById("posts");
    postsDiv.innerHTML="";

    posts.forEach(post => {

    const postDiv=document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML=` <div class="post-header">
                        <img src=${post.avatar} alt="Avatar">
                        <div>
                            <h3>${post.name}</h3>
                            <small>${post.createdAt}</small>
                        </div>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <div class="actions">
                        <button class="edit-btn" onclick="updatePost(${post.id})">Edit</button>
                        <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
                    </div>`
                    postsDiv.appendChild(postDiv)    
                });

}

// -----------------------create-post------------------------

document.getElementById("create-post").addEventListener('submit',function(e){
e.preventDefault()
const name=document.getElementById("name").value;
const title=document.getElementById("title").value;
const avatar=document.getElementById("avatar").value;
const body=document.getElementById("body").value;
const newPost={
    name:name,
    title:title,
    avatar:avatar,
    body:body,
    createdAt:new Date().toISOString()
}
// console.log(newPost);
fetch(apiURL,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newPost)
})
.then(response=>response.json())
.then(data=>console.log(data))
fetchPosts();
document.getElementById("create-post-form").reset()
})
.catch(error=>console.log(error))


// ---------------------------delete-post-----------------------------


function deletePost(id){
    fetch(`${apiURL}/${id}`,{
        method:'DELETE'
    }
    )
    .then((response)=>{
if(response.ok){
    return response.json()
    console.log("response",response);
}
})
    .then(data=>{
        // console.log(data);
        alert(`${data.name} "successfully deleted"`);
        fetchPosts();
    })  
    .catch(error=> console.log('error',error))
}


// ---------------------update-post---------------------------

function updatePost(id){
    fetch(`${apiURL}/${id}`)
    .then((response)=>response.json())
    .then((post)=>{
        console.log("post",post);
        document.getElementById("create-post").style.display="none";
        document.getElementById("update-post").style.display="block";
        document.getElementById("update-post-form").name.value=post.name;
        document.getElementById("update-post-form").title.value=post.title;
        document.getElementById("update-post-form").avatar.value=post.avatar;
        document.getElementById("update-post-form").body.value=post.body;


    })
    .catch((error)=>console.log('error',error));

    document.getElementById("update-post-form").addEventListener('submit',function(e){
        e.preventDefault();
            console.log("i am here",id);
        
            const name=document.getElementById("update-post-form").name.value;
        const title=document.getElementById("update-post-form").title.value;
        const avatar=document.getElementById("update-post-form").avatar.value;
        const body=document.getElementById("update-post-form").body.value;
        
        const updateData={
            name:name,
            title:title,
            avatar:avatar,
            body:body,
            createdAt:new Date().toISOString()
        };
        fetch(`${apiURL}/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updateData)
        })
        .then(response=>response.json())
        .then(data=>{
            alert(`${data.name} successfully update`);
            fetchPosts();
            document.getElementById("create-post").style.display="block";
            document.getElementById("update-post").style.display="none";
        })
        .catch(error=>console.log(error))
        })
        window.onload=function(){
            fetchPosts();
        }
        console.log("data",name,title,avatar,body);
        
}


// -------------------------update-function----------------------

