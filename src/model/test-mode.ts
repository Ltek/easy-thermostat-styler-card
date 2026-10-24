import type { CardConfig } from './config';
import type { ClimateView } from './climate';

// Test mode: while the dashboard is being edited, pretend the system is
// heating / cooling / idle / on fan / off so effects and moving backgrounds can
// be seen without waiting for the real thing. Only the "what is it doing" parts
// of the view change; the shown temperature and setpoints stay real.

export type TestState = 'heating' | 'cooling' | 'idle' | 'fan' | 'off';
export const TEST_CYCLE: TestState[] = ['heating', 'cooling', 'idle', 'fan', 'off'];
export const TEST_CYCLE_MS = 6000;

export const TEST_LABEL: Record<TestState, string> = {
  heating: 'Heating',
  cooling: 'Cooling',
  idle: 'Idle',
  fan: 'Fan',
  off: 'Off',
};

/** The simulated state now, or null when test mode is off. */
export function testState(config: CardConfig, cycleIndex: number): TestState | null {
  const t = config.test_mode;
  if (!t) return null;
  return t === 'cycle' ? TEST_CYCLE[cycleIndex % TEST_CYCLE.length]! : t;
}

/** A copy of the view as it would look in that state. `currentTemp` here is
 *  only used for "follow the work" (a clear gap so the motion is lively). */
export function simulateView(view: ClimateView, state: TestState): ClimateView {
  if (!view.available) return view;
  const sp = view.setpoints;
  const gap = view.unit.includes('C') ? 2 : 4;
  const heat = sp?.heat ?? sp?.cool ?? view.currentTemp ?? 70;
  const cool = sp?.cool ?? sp?.heat ?? view.currentTemp ?? 74;
  switch (state) {
    case 'heating':
      return { ...view, equipment: 'heating', mode: view.mode === 'heat_cool' ? 'heat_cool' : 'heat', currentTemp: heat - gap, setpoints: sp ?? { heat, cool: null } };
    case 'cooling':
      return { ...view, equipment: 'cooling', mode: view.mode === 'heat_cool' ? 'heat_cool' : 'cool', currentTemp: cool + gap, setpoints: sp ?? { heat: null, cool } };
    case 'idle': {
      const mode = view.mode === 'heat' || view.mode === 'cool' || view.mode === 'heat_cool' ? view.mode : 'heat';
      return { ...view, equipment: 'idle', mode, currentTemp: mode === 'cool' ? cool : heat, setpoints: sp ?? { heat, cool: null } };
    }
    case 'fan':
      return { ...view, equipment: 'fan', mode: 'fan_only' };
    case 'off':
      return { ...view, equipment: 'off', mode: 'off', setpoints: null };
  }
}
