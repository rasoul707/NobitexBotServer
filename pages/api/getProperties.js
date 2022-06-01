
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        if (req.method !== 'GET') {
            res.status(404).send({ code: "not_found", message: "Route not found" })
            return;
        }
        return resolve(200);
    })
}



async function handler(req, res) {
    await runMiddleware(req, res)

    const { token } = req.headers;

    let properties = [];

    const _wallets = await fetch("https://api.nobitex.ir/users/wallets/list", {
        headers: { Authorization: "Token " + token },
        method: "POST"
    })
    let _wallets_data = await _wallets.json();

    _wallets_data.wallets.map(({ balance, currency }) => {
        properties.push({
            coin: currency.toUpperCase(),
            amount: parseFloat(balance),
            avgPrice: parseFloat(0),
        })
    });

    return res.status(200).json({
        ok: true,
        properties,
    })
}

export default handler
