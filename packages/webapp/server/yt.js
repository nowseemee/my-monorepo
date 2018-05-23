const Firestore = require('@google-cloud/firestore');
const Storage = require('@google-cloud/storage');
const ytdl = require('ytdl-core');
const config = require('./config');

const storage = new Storage();
const bucket = storage.bucket(config.bucketName);

const firestore = new Firestore({
    projectId: config.projectId,
});

const handleUpload = (response, uploadData) => {
    storage
        .bucket(bucket.name)
        .file(uploadData.fileName)
        .makePublic()
        .then(() => {
            firestore
                .doc(
                    'users/' +
                        uploadData.userId +
                        '/videos/' +
                        uploadData.videoId
                )
                .set(uploadData);

            return uploadData;
        })
        .then((data) => response.status(200).json(data))
        .catch((error) => {
            console.log(error);
            response.status(500);
        });
};

module.exports = (request, response) => {
    const videoId = request.query.v;
    const fileName = videoId + '.mp4';
    const userId = request.query.u;
    const uploadData = {
        fileName,
        userId,
        videoId,
        bucketName: bucket.name,
        timestamp: new Date().getTime(),
        url: 'https://storage.googleapis.com/' + bucket.name + '/' + fileName,
    };
    const video = ytdl('http://www.youtube.com/watch?v=' + request.query.v);
    const stream = video.pipe(bucket.file(fileName).createWriteStream());

    video.on('response', (response) => {
        uploadData.fileSize = +response.headers['content-length'];
    });

    video.on('info', (i) => {
        Object.assign(uploadData, {
            thumbnail: i.thumbnail_url,
            title: i.title,
        });
    });
    stream.on('error', () => console.log('error'));
    stream.on('finish', () => {
        handleUpload(response, uploadData);
    });
};
