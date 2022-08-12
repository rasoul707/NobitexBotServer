const { insertStageOrder } = require("../../database")

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

    const { accounts, order } = req.body
    const { actionType } = order

    if (actionType === 'normal') {
        if (accounts) {
            // group
            let groupOrder = []
            for (let i = 0; i < accounts.length; i++) {
                const { token, ratio } = accounts[i]
                order.amount = order.amount * ratio / 10
                const response = await normalOrder(token, order);
                console.log('group->' + i, 'normalOrder', response)
                if (response.status === "ok") {
                    groupOrder[i] = {
                        ok: true,
                        result: response
                    }
                } else {
                    groupOrder[i] = {
                        ok: false,
                        result: response
                    }
                }
            }
            return res.status(200).json({
                ok: true,
                groupOrder
            })
        }
        else {
            // one
            const { token } = req.headers
            const response = await normalOrder(token, order);
            console.log('one', 'normalOrder', response)
            if (response.status === "ok") {
                return res.status(200).json({
                    ok: true,
                    ...response
                })
            } else {
                const m = {
                    ok: false,
                    ...response
                }
                console.log(m)
                return res.status(400).json(m)
            }
        }
    } else {
        if (accounts) {
            // group
            let groupOrder = []
            for (let i = 0; i < accounts.length; i++) {
                const { token, ratio } = accounts[i]
                order.totalAmount = order.totalAmount * ratio / 10
                await stageOrder(token, order)
            }
            return res.status(200).json({
                ok: true,
                result: {
                    groupOrder
                }
            })
        }
        else {
            // one
            const { token } = req.headers
            await stageOrder(token, order)
            return res.status(200).json({
                ok: true
            })
        }
    }

}





const stageOrder = async (token, order) => {
    for (let i = 0; i < order.stages.length; i++) {
        const { percent, price } = order.stages[i]
        const re = {
            token,
            type: order.type,
            pair: order.pair,
            amount: order.totalAmount * percent / 100,
            price,
        }
        insertStageOrder(re)
    }
}



const normalOrder = async (token, order) => {

    const [srcCurrency, dstCurrency] = order.pair.split("/")
    let data = {
        type: order.type,
        mode: 'default',
        execution: order.execution || 'limit',
        srcCurrency: srcCurrency.toLowerCase(),
        dstCurrency: dstCurrency.toLowerCase(),
        amount: order.amount,
        price: order.price,
        stopPrice: order.stopPrice,
        // stopLimitPrice: '',
    }

    if (data.dstCurrency === 'irt') {
        data.dstCurrency = 'rls';
        data.price = data.price * 10
        if (data.stopPrice) {
            data.stopPrice = data.stopPrice * 10
        }
    }
    const result = await fetch("https://api.nobitex.ir/market/orders/add", {
        headers: { Authorization: "Token " + token },
        method: "POST",
        body: JSON.stringify(data)
    })
    const response = await result.json();
    return response
}


export default handler
