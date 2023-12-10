function logIN(){
    document.getElementById("in-login").addEventListener("click",()=>{
        let userName = document.getElementById("recipient-name").value
        let password = document.getElementById("recipient-password").value
         
        toggleLoader(true)
        axios.post('https://tarmeezacademy.com/api/v1/login', {
          "username": userName,
          "password": password
      })
      .then(function (response) {
        
        const token = response.data.token
        localStorage.setItem("token",token)
        localStorage.setItem("user", JSON.stringify(response.data.user))

        
        
        let myModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        myModal.hide();
        

        showAlert("logged in successfully","success")
        
        setupUI()
        

      })
      .catch(function (error) {
        showAlert(error.response.data.message,"danger");
      }).finally(()=>{
        toggleLoader(false)
      })
    })
  }

  function registerBtn(){
    
    let name = document.getElementById("register-name").value  
    let userName = document.getElementById("register-userName").value
    let password = document.getElementById("register-password").value
    let userImage = document.getElementById("register-image").files[0]
    const formData = new FormData();
    formData.append("name",name)
    formData.append("username",userName)
    formData.append("password",password)
    formData.append("image",userImage)
    
    toggleLoader(true)
    axios.post('https://tarmeezacademy.com/api/v1/register',formData)
  .then(function (response) {

    const token = response.data.token
    localStorage.setItem("token",token)
    localStorage.setItem("user", JSON.stringify(response.data.user))

    
    
    let myModal = bootstrap.Modal.getInstance(document.getElementById('register-exampleModal'));
    myModal.hide();
    

    showAlert("New User Registerd Successfully","success")

    setupUI()

  })
  .catch(function (error) {
    let message = error.response.data.message

    showAlert(message,"danger");
  }).finally(()=>{
    
    toggleLoader(false)
  })
  
}

function logOutBtn(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    
    
    showAlert("logged out successfully","success")
    
    setupUI()
  }

function setupUI(){

const logInDiv=document.getElementById("logged-in-div")
const logoutDiv=document.getElementById("logout-div")
const addPostBtn= document.getElementById("addPost-btn")

const token = localStorage.getItem("token")
if(token == null){
    
    logInDiv.style.setProperty("display","flex","important")
    logoutDiv.style.setProperty("display","none","important")
    addPostBtn.style.setProperty("display","none","important")
    
    
}else{
    logInDiv.style.setProperty("display","none","important")
    logoutDiv.style.setProperty("display","flex","important")
    addPostBtn.style.setProperty("display","flex","important")
    
    const user = getCurrentUser()
    document.getElementById("userName-field").innerHTML=user.username
    document.getElementById("userImage-field").src=user.profile_image

}
}
function setupUI1(){
  const addCommentContainer= document.getElementById("addComment-input")
  const token = localStorage.getItem("token")

  if(token == null){
    
    addCommentContainer.style.setProperty("display","none","important")
}else{
    addCommentContainer.style.setProperty("display","flex","important")
   
}}

function getCurrentUser(){
    let user = null
    const storageUser=localStorage.getItem("user")
    if(storageUser!=null){
      user = JSON.parse(storageUser)
    }
    return user
  }

  function showAlert(customMessage,type="success"){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        const appendAlert = (message, type) => {
          const wrapper = document.createElement('div')
          wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert" id="autoHideAlert">`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
          ].join('')
          // alertPlaceholder.innerHTML = '';
          alertPlaceholder.append(wrapper)
                  setTimeout(() => {
                  document.getElementById('autoHideAlert').remove();
            }, 3000);
        }   
            appendAlert(customMessage, type)  
  }

  function editPostButton(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    document.getElementById("post-id-input").value=post.id
    document.getElementById("edit-create-post-btn").innerHTML="Update"
    
    document.getElementById("post-modal-title").innerHTML="Edit Post"
    document.getElementById("fileUploadModal-title").value=post.title
    document.getElementById("fileUploadModal-body").value=post.body
    
    let postModal = new bootstrap.Modal(document.getElementById("fileUploadModal"),{} )
    postModal.toggle()
    }
    
    
    function createPostButton(){
      document.getElementById("edit-create-post-btn").innerHTML="create "
      document.getElementById("post-modal-title").innerHTML="Create Post"
      document.getElementById("fileUploadModal-title").value=""
      document.getElementById("fileUploadModal-body").value=""
      let postModal = new bootstrap.Modal(document.getElementById("fileUploadModal"),{} )
      postModal.toggle()
    }
    
    function deletePostBtn(postObject){
      let post = JSON.parse(decodeURIComponent(postObject))
    
      document.getElementById("delete-post-id-input").value=post.id
    
      let deleteModal = new bootstrap.Modal(document.getElementById("deletePostModal"),{} )
      deleteModal.toggle()
      }
    
    
        function confirmPostDelete(){
          let postId=document.getElementById("delete-post-id-input").value
          const token = localStorage.getItem("token")
        
          axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`,{
            headers:{
              "Authorization": `Bearer ${token}`,
              "Content-Type":"application/json"
            }
          })
          .then(function (response) {
            let myModal = bootstrap.Modal.getInstance(document.getElementById('deletePostModal'));
            myModal.hide();
            showAlert("You have deleted post Successfully","success")
            getPosts()
          })
      .catch(function (error) {
        let message=error.response.data.message
        showAlert(message,"danger");
      });
    
        }

        function addPost(){
          let postId =document.getElementById("post-id-input").value
        
          isCreate = postId==null || postId==""
          
        
        
          let title = document.getElementById("fileUploadModal-title").value  
          let body = document.getElementById("fileUploadModal-body").value
          let image = document.getElementById("fileUploadModal-image").files[0]
          const token = localStorage.getItem("token")
          
          const formData = new FormData();
          formData.append("title",title)
          formData.append("body",body)
          formData.append("image",image)
        
          if(isCreate){
            axios.post('https://tarmeezacademy.com/api/v1/posts',formData ,{
              headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"multipart/form-data"
              }
            })
            .then(function (response) {
              let postId = response.data.data.id
              
              let myModal = bootstrap.Modal.getInstance(document.getElementById('fileUploadModal'));
              myModal.hide();
              
              showAlert("You have added post Successfully","success")
            
              getPosts()
            
            })
            .catch(function (error) {
              let message=error.response.data.message
              showAlert(message,"danger");
            });
          }else{
            formData.append("_method","put")
            axios.post(`https://tarmeezacademy.com/api/v1/posts/${postId}`,formData ,{
              headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"multipart/form-data"
              }
            })
            .then(function (response) {
              let postId = response.data.data.id
              
              let myModal = bootstrap.Modal.getInstance(document.getElementById('fileUploadModal'));
              myModal.hide();
              
              showAlert("You have edited post Successfully","success")
            
              getPosts()
            
            })
            .catch(function (error) {
              let message=error.response.data.message
              showAlert(message,"danger");
            });
          }
        
         
         
        }

        function profileClicked(){
          const user = getCurrentUser()
          const   userId = user.id
          window.location=`profile.html?userID=${userId}`
        }
        function toggleLoader(show=true){
          if(show){
            document.getElementById("loader").style.visibility="visible"
          }else{
            document.getElementById("loader").style.visibility="hidden"
            
          }
          }
       

  
