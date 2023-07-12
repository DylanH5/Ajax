function myAxios(config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        if (config.params) {
            config.url += `?${new URLSearchParams(config.params).toString()}`
        }
        xhr.open(config.method || "GET", config.url)
        xhr.addEventListener('loadend', () => {
            if (xhr.status >= 200 && xhr.status <= 299) {
                resolve(JSON.parse(xhr.response))
            } else {
                reject(new Error(xhr.response))
            }
        })
        if (config.data) {
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.send(JSON.stringify(config.data))
        } else {
            xhr.send()
        }
    })
}