const { ImageKit } = require('@imagekit/nodejs')


const ImageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function uploadFile(file, title){
    const result = await ImageKitClient.files.upload({
        file,
        fileName: `${title}-${Date.now()}`,
        folder: 'complete-backend/music'
    })

    return result
}


module.exports = {
    uploadFile
}