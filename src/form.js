const form = () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Form</title>
    </head>
    <body>
        <h1>Form</h1>
        <form action="/submit" method="POST">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" />
            <br/>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" />
            <br/>
            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
    `
}

export default form;