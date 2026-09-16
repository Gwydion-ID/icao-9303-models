// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MRVBDocument } from '../../src/mrvbdocument.js';

describe('TD2-sized Machine Readable Visa', () => {

  describe('Use properties to reconstruct exemplary MRZ from documentation [REF ICAO 9303 Part 7 Appendix A]', () => {
    it('should equal the exemplary MRVB in Appendix A-3.', () => {
      const document = new MRVBDocument({
	typeCode: 'V',
	authorityCode: 'UTO',
	passportNumber: 'L8988901C',
	birthDate: '1974-08-12',
	genderMarker: 'F',
	validThru: '1996-12-10',
	nationalityCode: 'XXX',
	primaryIdentifier: 'Eriksson',
	secondaryIdentifier: 'Anna-Maria',
	optionalData: '',
        usePassportInMRZ: true
      });
      assert.deepStrictEqual(document.mrzLine1, 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<');
      assert.deepStrictEqual(document.mrzLine2, 'L8988901C4XXX7408122F9612109<<<<<<<<');
      assert.deepStrictEqual(document.machineReadableZone, 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<L8988901C4XXX7408122F9612109<<<<<<<<');
    });
  });

  describe('Import exemplary MRZ data from documentation [REF ICO 9303 Part 6 Appendix A]', () => {
    it('document properties should equal the values from the exemplary MRVB in Appendix A-3.', () => {
      const document = new MRVBDocument({
        machineReadableZone: 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<L8988901C4XXX7408122F9612109<<<<<<<<',
	usePassportInMRZ: true
      });
      assert.deepStrictEqual(document.typeCode, 'V');
      assert.deepStrictEqual(document.authorityCode, 'UTO');
      assert.deepStrictEqual(document.passportNumber, 'L8988901C');
      assert.deepStrictEqual(document.birthDate, new Date('1974-08-12T00:00:00'));
      assert.deepStrictEqual(document.genderMarker, 'F');
      assert.deepStrictEqual(document.validThru, new Date('1996-12-10T00:00:00'));
      assert.deepStrictEqual(document.nationalityCode, 'XXX');
      assert.deepStrictEqual(document.primaryIdentifier, 'ERIKSSON');
      assert.deepStrictEqual(document.secondaryIdentifier, 'ANNA MARIA');
      assert.deepStrictEqual(document.optionalData, '');
    });
  });

  describe('Import MRZ data from previous test with visa number in MRZ', () => {
    it('should have "L8988901C" as the document number instead of the passport number.', () => {
      const document = new MRVBDocument({
        machineReadableZone: 'V<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<L8988901C4XXX7408122F9612109<<<<<<<<',
        usePassportInMRZ: false
      });
      assert.deepStrictEqual(document.number, 'L8988901C');
    });
  });

});

