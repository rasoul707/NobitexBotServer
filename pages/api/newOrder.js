

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


    // console.log(req.body);

    // const { token } = req.headers;
    // const result = await fetch("https://api.nobitex.ir/market/orders/add", {
    //     headers: { Authorization: "Token " + token },
    //     method: "POST",
    //     body: JSON.stringify(req.body)
    // })
    // const data = await result.json();



    return res.status(200).json({
        ok: true,
        // code: "remove_success",
        // message: "Account removed successfully"
    })
}

export default handler
