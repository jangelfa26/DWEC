let imageFiles = [];

document.getElementById('file-input').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const files = event.target.files;
    imageFiles = [];

    const previewContainer = document.getElementById('preview-container');
    previewContainer.innerHTML = '';

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            imageFiles.push(file);

            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img);
            };
            reader.readAsDataURL(file);
        }
    }

    console.log('Archivos seleccionados:', imageFiles.length);
}

document.getElementById('process-button').addEventListener('click', processImages);

function processImages() {
    const watermarkText = document.getElementById('watermark-text').value;
    const maxWidth = parseInt(document.getElementById('max-width').value) || 800;
    const outputFormat = document.getElementById('output-format').value;

    const zip = new JSZip();
    let imagesProcessed = 0;

    const downloadLinks = document.getElementById('download-links');
    downloadLinks.innerHTML = '';

    imageFiles.forEach(file => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
        };

        img.onload = function () {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const ratio = img.width / img.height;
            if (img.width > maxWidth) {
                canvas.width = maxWidth;
                canvas.height = maxWidth / ratio;
            } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.textAlign = 'center';
            ctx.fillText(watermarkText, canvas.width / 2, canvas.height - 30);

            canvas.toBlob((blob) => {
                zip.file(`editada-${file.name.split('.')[0]}.${outputFormat.split('/')[1]}`, blob);

                const url = URL.createObjectURL(blob);
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = `editada-${file.name.split('.')[0]}.${outputFormat.split('/')[1]}`;
                downloadLink.textContent = `Descargar ${file.name}`;
                downloadLinks.appendChild(downloadLink);

                imagesProcessed++;

                if (imagesProcessed === imageFiles.length) {
                    zip.generateAsync({ type: 'blob' }).then(function (content) {
                        const zipFile = new Blob([content], { type: 'application/zip' });
                        const zipURL = URL.createObjectURL(zipFile);

                        const zipDownloadLink = document.createElement('a');
                        zipDownloadLink.href = zipURL;
                        zipDownloadLink.download = 'imagenes_procesadas.zip';
                        zipDownloadLink.textContent = 'Descargar Todas las Imágenes (ZIP)';
                        downloadLinks.appendChild(zipDownloadLink);
                    });
                }
            }, outputFormat, 0.9);
        };

        reader.readAsDataURL(file);
    });
}
