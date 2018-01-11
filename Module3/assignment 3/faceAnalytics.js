(function () {
    var button = document.getElementById('btnAnalyse');
    var url = document.getElementById('input');
    var img = document.getElementById('img');
    var atributos = document.getElementById('listaAtributos');
    function setUp() {
        button.addEventListener('click', handleClick);
    }

    function handleClick() {
        img.src = url.value;
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender"
        }

        // this block does the same thing of $.param in jquery
        var str = "";
        for (var key in params) {
            if (str != "") {
                str += "&";
            }
            str += key + "=" + params[key];
        }

        var reqBody = {
            "url": url.value
        };

        var myHeader = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '7f1d9701266346e7a65ba63dc3a71296'

        });

        var initObject = {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: myHeader
        };
        var request = new Request('https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?' + str, initObject);

        fetch(request).then((res) => {
            if (res.ok) return res.json();
            else
                return Promise.reject(new Error(response.statusText));
        }).then((res) => {
            console.log(res);
            var li1 = document.createElement("li");
            var li2 = document.createElement("li");
            li1.appendChild(document.createTextNode('Gender: ' + res[0].faceAttributes.gender));
            li2.appendChild(document.createTextNode('Age: ' + res[0].faceAttributes.age));
            atributos.appendChild(li1);
            atributos.appendChild(li2);
        });
    }
    setUp();
})();