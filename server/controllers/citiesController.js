const axios = require('axios')

const url = 'https://api.novaposhta.ua/v2.0/json/searchSettlements'


// приклад body параметрів
// {
// 	"apiKey": "15d0f1b8de9dc0f5370abcf1906f03cd",
// 	"modelName": "AddressGeneral",
// 	"calledMethod": "getSettlements",
// 	"methodProperties": {
// 		"FindByString": "Рівне"
// 	}
// }

const fetchCities = async (req, res) => {
    const json = await axios.post(url, req.body)
    return res.status(200).send(json.data)
}

module.exports = {
    fetchCities,
}