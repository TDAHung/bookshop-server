const fileInput = document.getElementById('images');
const fileLabel = document.querySelector('.file-label');
const imageInput = document.querySelector("#image-input");
const dataGlobal = new DataTransfer();
const imgGroup = document.querySelector('.imgGroup');
const previewImg = document.querySelector('.files-edit');

const uploadFiles = files => {
    dataGlobal.clearData();
    dataGlobal.items.add(files[0]);

    const imageTemplate = document.querySelector('#render-image');
    const imageFragment = imageTemplate.context.cloneNode(true);
    const imageElement = imageFragment.querySelector('.image-render');

    imgPreviewElement.addEventListener('click', () => {
        removeImg(imgPreviewElement.id, index);
    });
    imgPreviewElement.addEventListener('mouseover', () => {
        imgPreviewElement.querySelector(".fa-solid.fa-trash").style.opacity = 0.5;
    }, false);
    imgPreviewElement.addEventListener("mouseout", () => {
        imgPreviewElement.querySelector(".fa-solid.fa-trash").style.opacity = 0;
    }, false);

   
}

fileInput.addEventListener('change', () => {
    fileInput.files = dataGlobal.files;
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
            imageElement.src = reader.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        imageElement.src = '#';
        fileLabel.textContent = 'No file selected';
    }
    
    uploadFiles(fileInput.files);
});

window.addEventListener('DOMContentLoaded', () => {
    const initialFiles = [];
    initialFiles.push({ url: previewImg.value, name: previewImg.file_name })
    const filesToUpload = initialFiles.map(img => fetch(img.url).then(response => response.blob()));
    Promise.all(filesToUpload)
        .then(blobs => {
            const fileObjects = blobs.map((blob, index) => new File([blob], `${initialFiles[index].name}`))
            uploadFiles(fileObjects);
        })
        .catch(error => {
            console.error('Failed to fetch or process initial files:', error);
        });
});
