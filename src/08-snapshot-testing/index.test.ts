import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const values1 = [1, 2, 3];

    const generatedResultList = generateLinkedList(values1);

    const resultList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };

    expect(generatedResultList).toStrictEqual(resultList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const values2 = [2, 3, 4];

    const generatedResultList = generateLinkedList(values2);

    expect(generatedResultList).toMatchSnapshot();
  });
});
