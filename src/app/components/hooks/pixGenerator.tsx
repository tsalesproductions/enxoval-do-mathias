import { QrCodePix } from 'qrcode-pix';
import {pix} from '../../database.json';

interface IParameter {
    version: string;
    key: string;
    city: string;
    name: string;
    value?: number;
    transactionId?: string;
    message?: string;
    cep?: string;
    currency?: number; //default: 986 ('R$')
    countryCode?: string; //default: 'BR'
}

interface IResponse {
    payload: () => string; //payload for QrCode
    base64: (options?: any) => Promise<string>; //QrCode image base64
}

export default async function qrPix({price, message} : {price: number, message: string}){
    function getRndInteger(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    const qrCodePix = QrCodePix({
        version: '01',
        key: pix.key, //or any PIX key
        name: pix.name,
        city: pix.city,
        transactionId: pix.identification+(getRndInteger(11111111,99999999)),
        // message: message,
        cep: '22775150',
        value: price,
    });

    return {
        payload: qrCodePix.payload(),
        base64: await qrCodePix.base64()
    }
}