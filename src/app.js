const feedDisplay = document.getElementById("feed");

fetch("http://localhost:8000/results")
    .then(response => response.json())
    .then(jobListings => console.log(jobListings))
    .then(jobListings => {
        jobListings.forEach(jobListings => {
            const title = '<h3>' + jobListings[0] + '</h3>'
            feedDisplay.insertAdjacentElement("beforeend", title)
        })
    })
    .catch(err => console.log(err))
