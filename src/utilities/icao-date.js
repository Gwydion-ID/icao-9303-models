// SPDX-FileCopyrightText: 2026 Don Geronimo <https://sentamal.in>
// SPDX-License-Identifier: LGPL-3.0-or-later

import { expandYear } from './expand-year.js';
import { dateToBytes } from './date-to-bytes.js';
import { bytesToDate } from './bytes-to-date.js';

/**
 * A custom date object for ICAO 9303 machine-readable travel documents.
 *
 * Dates in the ICAO 9303 specification only deal with year, month, and day
 *     and additionally can have blank values for unknown fields. The dates
 *     are rarely stored or displayed in YYYY-MM-DD format, may be displayed
 *     in different ways based on the document feature (MRZ, VDS, VIZ), and
 *     may be displayed in different ways based on locale.
 *
 * An `IcaoDate` object mimicks some methods and properties of a Date object
 *     pertaining to dates for ICAO 9303 document creation and management.
 */
export class IcaoDate {
  /**
   * Create an `IcaoDate`.
   * @param { string | Date | number[] | IcaoDate } [value = new Date()] - A date string in YYYY-MM-DD
   *     ISO 8601 format, a date string in MRZ format, a Date object, a VDS date array, or
   *     another IcaoDate object..
   * @param { number } [maxYear = new Date().getFullYear() + 20] - Upper bound of the
   *     100-year window (inclusive) used when expanding a two-digit year.
   */
  constructor(value = new Date(), maxYear = new Date().getFullYear() + 20) {
    if (typeof value === 'string') {
      const mrz  = /^[0-9<]{6}$/i;
      const iso = /^[0-9x]{4}-[0-9x]{2}-[0-9x]{2}$/i;
      if (mrz.test(value)) {
        const year = value.slice(0, 2);
        const month = value.slice(2, 4).toUpperCase() === '<<' ? value.slice(2, 4).toUpperCase() : Number(value.slice(2, 4)) - 1;
        const date = value.slice(4);
	this.setFullYear(year, month, date, maxYear);
      } else if (iso.test(value)) {
	const year = value.slice(0, 4);
	const month = value.slice(5, 7).toUpperCase() === 'XX' ? value.slice(5, 7).toUpperCase() : Number(value.slice(5, 7)) - 1;
	const date = value.slice(8);
	this.setFullYear(year, month, date);
      } else {
        throw new TypeError('String passed to IcaoDate constructor is an invalid ISO 8601 or MRZ format string.');
      }
    } else if (Object.prototype.toString.call(value) === '[object Date]') {
      if (isNaN(value.valueOf())) {
        throw new TypeError('Date object passed to IcaoDate constructor is an invalid Date.');
      }
      this.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
    } else if (Array.isArray(value)) {
      const convert = bytesToDate(value);
      if (isNaN(convert.valueOf())) {
        throw new TypeError('Byte array passed to IcaoDate constructor is an invalid VDS byte array.');
      }
      this.setFullYear(convert.getFullYear(), convert.getMonth(), convert.getDate());
    } else if (value instanceof IcaoDate) {
      return value;
    } else {
      throw new TypeError('Parameter passed to IcaoDate constructor is not a supported date format.');
    }
  }

  #date = null;
  /**
   * Returns the day of the month (1 - 31) for the specified date.
   * @returns { number | null } 
   */
  getDate() { return this.#date; }
  /**
   * Sets the day of the month for a specified date.
   * @param { string | number | null } dateValue
   */
  setDate(dateValue) {
    this.#setDate(dateValue);
    this.#isValidDate();
  }
  /**
   * Sets the day of the month for a specified date.
   * @param { string | number | null }
   */
  #setDate(value) {
    if (value === null || value === 'XX' || value === '<<') {
      this.#date = null;
    } else {
      const date = Number(value);
      if (isNaN(date) || date < 1 || date > 31) {
        throw new RangeError('Invalid day of the month supplied.');
      }
      this.#date = date;
    }
  }

