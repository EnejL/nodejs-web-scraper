const feedDisplay = document.getElementById("feed");

fetch("http://localhost:8000/")
    .then(response => response.json())
    .then(jobListings => console.log(jobListings))
    .then(jobListings => {
        jobListings.forEach(jobListings => {
            const title = '<h3>' + jobListings + '</h3>'
            feedDisplay.insertAdjacentElement("beforeend", jobTitle)
        })
    })
    .catch(err => console.log(err))
