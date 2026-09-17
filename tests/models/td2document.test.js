// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { TD2Document } from '../../src/td2document.js';

describe('TD2-sized Machine Readable Travel Document', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 6 Appendix A]', () => {
    it('should equal the exemplary TD2 MRTD MRZ in Appendix A-1 and A-2.', () => {
      const document = new TD2Document({
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
      assert.deepStrictEqual(document.mrzLine1, 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'D231458907UTO7408122F1204159<<<<<<<6');
      assert.deepStrictEqual(document.machineReadableZone, 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<D231458907UTO7408122F1204159<<<<<<<6');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICO 9303 Part 6 Appendix A]', () => {
    it('document properties should equal the values from the exemplary TD2 MRTD in Appendix A-1 and A-2', () => {
      const document = new TD2Document({
        machineReadableZone: 'I<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<D231458907UTO7408122F1204159<<<<<<<6'
      });
      assert.deepStrictEqual(document.typeCode, 'I');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.number, 'D23145890');
      assert.deepStrictEqual(document.birthDate.toISOString(), '1974-08-12');
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.expirationDate.toISOString(), '2012-04-15');
      assert.deepStrictEqual(document.nationalityCode, 'UTO');
      assert.deepStrictEqual(document.primaryIdentifier, 'ERIKSSON');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, '');
    });
  });

});

