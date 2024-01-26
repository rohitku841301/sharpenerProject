const form = document.querySelector("form");
function handleFormSubmit(event) {
  event.preventDefault();
  let email = event.target.email.value;

  axios
    .get(
      "https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData"
    )
    .then((res) => {
      let allUserLength = res.data;
      console.log(allUserLength);
      let flag = true;
      for (let i = 0; i < allUserLength.length; i++) {
        if (allUserLength[i].email === email) {
          if (allUserLength[i]._id !== null) {
            flag = false;
            let userId = allUserLength[i]._id;
            console.log(userId);
            axios.put(
              `https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData/${userId}`,
              {
                name: event.target.username.value,
                email: event.target.email.value,
                tel: event.target.phone.value,
              }
            ).then((res)=>{
                console.log(res)
                console.log("successfully updated")
            })
            .catch((error)=>{
                console.log(error);
            })
          }
        }
      }
      if (flag) {
        console.log("sjn");
        let userDetails = {
          name: event.target.username.value,
          email: event.target.email.value,
          tel: event.target.phone.value,
        };

        axios
          .post(
            "https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData",
            userDetails
          )
          .then((res) => {
            console.log(res.data);
            showUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        localStorage.setItem(email, JSON.stringify(userDetails));
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function getDataFromUser() {}

function deleteUserDetail(event) {
  const parent = event.target.parentNode;
  const li = parent.getElementsByTagName("li")[1];
  console.log(li.innerText);
  axios
    .get(
      "https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData"
    )
    .then((res) => {
      // console.log(res.data);
      const email = res.data;
      for (let i = 0; i < email.length; i++) {
        if (email[i].email === li.innerText) {
          const id = res.data[i]._id;
          axios
            .delete(
              `https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData/${id}`
            )
            .then((res) => {
              console.log(res);
              console.log("successfully deleted");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //   localStorage.removeItem(li.innerText);

  parent.remove();
}

function editUserDetail(event) {
  const parent = event.target.parentNode;
  if (event.target.classList.contains("edit")) {
    const input = document.querySelectorAll("input");
    for (let i = 0; i < input.length; i++) {
      input[i].value = parent.getElementsByTagName("li")[i].innerText;
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/427bf718d6264f0d86bee22b57db0e52/bookingData"
    )
    .then((res) => {
      const newObj = res.data;
      for (let i = 0; i < newObj.length; i++) {
        showUser(newObj[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });

  //   Retrieve data from local Storage

  //   const localStorageObj = localStorage;
  //   const localStorageObjKeys = Object.keys(localStorageObj);
  //   for(let i=0;i<localStorageObjKeys.length;i++){
  //       const eachUser = localStorageObjKeys[i];
  //       const newObj = JSON.parse(localStorage.getItem(eachUser));
  //       showUser(newObj);
  //   }
});

function showUser(newObj) {
  const entries = Object.entries(newObj);

  const ul = document.createElement("ul");
  entries.forEach(([key, value]) => {
    if (key !== "_id") {
      const li = document.createElement("li");
      li.innerText = value;
      ul.append(li);
    }
  });
  const btn = document.createElement("button");
  btn.innerText = "delete";
  btn.setAttribute("type", "click");
  btn.setAttribute("onclick", "deleteUserDetail(event)");

  const editBtn = document.createElement("button");
  editBtn.innerText = "edit";

  editBtn.setAttribute("type", "click");
  editBtn.setAttribute("class", "edit");
  editBtn.setAttribute("onclick", "editUserDetail(event)");
  ul.append(btn);
  ul.append(editBtn);
  form.after(ul);

  const input = document.querySelectorAll("input");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}
