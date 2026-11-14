import test from 'node:test';
import assert from 'node:assert/strict';
import { publicationDates, missingDates, kstToday } from './blog-dates.mjs';
test('Publication dates are bounded and use the KST calendar', () => {
  assert.equal(kstToday(new Date('2026-11-13T16:00:00Z')), '2026-11-14');
  assert.deepEqual(publicationDates('', '', '2026-11-14'), ['2026-11-14']);
  const days = publicationDates('2026-11-07', '2026-11-14', '2026-11-14');
  assert.equal(days.length, 8);
  assert.equal(days[7], '2026-11-14');
  for (const [start, end] of [['', '2026-11-14'], ['2026-02-30', '2026-11-14'], ['2026-11-14', '2026-11-13'], ['2026-11-14', '2026-11-15'], ['2026-10-01', '2026-11-14']]) assert.throws(() => publicationDates(start, end, '2026-11-14'));
  assert.deepEqual(missingDates(days, [{ date: '2026-11-07', published: true, automated: true }, { date: '2026-11-08', published: false, automated: true }]), days.slice(1));
});
