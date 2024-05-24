const fileInput = document.getElementById('images');
const imageInput = document.querySelector("#image-input");
const imgGroup = document.querySelector('.imgGroup');
const dataGlobal = new DataTransfer();
const middleImgGroup = imgGroup.innerHTML;

const deleteButton = () => {
    const button = document.createElement('button');
    button.classList.add('btn-delete');
    button.classList.add('btn');
    return button;
}

const handleAddImg = (src, index) => {
    const imgPreview = document.querySelector('#render-image');
    const imgPreviewFragment = imgPreview.content.cloneNode(true);
    const imgPreviewElement = imgPreviewFragment.querySelector(".image-render");
    const img = imgPreviewElement.querySelector("img");
    img.src = src;
    imgPreviewElement.setAttribute("id", `img${src.split("/").pop()}`);
    imgPreviewElement.addEventListener('click', () => {
        removeImg(imgPreviewElement.id, index);
    });
    imgPreviewElement.addEventListener('mouseover', () => {
        imgPreviewElement.querySelector(".fa-solid.fa-trash").style.opacity = 0.5;
    }, false);
    imgPreviewElement.addEventListener("mouseout", () => {
        imgPreviewElement.querySelector(".fa-solid.fa-trash").style.opacity = 0;
    }, false);
    return imgPreviewElement;
}

const removeImg = (imgID, index) => {
    const imgPreview = document.querySelector(`#${imgID}`);
    imgGroup.removeChild(imgPreview);
    for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        dataGlobal.items.remove(file);
    }
    fileInput.files = dataGlobal.files;
    console.log(fileInput.files);
}

document.addEventListener('DOMContentLoaded', (event) => {
    fileInput.addEventListener('change', () => {
        for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i];
            dataGlobal.items.add(file);
        }
        fileInput.files = dataGlobal.files;
        console.log(dataGlobal.files);
        if (fileInput.files.length > 0) {
            const files = Array.from(fileInput.files);
            const srcs = files.map(file => URL.createObjectURL(file));
            imgGroup.innerHTML = '';
            srcs.forEach((element, index) => {
                const children = handleAddImg(element, index);
                imgGroup.appendChild(children);
            });
        }
        else {
            imagePreview.src = '#';
            fileLabel.textContent = 'No file selected';
        }
    });
})

