const htmlTemplate = (title, body) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>${title}</title>
    </head>
    <body>
        <h1>${title}</h1>
        <p>${body}</p>
    </body>
    </html>
    `
} 

export default htmlTemplate;