// @flow

jest.mock('~/services/i18n', () => ({ get: () => ({ t: key => key }) }));
jest.mock('~/utils', () => ({ generateUUID: () => 'test-uuid' }));

window.BASE_NAME = '/';
window.REST_UI_URL = 'test';
