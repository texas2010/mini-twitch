import { describe, test, expectTypeOf } from 'vitest';

import { MemberVisibility } from './types';

describe('General Types', () => {
  test('should have MemberVisibility type', () => {
    type answer = 'private' | 'protected' | 'public';

    expectTypeOf<MemberVisibility>().toEqualTypeOf<answer>();
  });
});
