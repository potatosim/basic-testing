// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const testCases = [
  {
    elements: [1, 1, 1],
    expected: {
      value: 1,
      next: { value: 1, next: { value: 1, next: { value: null, next: null } } },
    },
  },
  {
    elements: [2, 2, 2],
    expected: {
      value: 2,
      next: { value: 2, next: { value: 2, next: { value: null, next: null } } },
    },
  },
  {
    elements: [1, 2, 3],
    expected: {
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    },
  },
  { elements: [], expected: { value: null, next: null } },
  {
    elements: [undefined],
    expected: { value: null, next: { value: null, next: null } },
  },
];

describe('generateLinkedList', () => {
  it.each(testCases)(
    'should generate linked list',
    ({ elements, expected }) => {
      expect(generateLinkedList(elements)).toStrictEqual(expected);
    },
  );
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testCases[0]!.elements)).toStrictEqual(
      testCases[0]!.expected,
    );
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testCases[1]!.elements)).toMatchSnapshot();
  });
});
