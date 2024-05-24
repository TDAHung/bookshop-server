const modal = document.getElementById("myModal");
const btns = document.querySelectorAll(".delete-btn");
const cancel = document.querySelector("#close-modal");
const link = document.querySelector("#confirm-modal");

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        link.href = btn.getAttribute('href-button');
    })
})

cancel.onclick = function () {
    modal.classList.remove('active');
    link.href = "";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('active');
        link.href = "";
    }
}
