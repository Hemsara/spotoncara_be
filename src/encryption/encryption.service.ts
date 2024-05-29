import { Injectable } from '@nestjs/common';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class EncryptionService {
  private readonly saltValue = 's@1tValue';
  private readonly passPhrase = 's@1tValue';
  private readonly passwordIterations = 2;
  private readonly initVector = '@1B2c3D4e5F6g7H8';
  private readonly keySize = 256 / 32;

  encrypt(plainText: string): string {
    const key = CryptoJS.PBKDF2(this.passPhrase, this.saltValue, {
      keySize: this.keySize,
      iterations: this.passwordIterations,
      hasher: CryptoJS.algo.SHA1,
    });

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Utf8.parse(this.initVector),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  async decrypt(cipherText) {
    const saltValue = 's@1tValue';
    const passPhrase = 's@1tValue';
    const hashAlgorithm = 'SHA-1'; // SHA-1 hash algorithm is used in C#, in JavaScript it's simply "SHA-1"
    const passwordIterations = 2;
    const initVector = '@1B2c3D4e5F6g7H8';
    const keySize = 256;

    const initVectorBytes = new TextEncoder().encode(initVector);
    const saltValueBytes = new TextEncoder().encode(saltValue);
    const cipherTextBytes = Uint8Array.from(atob(cipherText), (c) =>
      c.charCodeAt(0),
    );

    const importedKey = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(passPhrase),
      { name: 'PBKDF2' },
      false,
      ['deriveKey'],
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: saltValueBytes,
        iterations: passwordIterations,
        hash: hashAlgorithm,
      },
      importedKey,
      { name: 'AES-CBC', length: keySize },
      false,
      ['decrypt'],
    );

    const decryptedData = await crypto.subtle.decrypt(
      {
        name: 'AES-CBC',
        iv: initVectorBytes,
      },
      key,
      cipherTextBytes,
    );

    return new TextDecoder().decode(decryptedData);
  }
}
