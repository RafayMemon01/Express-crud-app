// function createPost(e){
//     e.preventDefault()
//     let postTitle = document.querySelector("#title");
//     let postText = document.querySelector("#text");

// }
// document.addEventListener("contextmenu", (e) => {
//     e.preventDefault();
//    }, false);
//    document.addEventListener("keydown", (e) => {
//     if (e.ctrlKey || e.keyCode==123) {
//      e.stopPropagation();
//      e.preventDefault();
//     }
//    });
function createPost(e){
    e.preventDefault();
    let postTitle = document.querySelector('#title')
    let postText = document.querySelector('#text')
    let timeStamp = new Date().toISOString();
    axios.post(`/api/v1/post`,{
        title: postTitle.value,
        text: postText.value,
        timestamp: timeStamp
    })
    .then(function(response) {
        console.log(response.data);
        Swal.fire({
            icon: 'success',
            title: 'Post Added',
            timer: 1000,
            showConfirmButton: false
        });
        renderPost();
    })
    .catch(function(error) {
        // handle error
        console.log(error.data);
        document.querySelector(".result").innerHTML = "error in post submission"
    });
    postTitle.value = ""
    postText.value = ""
}

function renderPost() {
    axios.get(`/api/v1/posts`)
    .then(function(response){
        posts = response.data;
        let postContainer = document.querySelector(".result");
        postContainer.innerHTML = "";
        posts.forEach(function(post){
            let postElement = document.createElement("div");
            postElement.className += " post"
            let time = document.createElement("p")
            time.className += " regards center"
            time.textContent = moment(post.timestamp).fromNow()
            postElement.appendChild(time);
            let titleElement = document.createElement("h2");
            titleElement.textContent = post.title;
            titleElement.className += " scroll"
            postElement.appendChild(titleElement);
            let textElement = document.createElement("p");
                textElement.className += " scroll";
                textElement.textContent = post.text;
                postElement.appendChild(textElement);
                postElement.dataset.postId = post.id;

                let row = document.createElement("div")
                row.className += " space-around"

                let regards = document.createElement("p")
                regards.className += " regards"
                regards.textContent = "Regards! Rafay Memon"
                row.appendChild(regards)

                let edit = document.createElement("i");
                edit.className += " regards bi bi-pencil-fill"
                edit.addEventListener("click",(event)=>{
                    event.preventDefault();
                    let postId = this.parentNode.parentNode.data.postId;
                    editPost(postId);
                });
                row.appendChild(edit);
                
                let del = document.createElement("i")
                del.className += " regards bi bi-trash-fill"
                del.addEventListener("click",(e)=>{
                    e.preventDefault();
                    let postId = this.parentNode.parentNode.dataset.postId;
                    deletePost(postId);
                });
                row.appendChild(del)
                postElement.appendChild(row)
                postContainer.appendChild(postElement)
                });

        })
        .catch(function(error) {
            console.log(error.data);
        });
    
}
deletePost(postId){
    Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonColor: "#212121",
        confirmButtonText: 'Delete',
        confirmButtonColor: "#212121",
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            if (password === '01122334') {
                return axios.delete(`/api/v1/post/${postId}`)
                    .then(response => {
                        console.log(response.data);
                        Swal.fire({
                            icon: 'success',
                            title: 'Post Deleted',
                            timer: 1000,
                            showConfirmButton: false
                        });
                        renderPost();
                    })
                    .catch(error => {
                        console.log(error.data);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to delete post',
                            showConfirmButton: false
                        });
                    });
    }   else{
        return Swal.fire({
            icon: 'error',
            title: 'Invalid Password',
            text: 'Please enter correct password',
            timer: 1000,
            showConfirmButton: false
        });
    }
}
});
}
function editPost(postId) {
    Swal.fire({
        title: 'Enter Password',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonColor: "#212121",
        confirmButtonText: 'Edit',
        confirmButtonColor: "#212121",
        showLoaderOnConfirm: true,
        preConfirm: (password) => {
            if (password === '01122334') {
                // If the password is correct, display an edit form
                axios.get(`/api/v1/post/${postId}`)
                    .then(response => {
                        const post = response.data;
                        Swal.fire({
                            title: 'Edit Post',
                            html: `
                <input type="text" id="editTitle" class="swal2-input" placeholder="Post Title" required>
                <textarea id="editText" class="swal2-input text" placeholder="Post Text" required></textarea>
                `,
                            showCancelButton: true,
                            cancelButtonColor: "#212121",
                            confirmButtonText: 'Edit',
                            confirmButtonColor: "#212121",
                            preConfirm: () => {
                                // Get the updated title and text
                                const editedTitle = document.getElementById('editTitle').value;
                                const editedText = document.getElementById('editText').value;

                                if (!editedTitle.trim() || !editedText.trim()) {
                                    Swal.showValidationMessage('Title and text are required');
                                    return false;
                                }

                                // Make the API call to update the post
                                return axios.put(`/api/v1/post/${postId}`, {
                                        title: editedTitle,
                                        text: editedText
                                    })
                                    .then(response => {
                                        console.log(response.data);
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Post Updated',
                                            timer: 1000,
                                            showConfirmButton: false
                                        });
                                        // If the post was updated successfully, re-render the posts
                                        renderPost();
                                    })
                                    .catch(error => {
                                        console.log(error.data);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Failed to update post',
                                            timer: 1000,
                                            showConfirmButton: false
                                        });
                                    });
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error.data);
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to fetch post',
                            timer: 1000,
                            showConfirmButton: false
                        });
                    });
            } else {
                // If the password is incorrect, display an error message
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Password',
                    text: 'Please enter correct password',
                    showConfirmButton: false
                });
            }
        }
    });
}
document.addEventListener("readystatechange", function() {
    if (document.readyState === "complete") {
        renderPost();
    }
});
    