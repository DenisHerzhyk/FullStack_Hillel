const setHeaderTemplate = (res, message) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Length', Buffer.byteLength(message));
    res.setHeader("X-Content-Type-Options", "nosniff");
}

export default setHeaderTemplate;