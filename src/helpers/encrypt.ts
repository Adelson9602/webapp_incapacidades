import CryptoJS from 'crypto-js';
const key = CryptoJS.HmacSHA1('sha256', 'oW%c76+jb2');
const iv = CryptoJS.HmacSHA1('sha256', 'A)2!u467a^');

const encryptedAES = (data: string):string =>  {
  if(data){
    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
  return ''
}

const encryptJSON = (data: JSON):string => {
  if(data){
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }
  return ''
}

const decryptJSON = (data: string):JSON => {
  if(data){
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const resultJSON = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
    return resultJSON;
  }
  return JSON.parse(JSON.stringify({message: 'Debe enviar un json válido', error: 'JSON inválido'}))
}

const decryptedAES = (data: string):string => {
  if(data){
    const decrypted = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  return ''
}

export { encryptedAES, decryptedAES, encryptJSON, decryptJSON }
