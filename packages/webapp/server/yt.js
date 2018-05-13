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

const handleUpload = (request, response, uploadData, info) => {
    bucket
        .upload(uploadData.file)
        .then(() =>
            storage
                .bucket(bucket.name)
                .file(uploadData.fileName)
                .makePublic()
        )
        .then(() => {
            const data = Object.assign({}, uploadData, {
                url:
                    'https://storage.googleapis.com/' +
                    bucket.name +
                    '/' +
                    uploadData.fileName,
                title: info.title,
                thumbnail: info.thumbnail_url,
            });

            firestore
                .doc(
                    'users/' +
                        uploadData.userId +
                        '/videos/' +
                        uploadData.videoId
                )
                .set(data);

            return data;
        })
        .then((data) => response.status(200).json(data))
        .catch((error) => {
            console.log(error);
            response.status(500).json(error);
        });
};

module.exports = (request, response) => {
    const videoId = request.query.v;
    const fileName = videoId + '.mp4';
    const userId = request.query.u;
    const filepath = path.join(os.tmpdir(), fileName);
    const uploadData = {
        fileName,
        userId,
        videoId,
        file: filepath,
        bucketName: bucket.name,
        timestamp: new Date().getTime(),
    };
    const video = ytdl('http://www.youtube.com/watch?v=' + request.query.v);

    video.pipe(fs.createWriteStream(filepath));

    let info;
    video.on('info', (i) => {
        info = i;
    });
    video.on('progress', (chunkLength, downloaded, total) => {
        downloaded === total &&
            handleUpload(request, response, uploadData, info);
    });
};
