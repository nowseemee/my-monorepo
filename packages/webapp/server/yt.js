const os = require('os');
const path = require('path');
const fs = require('fs');
const Firestore = require('@google-cloud/firestore');
const Storage = require('@google-cloud/storage');
const ytdl = require('ytdl-core');
const config = require('./config');

const storage = new Storage();
const bucket = storage.bucket(config.bucketName);

const firestore = new Firestore({
    projectId: config.projectId,
});

const handleUpload = (request, response, uploadData, fileName) => {
    bucket
        .upload(uploadData.file)
        .then(() =>
            storage
                .bucket(bucket.name)
                .file(fileName)
                .makePublic()
        )
        .then(() => {
            const data = {
                url:
                    'https://storage.googleapis.com/' +
                    bucket.name +
                    '/' +
                    fileName,
                userId: 'Hello World',
                bucketName: bucket.name,
                fileName,
            };

            firestore.doc('videos/' + request.query.v).set(data);

            return data;
        })
        .then((data) => response.status(200).json(data))
        .catch((error) => response.status(500).json(error));
};

module.exports = (request, response) => {
    const fileName = request.query.v + '.mp4';
    const filepath = path.join(os.tmpdir(), fileName);
    const uploadData = { file: filepath, type: 'video/mp4' };
    const video = ytdl('http://www.youtube.com/watch?v=' + request.query.v);

    video.pipe(fs.createWriteStream(filepath));
    video.on('progress', (chunkLength, downloaded, total) => {
        downloaded === total &&
            handleUpload(request, response, uploadData, fileName);
    });
};
