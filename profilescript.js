setupUI()
  const urlParams = new URLSearchParams(window.location.search);
   const id = urlParams.get('userID');



// const id =postId
function getPosts(){ 
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
  .then(function (response) {
    console.log(response.data.data)
   
    const posts = response.data.data
    
     
        document.getElementById("posts").innerHTML= ""
      
    
    for(post of posts){
      let postTitle = ""
  
      // show or hide (edit) button
      let user = getCurrentUser()
      let isMyPost= user !=null && user.id == post.author.id
      let editButtonContent = ""    
      let deleteButtonPost = ""    
      if(isMyPost){
        editButtonContent=`<button id="editPostButton" type="button" class="btn btn-secondary " onclick="editPostButton('${encodeURIComponent(JSON.stringify(post))}')">edit</button>`
        deleteButtonPost=`<button id="deletePost-btn" onclick="deletePostBtn('${encodeURIComponent(JSON.stringify(post))}')" type="button" class="btn btn-danger">delete</button>`
      }
      if(post.title !=null){
        postTitle = post.title
      }
      
      let content = `       
        <div class="card shadow "  >
            <div class="card-header" style="display:flex;justify-content: space-between;">
              <div>
              <img src="${post.author.profile_image}" alt="" style="width: 40px;height: 40px;" class="rounded-circle border border-2">
              <b>@${post.author.username}</b>
              </div>
              <div>
                  ${editButtonContent}
                  ${deleteButtonPost}
              </div>
            </div>
            <div class="card-body" onclick="postIdNummer(${post.id})" style="cursor: pointer;">
              <img src="${post.image}" alt="" class="w-100">
              <h6 style="color: gray;">${post.created_at}</h6>
              <h5>${postTitle}</h5>
              <p>${post.body}</p>
              <hr>
              <div>
                <i class="bi bi-pen"></i>
                <span>
                  (${post.comments_count}) comments</span> 
                <span id="post-tags-${post.id}">
                  <button style="background-color:gray;color:white; border-radius:10px ; border:none">
                         policy 
                   </button>
                  <button style="background-color:gray;color:white; border-radius:10px ; border:none">
                         sport 
                   </button>
                  <button style="background-color:gray;color:white; border-radius:10px ; border:none">
                         entertainment
                   </button>
              </span>
              </div>
            </div>                 
          </div>                       
      `
  
      document.getElementById("posts").innerHTML+=content
  
  
        // let tags = post.tags
        //  document.getElementById(`post-tags-${post.id}`).innerHTML=""
        // for (tag of tags){
  
        //   let content =`        
        //           <button style="background-color:gray; border-radius:10px ; border:none">
        //                 policy 
        //           </button>
        //   `
        //   document.getElementById(`post-tags-${post.id}`)+=content
        // }
  
    }
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  }
  getPosts()
  
function showUser(){
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then(function (response) {
        console.log(response.data.data)
        let userInfo= response.data.data
        document.getElementById("userName-info").innerHTML=""
        
        let content =`
        <h5>${userInfo.email || ""}</h5>
        <h5>${userInfo.name}</h5>
        <h5>${userInfo.username}</h5>

        `
        document.getElementById("userName-info").innerHTML=content
        document.getElementById("postCounts").innerHTML=userInfo.posts_count
        document.getElementById("commentsCounts").innerHTML=userInfo.comments_count
        document.getElementById("userImage").src=userInfo.profile_image
        document.getElementById("name-posts").innerHTML=`${userInfo.username}'s`


    })
}
showUser()
