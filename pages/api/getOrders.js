const { getOrdersList } = require("../../database")



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

    const _user = await fetch("https://api.nobitex.ir/users/profile", {
        headers: { Authorization: "Token " + token },
        method: "GET"
    })
    if (_user.status !== 200) {
        return "ACCOUNT_ERROR"
    }
    const _user_data = await _user.json();
    const email = _user_data.profile.email


    const _orders = await getOrdersList(email)
    let orders = []
    for (let i = 0; i < orders.length; i++) {
        orders.push({
            ...orders[i],
            ...(orders[i].actionType === "stages" ? JSON.parse(orders[i].stages) : null)
        })
    }





    return res.status(200).json({
        ok: true,
        orders
        // orders: [
        //     {
        //         pair: "ADA/USDT",
        //         type: "buy",
        //         actionType: "normal",

        //         amount: 100,
        //         price: 145,
        //     },
        //     {
        //         pair: "BNB/USDT",
        //         type: "sell",
        //         actionType: "stages",

        //         totalAmount: 500,
        //         stages: [
        //             {
        //                 price: 550,
        //                 percent: 20,
        //             },
        //             {
        //                 price: 600,
        //                 percent: 40,
        //             },
        //             {
        //                 price: 700,
        //                 percent: 20,
        //             },
        //         ],
        //     }
        // ]
    })
}

export default handler
