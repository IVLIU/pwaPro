if(navigator.serviceWorker !== null) {
    navigator.serviceWorker.register('./sw.js')
    .then(res => console.log(`registry success, and the scope is ${res.scope}`))
    .catch(err => console.log('Oops, some bad thing'));
}