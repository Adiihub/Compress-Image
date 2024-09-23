const inputImage = document.getElementById('img');
let showImageButton = document.getElementById('showimgbtn');

inputImage.addEventListener('change', (e) => {
    const orifiles = e.target.files;

    const imgElementContainer = document.getElementById('imageContainer');
    imgElementContainer.innerHTML = '';
    const linkCont = document.getElementById('downloadLinks');
    linkCont.innerHTML = '';

    for (const index in orifiles) { 
        const file = orifiles[index];
        console.log("Selected file:", file);  //Displaying original files

        let originalUrl = URL.createObjectURL(file);
        const imgEle = document.createElement('img');
        imgEle.src = originalUrl;
        imgEle.style.maxWidth = '300px';
        imgElementContainer.appendChild(imgEle);

        const options = {
            maxSizeMB: 1,
        };

        imageCompression(file, options).then((compressedFile) => {
            console.log('Compressed Image', compressedFile);

            const compressedImageUrl = URL.createObjectURL(compressedFile);
            const compresImgElement = document.createElement('img');
            compresImgElement.src = compressedImageUrl;
            compresImgElement.style.maxWidth = '300px';
            imgElementContainer.appendChild(compresImgElement);

            const downLink = document.createElement('a');
            downLink.href = compressedImageUrl; 
            downLink.download = `compressed_${file.name}`;
            downLink.innerText = 'Download Compressed Image';
            downLink.style.display = 'block';

            linkCont.appendChild(downLink);
        });
    }
});
