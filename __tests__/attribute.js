const iris = require(`../cjs/index.js`);
const Attribute = iris.Attribute;

describe(`Constructor`, () => {
  test(`new Attribute(type, value)`, () => {
    const a = new Attribute('email', 'alice@example.com');
    expect(a.type).toBe('email');
    expect(a.value).toBe('alice@example.com');
  });
  test(`new Attribute({type, value})`, () => {
    const a = new Attribute({type: 'email', value: 'alice@example.com'});
    expect(a.type).toBe('email');
    expect(a.value).toBe('alice@example.com');
  });
  test(`new Attribute(value), recognized type`, () => {
    const a = new Attribute('alice@example.com');
    expect(a.type).toBe('email');
    expect(a.value).toBe('alice@example.com');
  });
  test(`new Attribute(value) unrecognized type`, () => {
    expect(() => new Attribute('#BADBAD;')).toThrow(Error);
  });
  test(`new Attribute(1, 'asdf') non-string 1st param`, () => {
    expect(() => new Attribute('#BADBAD;')).toThrow(Error);
  });
  test(`new Attribute('asdf', 1) non-string 2nd param`, () => {
    expect(() => new Attribute('#BADBAD;')).toThrow(Error);
  });
  test(`new Attribute('', 'asdf') empty string 1st param`, () => {
    expect(() => new Attribute('#BADBAD;')).toThrow(Error);
  });
  test(`new Attribute('asdf', '') empty string 2nd param`, () => {
    expect(() => new Attribute('#BADBAD;')).toThrow(Error);
  });
});
describe(`equals`, () => {
  test(`true`, () => {
    const a = new Attribute('email', 'alice@example.com');
    const b = new Attribute('email', 'alice@example.com');
    expect(a.equals(b)).toBe(true);
    expect(Attribute.equals(a, b)).toBe(true);
  });
  test(`false`, () => {
    const a = new Attribute('email', 'alice@example.com');
    const b = new Attribute('email', 'bob@example.com');
    expect(a.equals(b)).toBe(false);
    expect(Attribute.equals(a, b)).toBe(false);
    expect(a.equals({})).toBe(false);
  });
});
describe(`static methods`, () => {
  test(`guessTypeOf`, () => {
    expect(Attribute.guessTypeOf('bob@example.com')).toBe('email');
    expect(Attribute.guessTypeOf('#BADBAD;')).toBe(undefined);
  });
  test(`getUniqueIdValidators`, () => {
    expect(typeof Attribute.getUniqueIdValidators()).toBe(`Object`);
    expect(Object.keys(Attribute.getUniqueIdValidators()).length).toBeGreaterThan(10);
  })
});
describe(`methods`, () => {
  test(`identicon`, () => {
    const a = new Attribute('a', 'b');
    // TODO: mock document object needed for identicon
    // expect(a.identicon(50).prototype.name).toBe(`HTMLElement`);
  });
});
