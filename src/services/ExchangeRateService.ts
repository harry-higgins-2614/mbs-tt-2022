import axios from 'axios';

import currencies from "../assets/currencies.json";

export default class ExchangeRateService {
    currency: string;
    baseUrl: string;

    constructor(currency: string) {
        this.currency = currency;

        this.baseUrl = "https://www.floatrates.com";
    }

    static currencyCodes = currencies.map(e => e.code);
    static currencies = currencies;


    get constructedUrl() {

        // If the list of currency codes does not support the current code supplied, throw an error - we don't support this currency.
        if (!ExchangeRateService.currencyCodes.includes(this.currency)) {
            throw Error(`${this.currency} not supported. Please try again with a valid currency.`);
        }

        return `${this.baseUrl}/daily/${this.currency}.json`;
    }

    getExchangeRates() { 
        return axios.get(this.constructedUrl);
    }

}