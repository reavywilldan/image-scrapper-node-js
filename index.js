const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')

const writeStream = fs.createWriteStream('image-link.txt', 'utf-8')
const baseUrl = 'https://jadinikah.co/'

request(baseUrl, (err, resp, html) => {
    if (!err && resp.statusCode == 200) {
        console.log('request successful')

        const $ = cheerio.load(html)

        $('img').each((index, image) => {
            const img = $(image).attr('src')
            const newBaseUrl = baseUrl.replace(/\/$/, '')

            let link = ''

            if (img.startsWith('https://')) {
                link = img
            } else {
                link = `${newBaseUrl}${img}`
            }

            writeStream.write(link)
            writeStream.write('\n')
        })
    }
})