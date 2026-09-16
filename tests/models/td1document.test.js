// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TD1Document } from '../../src/td1document.js';

describe('TD1-sized Machine Readable Travel Document', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 5 Appendix A]', () => {
    it('should equal the exemplary TD1 MRTD MRZ in Appendix A-1 and A-2.', () => {
      const document = new TD1Document({
        typeCode: 'I',
	authorityCode: 'UTO',
	number: 'D23145890',
	birthDate: '1974-08-12',
	genderMarker: 'F',
	expirationDate: '2012-04-15',
	nationalityCode: 'UTO',
	primaryIdentifier: 'Eriksson',
	secondaryIdentifier: 'Anna-Maria',
	optionalData: ''
      });
      assert.deepStrictEqual(document.mrzLine1, 'I<UTOD231458907<<<<<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, '7408122F1204159UTO<<<<<<<<<<<6');
      assert.deepStrictEqual(document.mrzLine3, 'ERIKSSON<<ANNA<MARIA<<<<<<<<<<');
      assert.deepStrictEqual(document.machineReadableZone, 'I<UTOD231458907<<<<<<<<<<<<<<<7408122F1204159UTO<<<<<<<<<<<6ERIKSSON<<ANNA<MARIA<<<<<<<<<<');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICO 9303 Part 5 Appendix A]', () => {
    it('document properties should equal the values from exemplary TD1 MRTD in Appendix A-1 and A-2', () => {
      const document = new TD1Document({
        machineReadableZone: 'I<UTOD231458907<<<<<<<<<<<<<<<7408122F1204159UTO<<<<<<<<<<<6ERIKSSON<<ANNA<MARIA<<<<<<<<<<'
      });
      assert.deepStrictEqual(document.typeCode, 'I');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.number, 'D23145890');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.expirationDate, new Date('2012-04-15T00:00:00'));
      assert.deepStrictEqual(document.nationalityCode, 'UTO');
      assert.deepStrictEqual(document.primaryIdentifier, 'ERIKSSON');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, '');
    });
  });

});

