/* eslint-disable */

const chai = require('chai');
const dirty = require('dirty-chai');
const sinon = require('sinon');

chai.use(dirty);
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
