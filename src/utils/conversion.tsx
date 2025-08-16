import axios from "axios";

export const convertToBTC = async (valueBrl: number): Promise<number> => {
    try {
        const response = await axios.get('https://economia.awesomeapi.com.br/json/last/BTC-BRL');
        const bid = parseFloat(response.data.BTCBRL.bid);
        const valueBTC = valueBrl / bid;

        return parseFloat(valueBTC.toFixed(8));
    } catch(error) {
        console.error('Erro na conversão para BTC:', error);
        return 0;
    }
};