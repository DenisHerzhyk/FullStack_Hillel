const setHeaderTemplate = (code, res, message) => {
    res.statusCode = code;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Length', Buffer.from(message).length);
    res.setHeader("X-Content-Type-Options", "nosniff");
}

export default setHeaderTemplate;