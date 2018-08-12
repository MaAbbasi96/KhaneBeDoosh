
export function GetRequest(url){
    var headers = {
        'Accept':"aplication/json",
        'Content-Type':'aplication/json; charset=utf-8',
    }

    if(localStorage.getItem("token"))
        headers["token"] = localStorage.getItem("token");

    return fetch(url,
                {
                    method:'GET',
                    headers
                })  
        .then(response=> {
            return new Promise((resolve, reject) => {
            response
                .json()
                .then(responseJSON => {
                    resolve(responseJSON);
                })
                .catch(err => reject(err));
        });
    }).catch((err)=>console.log(err));
}

export function PostRequest(url, data){
    var headers = {
        'Accept':"aplication/json",
        'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
    }

    if(localStorage.getItem("token"))
        headers["token"] = localStorage.getItem("token");
        
    return fetch(url,
                {
                    method:'POST',
                    headers,
                    body: data,
                })  
        .then(response=> {
            return new Promise((resolve, reject) => {
            response
                .json()
                .then(responseJSON => {
                    resolve(responseJSON);
                })
                .catch(err => reject(err));
        });
    }).catch((err)=>console.log(err));
}