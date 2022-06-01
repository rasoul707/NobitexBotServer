
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

    let profileName = '';
    let balance = 0;
    let properties = {};


    // const _user = await fetch("https://api.nobitex.ir/users/profile", {
    //     headers: { Authorization: "Token " + token },
    //     method: "GET"
    // })
    // const _user_data = await _user.json();

    // const _wallets = await fetch("https://api.nobitex.ir/users/wallets/list", {
    //     headers: { Authorization: "Token " + token },
    //     method: "POST"
    // })
    // let _wallets_data = await _wallets.json();

    // const _orders = await fetch("https://api.nobitex.ir/market/orders/list", {
    //     headers: { Authorization: "Token " + token },
    //     method: "POST",
    //     body: JSON.stringify({ status: "done", details: 2 })
    // })
    // let _orders_data = await _orders.json();


    // profileName = _user_data.profile.firstName + " " + _user_data.profile.lastName;
    // _wallets_data.wallets.map(({ rialBalance, balance, currency }) => {
    //     balance += rialBalance;
    //     properties[currency] = {
    //         rialBalance,
    //         balance
    //     };
    // });

    // _orders_data.orders.map(({ type, execution, averagePrice, srcCurrency, dstCurrency, matchedAmount, status }) => {

    // })




    // console.log(properties)




    return res.status(200).json({
        ok: true,
        properties: [
            {
                coin: "fff",
                amount: 444,
                avgPrice: 488,
            }, {
                coin: "nnn",
                amount: 142,
                avgPrice: 896,
            },
        ]
        // account: {
        //     profileName,
        //     balance,
        // },
    })



    return res.status(400).json({
        code: "failed",
        message: ":(("
    })
}

export default handler
