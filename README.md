# Easy Thermostat Styler Card

A modern thermostat card for Home Assistant that you can restyle and rearrange almost completely: a big current temperature, setpoint pills, a scroll wheel or a drag-handle setpoint bar, button sets you can place on any side, a compact mode, and status chips for linked devices such as ceiling fans.

https://github.com/Ltek/easy-thermostat-styler-card

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Ltek&repository=easy-thermostat-styler-card&category=plugin)

Current build: **v2026.10.24.1** · full history in [CHANGELOG.md](CHANGELOG.md)

---

## Features

- **Setpoint control:** pick one per card.
  - **Wheel:** scroll or drag through values. Place it left, centre or right, set its size, show 0–3 next values either side, and put the − / + buttons beside it, above and below, or hide them.
  - **Stepper:** plain − / + buttons around the value.
  - **Setpoint bar:** heat and cool handles on a track.
    - Heat / comfort / cool zones or a colour gradient.
    - Value flags above the handles, tick marks and labels, and a current-temperature marker.
    - Four handle shapes and its own range.
  - **None:** display only.
- **Heat / Cool done right:** heat and cool stay a minimum gap apart, and dragging one pushes the other along. A burst of taps sends one update, and the display doesn't jump back while the thermostat catches up.
- **Button sets:** modes, presets, fan modes and chips.
  - Each set goes on the top, bottom, left or right, as a row or a column, with a column count and alignment.
  - Within a set, reorder, hide, rename or re-icon any button.
- **Compact mode:** any set can sit behind a toggle button, or one switch puts them all there. Each browser remembers which ones are open.
- **Ceiling fan chips:** built in for the [ha-rf-fan](https://github.com/dasimon135/ha-rf-fan) integration.
  - Pick the fan and its light and sleep timer are found automatically.
  - The chip shows on/off, speed, direction, natural mode, light and time left.
  - Tap opens the [RF Fan card](https://github.com/Ltek/rf-fan-card) in a pop-up; hold toggles the fan or its light.
  - Plain entity chips work for anything else.
- **Styling:**
  - One button style for the whole card, which each set can override with the same options: tonal, filled, outlined or ghost, plus shape, content, sizes, and inactive and active colours.
  - Nine text elements, each with size, weight, colour, case, spacing, italic and opacity.
  - The card's background, border, corners, padding, and a glow while heating or cooling.
  - Every colour can follow your theme, be a custom colour, or any CSS.
- **Visual editor:** everything is set in the editor, and YAML is optional. Only the settings you change are saved.

## Install

**HACS:** use the button above, or add `https://github.com/Ltek/easy-thermostat-styler-card` as a custom **Dashboard** repository, install it, and reload your browser.

**Manual:** copy `dist/easy-thermostat-styler-card.js` to `/config/www/` and add it as a Dashboard resource (`/local/easy-thermostat-styler-card.js`, JavaScript module).

## Minimal configuration

```yaml
type: custom:easy-thermostat-styler-card
entity: climate.hallway
```

### Example: setpoint bar with fan chips

```yaml
type: custom:easy-thermostat-styler-card
entity: climate.hallway
setpoint:
  control: bar
  bar: { range_min: 60, range_max: 85 }
sets:
  - type: chips
    zone: top
    chips:
      - { type: rf_fan, entity: fan.bedroom }
  - type: hvac
  - { type: preset, display: toggle }
  - { type: fan_mode, display: toggle }
```

## Credits

Based on [ecosee](https://github.com/razzamatazm/ecosee) by razzamatazm (MIT). Its setpoint logic (minimum gap, debounced writes, optimistic hold) and wheel are the foundation of this card. Button-set ideas come from [simple-thermostat](https://github.com/nervetattoo/simple-thermostat).

MIT licensed.
