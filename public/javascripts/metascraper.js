const url = document.querySelector("#linkUrl");

url.addEventListener("paste", (e) => {
  //console.log(e);
  //console.dir(e.target);
  setTimeout(() => {
    pastedValue = e.target.value;
    axios
      .post("/api/get-link-metadata", { pastedValue })
      .then((axiosResp) => {
        console.log(axiosResp);
        let linkTitle = document.querySelector("#linkTitle");
        linkTitle.value = axiosResp.data.title;

        let linkDescription = document.querySelector("#linkDescription");
        linkDescription.value = axiosResp.data.description;

        let contentFrom = document.querySelector("#contentFrom");
        contentFrom.value = axiosResp.data.publisher;

        let thumbnailUrl = document.querySelector("#thumbnailUrl");
        thumbnailUrl.value = axiosResp.data.image;

        let linkImage = document.querySelector("#link-img");
        let img = document.createElement("img");
        img.src = axiosResp.data.image;
        linkImage.innerHTML = "";
        linkImage.style.width = "50px";
        linkImage.style.marginRight = "7px";
        linkImage.style.borderBottom = "3px solid black";
        linkImage.style.borderRadius = "12px";
        linkImage.appendChild(img);
      })
      .catch((err) => err);
  }, 500);
});
