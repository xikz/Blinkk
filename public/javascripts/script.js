document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("linkmee JS imported successfully!");
  },
  false
);

//DRAG AND DROP BETWEEN LINKS
let currentDrag = null;

const ul = document.querySelector(".admin-links");
//ul.innerHTML = `<h1>Help</h1>`;
console.log(ul);
const adminLinks = document.querySelectorAll(".admin-links li");
const instagram = adminLinks[1];
console.log(instagram);

const draggableLinks = document.querySelectorAll(".admin-link");

draggableLinks.forEach((link) => {
  link.addEventListener("dragstart", (e) => {
    currentDrag = link;
    console.log("current drag link id:", link.id);
    // e.target.dataTransfer.setData("text/plain", link.id);
    e.dataTransfer.setData("text/plain", link.id);
  });
});

instagram.addEventListener("dragover", (e) => {
  e.preventDefault();
  instagram.classList.add("drop-zone--over");
});

instagram.addEventListener("dragleave", (e) => {
  e.preventDefault();
  instagram.classList.remove("drop-zone--over");
});

instagram.addEventListener("drop", (e) => {
  e.preventDefault();
  const droppableLinkId = e.dataTransfer.getData("text/plain");
  console.log(e.target.innerText);
  console.log(droppableLinkId);
  console.log(instagram.id);

  const realAdminLinks = [...adminLinks];

  console.log(currentDrag.id);
  console.log(e.target.id);
  const prevIndex = realAdminLinks.findIndex((el) => el.id === currentDrag.id);
  realAdminLinks.splice(prevIndex, 1);
  const currentIndex = realAdminLinks.findIndex(
    (event) => event.id === instagram.id
  );
  realAdminLinks.splice(currentIndex + 1, 0, currentDrag);
  //const newOrder = realAdminLinks.filter((el, _, a) => )

  // console.log(realAdminLinks.map((e) => e.innerHTML));
  //ul.innerHTML = realAdminLinks.join("");
  ul.innerHTML = "";
  realAdminLinks.forEach((el) => {
    ul.appendChild(el);
  });
  instagram.classList.remove("drop-zone--over");
});

// for (draggableLink of draggableLinks) {
//   draggableLink.addEventListener("dragstart", (e) => {
//     console.log(draggableLinks[0]);
//     //e.dataTransfer.setData("text/plain", draggableLink.id);
//   });
// }

//DRAG AND DROP LINK -> COLLECTION

const dropZone = document.querySelector(".drop-zone");

//when dragable link is on top of collection drop-zone
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("drop-zone--over");
});

dropZone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropZone.classList.remove("drop-zone--over");
});

//when dragable link droped in the collection drop-zone
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const droppableLinkId = e.dataTransfer.getData("text/plain");
  const collectionId = e.target.id;
  console.log("collection id:", collectionId);
  console.log(e.target.innerText);
  console.log("droppableLinkId:", droppableLinkId);
  dropZone.classList.remove("drop-zone--over");
});