  #month = null;
  /**
   * Returns the month (0 - 11) in the specified date.
   * @returns { number | null }
   */
  getMonth() { return this.#month; }
  /**
   * Sets the month for a specified date.
   * @param { string | number | null } monthValue
   * @param { string | number | null } [dateValue]
   */
  setMonth(monthValue, dateValue) {
    this.#setMonth(monthValue);
    if (dateValue !== undefined) { this.#setDate(dateValue); }
    this.#isValidDate();
  }
  /**
   * Sets the month for a specified date.
   * @param { string | number | null }
   */
  #setMonth(value) {
    if (value === null || value === 'XX' || value === '<<') {
      this.#month = null;
    } else {
      const month = Number(value);
      if (isNaN(month) || month < 0 || month > 11) {
        throw new RangeError('Invalid month supplied.');
      }
      this.#month = month;
    }
  }

  #year = null;
  /**
   * Returns the year (4 digits for 4-digit years) of the specified date.
   * @returns { number | null }
   */
  getFullYear() { return this.#year; }
  /**
   * Sets the full year (e.g., 4 digits for 4-digit years) for a specified date.
   *     Note if the year is two digits (0-99), the year will be expanded to the
   *     current or previous century.
   * @param { string | number | null } yearValue
   * @param { string | number | null } [monthValue]
   * @param { string | number | null } [dateValue]
   * @param { number } [maxYear = new Date().getFullYear() + 20] - Upper bound of the
   *     100-year window (inclusive) used when expanding a two-digit year.
   */
  setFullYear(yearValue, monthValue, dateValue, maxYear = new Date().getFullYear() + 20) {
    this.#setFullYear(yearValue, maxYear);
    if (monthValue !== undefined) { this.#setMonth(monthValue); }
    if (dateValue !== undefined) { this.#setDate(dateValue); }
    this.#isValidDate();
  }
  /**
   * Sets the full year (e.g., 4 digits for 4-digit years) for a specified date.
   *     Note if the year is two digits (0-99), the year will be expanded to the
   *     current or previous century.
   * @param { string | number | null } value
   * @param { number } [maxYear = new Date().getFullYear() + 20] - Upper bound of the
   *     100-year window (inclusive) used when expanding a two-digit year.
   */
  #setFullYear(value, maxYear = new Date().getFullYear() + 20) {
    if (value === null || value === '<<' || value === 'XXXX') {
      this.#year = null;
    } else {
      const year = Number(value);
      if (isNaN(year) || year < 0) {
        throw new RangeError('Invalid year supplied.');
      }
      const expandedYear = year < 100 ? expandYear(year, maxYear) : year;
      this.#year = expandedYear;
    }
  }

  /**
   * Checks the year, month, and date for correctness.
   */
  #isValidDate() {
    const year = this.getFullYear() !== null ? this.getFullYear() : 2024;
    const month = this.getMonth() !== null ? this.getMonth() + 1 : 1;
    const date = this.getDate() !== null ? this.getDate() : 1;
    const test = new Date(
        `${String(year).padStart(4, '0')}-` +
	`${String(month).padStart(2, '0')}-` +
	String(date).padStart(2, '0') +
	'T00:00:00'
    );
    if (isNaN(test.valueOf()) || test.getFullYear() !== year || test.getMonth() + 1 !== month || test.getDate() !== date) {
      this.#invalidateDate();
      throw new RangeError('Attempted date change results in invalid date.');
    }
  }

  /**
   * Invalidate the date object by setting all values to null.
   */
  #invalidateDate() {
    this.#date = null;
    this.#month = null;
    this.#year = null;
  }

  /**
   * Returns a string representing the ICAODate object.
   * @returns { string }
   */
  toString() { return this.toISOString(); }

  /**
   * Converts an IcaoDate to a string following the ISO 8601 Extended format, but with
   *     unknown (null) date variables displaying as X's.
   * @returns { string }
   */
  toISOString() {
    const year = this.getFullYear() === null ? 'XXXX' : String(this.getFullYear()).padStart(4, '0');
    const month = this.getMonth() === null ? 'XX' : String(this.getMonth() + 1).padStart(2, '0');
    const date = this.getDate() === null ? 'XX' : String(this.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
  }

  /**
   * Converts an IcaoDate to a string following the Machine-Readable Zone format.
   * @returns { string }
   */
  toMRZString() {
    return this.toISOString().slice(2).replace(/-/gi, '').replace(/x/gi, '<');
  }

  /**
   * Converts an IcaoDate to a byte sequence following the VDS date byte format.
   * @returns { number[] }
   */
  toVDSArray() {
    if (this.getDate() === null || this.getMonth() === null || this.getFullYear() === null) {
      throw new RangeError('All date variables (date, month, year) must be set, known, and valid to create a VDS date byte sequence.');
    }
    return dateToBytes(this.toISOString());
  }
}

