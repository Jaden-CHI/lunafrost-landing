import test from 'node:test';
import assert from 'node:assert/strict';
import { editorialLane, editorialBrief, validateDiscovery } from './blog-editorial.mjs';

test('KST calendar dates follow the approved 2/2/2/1 weekly mix', () => {
  assert.deepEqual(Array.from({ length: 7 }, (_, i) => editorialLane(`2026-11-0${i + 1}`)), ['updates', 'github', 'youtube', 'practical', 'github', 'youtube', 'practical']);
  assert.equal(editorialLane('2026-10-31'), 'practical');
  assert.throws(() => editorialLane('invalid'));
});
test('Manual topics override lanes, unpublished and future posts are not recent evidence', () => {
  const existing = [{ date: '2026-10-30', title: 'Visible', published: true }, { date: '2026-11-02', title: 'Future', published: true }, { date: '2026-10-29', title: 'Private', published: false }];
  const brief = editorialBrief('2026-10-31', existing, 'Custom');
  assert.equal(brief.lane, 'manual');
  assert.match(brief.prompt, /Visible/);
  assert.doesNotMatch(brief.prompt, /Future|Private/);
  assert.equal(editorialBrief('2026-10-31', [], ' ').lane, 'practical');
});
test('Discovery links cannot replace verification sources', () => {
  const primary = ['https://github.com/owner/project', 'https://example.org/docs'];
  assert.doesNotThrow(() => validateDiscovery('github', primary));
  assert.throws(() => validateDiscovery('github', ['https://github.com/trending', 'https://example.org/docs']));
  assert.throws(() => validateDiscovery('youtube', primary));
  assert.throws(() => validateDiscovery('youtube', ['https://www.youtube.com/watch?v=a', 'https://youtu.be/b']));
  assert.doesNotThrow(() => validateDiscovery('youtube', [...primary, 'https://www.youtube.com/watch?v=a']));
});
