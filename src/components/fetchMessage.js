const fetchMessage = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let fortuna = Math.random() > 0.5;
            fortuna ? reject(new Error('Failed to fetch message')) : resolve("Everything works great. Hi Denys!");

        }, 2000)
    })
}

export default fetchMessage;