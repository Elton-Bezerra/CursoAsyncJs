document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){
    var reqBody = {
        "documents": [
            {
                "language": "en",
                "id": 1,
                "text": document.getElementById("input").value
            }
        ]
    };

    var myHeader = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '65caeb7ee609461bb8ba63e9f32dc92c'
        
    });

    var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    };

    var request = new Request('https://westcentralus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases', initObject);

    fetch(request).then((response) => {
        if(response.ok) return response.json();
        else 
            return Promise.reject(new Error(response.statusText));
    }).then((response) => {
        document.getElementById("output").innerHTML = "Total Key Phrases: " + response.documents[0].keyPhrases.length + "</br>" +
            response.documents[0].keyPhrases;
    }).catch((err) => {
        console.log(err);
        alert(err);
        document.getElementById("output").innerHTML = '';
    });
}