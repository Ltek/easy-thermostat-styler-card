// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
import { tc } from '../src/editor/editor';

describe('Title Case for editor titles and labels', () => {
  it('capitalizes words, keeps small words and existing capitals', () => {
    expect(tc('Keep the main area centered')).toBe('Keep the Main Area Centered');
    expect(tc('Distance from the main area')).toBe('Distance from the Main Area');
    expect(tc('Colors: inactive')).toBe('Colors: Inactive');
    expect(tc('Hide when off, 0 or none')).toBe('Hide When Off, 0 or None');
    expect(tc('Pill (like the setpoint pills)')).toBe('Pill (Like the Setpoint Pills)');
    expect(tc('Built-in (Chips for device sets, buttons for the rest)')).toBe('Built-in (Chips for Device Sets, Buttons for the Rest)');
    expect(tc('HVAC modes · RF fan')).toBe('HVAC Modes · RF Fan');
    expect(tc('− / + buttons')).toBe('− / + Buttons');
    expect(tc('Number (4)')).toBe('Number (4)');
  });
});
