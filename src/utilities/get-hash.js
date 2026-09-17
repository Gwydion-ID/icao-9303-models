// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

/**
 * Get a hash of the VDS for use in signing and verification operations.
 *
 * @async
 * @param { number[] } byteArray
 * @param { 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' } [algorithm = 'SHA-256'] - A
 *     Web Crypto API supported hash function string
 * @returns { Promise<number[]> }
 */
export async function getHash(byteArray, algorithm = 'SHA-256') {
  const cryptoObject = globalThis.crypto;
  if (!cryptoObject?.subtle) {
    throw new Error('Web Crypto API is unavailable; ensure you are running in Node.js or in a Secure Context (HTTPS).');
  }
  const bytes = new Uint8Array(byteArray);
  const hashBuffer = await cryptoObject.subtle.digest(algorithm, bytes);
  return Array.from(new Uint8Array(hashBuffer));
}

