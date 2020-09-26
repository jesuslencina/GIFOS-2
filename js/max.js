//!VARIABLES
var title = sessionStorage.getItem("title");
var author = sessionStorage.getItem("author");
var url = sessionStorage.getItem("url");

//!SELECTORS
const img = document.querySelector(".gifo");
const titleParagraph = document.querySelector(".title");
const authorParagraph = document.querySelector(".user");

//!EXECUTION
img.src = url;
titleParagraph.innerHTML = title;
authorParagraph.innerHTML = author;