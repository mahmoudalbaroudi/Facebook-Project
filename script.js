// infinite scroll
        let currentPage=1  
        let lastPage=1  
        window.addEventListener("scroll", ()=>{
          const endOfPage = window.innerHeight + window.scrollY >= document.body.scrollHeight;
          console.log(endOfPage && currentPage < lastPage)
          if(endOfPage && currentPage < lastPage){
              currentPage= currentPage+1
              getPosts(false,currentPage)
          }
        });
// infinite scroll//


setupUI()
function userClicked(userID){
 
  window.location=`profile.html?userID=${userID}`
  
}
  




function getPosts(reload=true,page=1 ){  // parameters for  pagination
  toggleLoader(true)
  axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=15&page=${page}`)
.then(function (response) {
  toggleLoader(false)
  // handle success
  const posts = response.data.data
  lastPage=response.data.last_page
    if(reload){
      document.getElementById("posts").innerHTML= ""
    }
  
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
            <div onclick="userClicked(${post.author.id})">
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


      let tags = post.tags
       document.getElementById(`post-tags-${post.id}`).innerHTML=""
      for (tag of tags){

        let content =`        
                <button style="background-color:gray; border-radius:10px ; border:none">
                      policy 
                </button>
        `
        document.getElementById(`post-tags-${post.id}`)+=content
      }

  }
})
.catch(function (error) {
  // handle error
  console.log(error);
})
}
getPosts()


logIN()

function postIdNummer(postID){
  
  window.location=`postDetails.html?postID=${postID}`
  
  
}

