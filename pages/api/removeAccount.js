
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            res.status(404).send({ code: "not_found", message: "Route not found" })
            return;
        }
        return resolve(200);
    })
}



async function handler(req, res) {
    await runMiddleware(req, res)

    const { token } = req.headers;
    await fetch("https://api.nobitex.ir/auth/logout/", {
        headers: { Authorization: "Token " + token },
        method: "POST"
    })

    return res.status(200).json({
        ok: true,
        code: "remove_success",
        message: "Account removed successfully"
    })
}

export default handler
