const imageUpload = document.getElementById('imageUpload');

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
  ]).then(start);

function start() {
    //overlay canvas to draw the rectangle on the image
    //positioning the container where the canvas will be
    const container = document.createElement('div');
    container.style.position = 'relative';
    document.body.append(container);
    //
    document.body.append('Loaded');
    //
    imageUpload.addEventListener('change', async () => {
        //taking file uploaded and converting it to an image that can be usable to the face api
        const image = await faceapi.bufferToImage(imageUpload.files[0]);
        //
        //showing the image
        //document.body.append(image);
        container.append(image);
        //creating the canvas
        const canvas = faceapi.createCanvasFromMedia(image);
        //append canvas to the container, and also image to the container so that 
        //they are both absolutely positioned on top of each other, perfectly in the relative container
        container.append(canvas);
        //display of diff image
        const displaySize = { width: image.width, height: image.height };
        // resize canvas to the same size as our image
        faceapi.matchDimensions(canvas, displaySize);

        // detect all faces, get the face landmarks, and descriptors that will allow us to draw the boxes ard the face
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

        //
        document.body.append(detections.length);
        //display detections to the user
        //resized our detections
        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        //for each detection draw a box
        resizedDetections.forEach(detection => {
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, { label: 'result.toString()' });
            drawBox.draw(canvas);
        });

    });
    
}

//parsed each labeled images
function loadLabeledImages() {
    const labels = ['marie', 'nancy'];
    //create a promises to load the diff images and detect the images in them
    return Promise.all(
        //go thro all of our labels (go thro all of our idividual labels)
        labels.map(async label => {
            // loop thro the images in each folder
        });
    );
}