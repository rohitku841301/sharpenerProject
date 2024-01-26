
const form = document.querySelector("form");
function handleFormSubmit(event){
    event.preventDefault();
    let email = event.target.email.value;
    let userDetails = {
        name:event.target.username.value,
        email:event.target.email.value,
        tel:event.target.phone.value
    }

    axios.post("https://crudcrud.com/api/30508dae56a84753afb1bf4680ce653d/bookingData",userDetails)
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })

    localStorage.setItem(email, JSON.stringify(userDetails));
    const entries = Object.entries(userDetails);
    const ul = document.createElement("ul");
    entries.forEach(([key,value])=>{
        const li = document.createElement("li");
        li.innerText = value;
        ul.append(li);
    })
    const btn = document.createElement("button");
    btn.innerText="delete"
    btn.setAttribute("type","click");
    btn.setAttribute("onclick","deleteUserDetail(event)");

    const editBtn = document.createElement("button");
    editBtn.innerText="edit"
    
    editBtn.setAttribute("type","click");
    editBtn.setAttribute("class","edit");
    editBtn.setAttribute("onclick","deleteUserDetail(event)");
    ul.append(btn);
    ul.append(editBtn);
    form.after(ul); 
    
    const input = document.querySelectorAll("input");
    for(let i=0;i<input.length;i++){
        input[i].value=""
    }

}

function deleteUserDetail(event){
    const parent = event.target.parentNode;
    const li = parent.getElementsByTagName("li")[1];
    localStorage.removeItem(li.innerText)
    parent.remove();
    if(event.target.classList.contains("edit")){
        const input = document.querySelectorAll("input");
    for(let i=0;i<input.length;i++){
        input[i].value=parent.getElementsByTagName("li")[i].innerText 
        }
    }
}










    
