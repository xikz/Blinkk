axios.get("/api").then((resp) => {});

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("linkmee JS imported successfully!");
  },
  false
);

//DRAG AND DROP BETWEEN LINKS
let currentDrag = null;

let ul = document.querySelector(".admin-links");
//ul.innerHTML = `<h1>Help</h1>`;

let adminLinks = document.querySelectorAll(".admin-links li");

const draggableLinks = document.querySelectorAll(".admin-link");

draggableLinks.forEach((link) => {
  link.addEventListener("dragstart", (e) => {
    currentDrag = link;
    console.log("current drag link id:", link.id);
    // e.target.dataTransfer.setData("text/plain", link.id);
    e.dataTransfer.setData("text/plain", link.id);
  });

  link.addEventListener("dragover", (e) => {
    e.preventDefault();
    link.classList.add("drop-zone--over");
  });

  link.addEventListener("dragleave", (e) => {
    e.preventDefault();
    link.classList.remove("drop-zone--over");
  });

  link.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppableLinkId = e.dataTransfer.getData("text/plain");

    const realAdminLinks = [...adminLinks];

    const prevIndex = realAdminLinks.findIndex(
      (el) => el.id === currentDrag.id
    );

    realAdminLinks.splice(prevIndex, 1);
    const currentIndex = realAdminLinks.findIndex(
      (event) => event.id === link.id
    );
    realAdminLinks.splice(currentIndex + 1, 0, currentDrag);
    ul.innerHTML = "";
    realAdminLinks.forEach((el) => {
      ul.appendChild(el);
    });

    ul = document.querySelector(".admin-links");
    adminLinks = document.querySelectorAll(".admin-links li");

    const newOrderLinks = [...adminLinks].map((e) => e.id);

    axios.post("/api/new-order", newOrderLinks).then((resp) => {
      console.log(resp);
    });
    link.classList.remove("drop-zone--over");
  });
});

// instagram.addEventListener("dragover", (e) => {
//   e.preventDefault();
//   instagram.classList.add("drop-zone--over");
// });

// instagram.addEventListener("dragleave", (e) => {
//   e.preventDefault();
//   instagram.classList.remove("drop-zone--over");
// });

// instagram.addEventListener("drop", (e) => {
//   e.preventDefault();
//   const droppableLinkId = e.dataTransfer.getData("text/plain");
//   console.log(e.target.innerText);
//   console.log(droppableLinkId);
//   console.log(instagram.id);

//   const realAdminLinks = [...adminLinks];

//   console.log(currentDrag.id);
//   console.log(e.target.id);
//   const prevIndex = realAdminLinks.findIndex((el) => el.id === currentDrag.id);
//   realAdminLinks.splice(prevIndex, 1);
//   const currentIndex = realAdminLinks.findIndex(
//     (event) => event.id === instagram.id
//   );
//   realAdminLinks.splice(currentIndex + 1, 0, currentDrag);
//   //const newOrder = realAdminLinks.filter((el, _, a) => )

//   // console.log(realAdminLinks.map((e) => e.innerHTML));
//   //ul.innerHTML = realAdminLinks.join("");
//   ul.innerHTML = "";
//   realAdminLinks.forEach((el) => {
//     ul.appendChild(el);
//   });
//   instagram.classList.remove("drop-zone--over");
// });

// for (draggableLink of draggableLinks) {
//   draggableLink.addEventListener("dragstart", (e) => {
//     console.log(draggableLinks[0]);
//     //e.dataTransfer.setData("text/plain", draggableLink.id);
//   });
// }

//DRAG AND DROP LINK -> COLLECTION

const dropZones = document.querySelectorAll(".drop-zone");

//when dragable link is on top of collection drop-zone
dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drop-zone--over");
  });
});

dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drop-zone--over");
  });
});

//when dragable link droped in the collection drop-zone
dropZones.forEach((dropZone) => {
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppableLinkId = e.dataTransfer.getData("text/plain");
    const collectionId = e.target.id;
    console.log("collection id:", collectionId);
    //console.log(e.target.innerText);
    console.log("droppableLinkId:", droppableLinkId);
    dropZone.classList.remove("drop-zone--over");
    currentDrag.style.display = "none";
    axios
      .post("/api/link-to-collection", { collectionId, droppableLinkId })
      .then((resp) => {
        console.log(resp);
      });
  });
});
