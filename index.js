// defining the server port and requiring dependencies
const PORT      = 8000
const axios     = require('axios')
const cheerio   = require('cheerio')
const cors      = require('cors')
const express   = require('express')

// declaring the URLs
const mojeDelo = "https://www.mojedelo.com/prosta-delovna-mesta/vsa-podrocja/vse-regije"
const mojaZaposlitev = "https://www.optius.com/iskalci/prosta-delovna-mesta/?Keywords=&doSearch=&Time="
const sloTech = ""
const zrsz = "https://www.iskanjedela.si/search-jobs?jobId=2906410"
const tujina = ""

// creating the array with the job listings
const jobListings = []

const app = express()

// making sure our app uses cors
app.use(cors())

// app.get('/', function(req, res) {
//     res.json("This is my webscrapper")
// })

app.get('/', function(req, res) {
    axios(mojeDelo)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html);

            // $(".w-inline-block.job-ad.deluxe.w-clearfix .details .title", html).each(function(){
            //     const jobTitle = $(this).text()
            //     jobListings.push(jobTitle)
            // })
            //
            // $(".w-inline-block.job-ad.deluxe.w-clearfix .details p", html).each(function(){
            //     const jobDescription = $(this).text()
            //     jobListings.push(jobDescription)
            // })

            $(".w-inline-block.job-ad.deluxe.w-clearfix", html).each(function(){
                const jobTitle = $(this).find('h2.title').text()
                const baseUrl = 'https://www.mojedelo.com/'
                const url = $(this).attr('href')
                const jobLink = baseUrl + url
                const companyName = $(this).find('.boxName .detail').text()
                const jobLocation = $(this).find('.box-details-icon.icon-map-marker + .detail').text()
                const datePosted = $(this).find('.box-details-icon.icon-calendar + .detail').text()

                jobListings.push({
                    jobTitle,
                    jobLink,
                    companyName,
                    jobLocation,
                    datePosted
                })
            })

            res.json(jobListings)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log("server running on port 8000"))
