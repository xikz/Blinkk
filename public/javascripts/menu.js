/** hamburger menu **/

const menuIcon = document.querySelector(".hambMenu");
const navbar = document.querySelector(".hambNav");
console.log(menuIcon);

menuIcon.addEventListener("click", () => {
  console.log("CLICK");
  navbar.classList.toggle("change");
});
