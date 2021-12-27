/* Global Variables */
const apiUrl = "http://localhost:3000";


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


// Personal API Key for OpenWeatherMap API
const apiKey = "2dc615a5d75785fe9579cc1d03a10bfc";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', onClick);

/* Function called by event listener */
function onClick() {
    let projectData = {
        zipCode: document.getElementById('zip').value,
        content: document.getElementById('feelings').value,
        date: newDate
    };
    getApiData(projectData.zipCode).
    then(response => response.json())
   .then(res => {
        if (res.cod == 200){
            debugger;
            projectData.temp = res.main.temp;
            postData(projectData);
        }else{
            debugger
            alert(res);
        }
    }).catch(error=>{
        debugger
        alert(error)
    });

};


/* Function to GET Web API Data*/
async function getApiData(zipCode) {
    debugger;
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}`);
}


/* Function to POST data */
async function postData(projectData) {
    let response = await fetch(`${apiUrl}/projectData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
    }).then(response => {
        debugger;
        if (response.ok) {
            getData();
        }
    }).catch(error => {
        debugger;
        alert(error)
    });
}



/* Function to GET Project Data */
async function getData() {
    let response = await fetch(`${apiUrl}/all`);

    response.json().then(data => {
        document.getElementById('date').innerHTML = `${data.date}`;
        document.getElementById('temp').innerHTML = `${data.temp}`;
        document.getElementById('content').innerHTML = `${data.content}`;
    }).catch(error => {
        alert(error);
    });

}