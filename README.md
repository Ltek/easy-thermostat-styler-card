# Easy Thermostat Styler Card

A modern thermostat card for Home Assistant that you can restyle and rearrange almost completely: a big current temperature, setpoint pills, a scroll wheel or a drag-handle setpoint bar, button sets you can place on any side, a compact mode, and status chips for linked devices such as ceiling fans.

https://github.com/Ltek/easy-thermostat-styler-card

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=Ltek&repository=easy-thermostat-styler-card&category=plugin)

Current build: **v2026.10.24.11** · full history in [CHANGELOG.md](CHANGELOG.md)

---

## Features

- **Setpoint control:** pick one per card.
  - **Wheel:** scroll or drag through values. Place it left, centre or right, set its size, show 0–3 next values either side, and put the − / + buttons beside it, above and below, or hide them.
  - **Stepper:** plain − / + buttons around the value.
  - **Setpoint bar:** heat and cool handles on a track, horizontal above or below the temperature or vertical beside it.
    - Heat / comfort / cool zones or a colour gradient.
    - Value flags above the handles, tick marks and labels, and a current-temperature marker.
    - Four handle shapes and its own range.
  - **None:** display only.
- **Heat / Cool done right:** heat and cool stay a minimum gap apart, and dragging one pushes the other along. A burst of taps sends one update, and the display doesn't jump back while the thermostat catches up.
- **Button sets:** modes, presets, fan modes and chips.
  - Each set goes on the top, bottom, left or right, as a row or a column, with a column count and alignment.
  - Within a set, reorder, hide, rename or re-icon any button.
- **Compact mode:** any set can sit behind a toggle button, or one switch puts them all there. Each browser remembers which ones are open.
- **Expandable menus:** a set can collapse to one button showing the current value (for example "Mode · Heat"). Tap it and the full list opens up, down, left or right, floating over the card. Tap outside or press Escape to close it.
- **Tap to reveal:** keep the card calm. The controls stay folded away (showing just the pill, or the control's own value) until you tap the temperature or a setpoint pill. They can open in place of the big number and fold away again after a number of seconds you choose.
- **Heating / cooling effects:** make the whole card, the setpoint value, the setpoint pill, the mode button or its icon glow, pulse, or both, in the heat colour while heating and the cool colour while cooling. You set when they run, the glow size, the pulse speed and the colours.
- **Moving backgrounds:** nine styles: Liquid Plasma, Lava Lamp, Aurora, Thermal Flow, Heat Shimmer / Frost, Embers / Snow, Breathing Core, Mesh Gradient and Glow Beam. Each follows what the system is doing: heat rises, cold sinks, Fan Only, or anything you pick under **Sync to Air Movement** (a fan, speed levels, on/off, low / medium / high, an airflow sensor), swirls at that speed, idle barely drifts. Each state has its own colours, and the motion speeds up the further the room is from the setpoint.
- **Background fill:** theme, transparent, any colour, a gradient or an image. Add a lighten / darken scrim, vignette and grain.
- **Frosted glass controls:** buttons, menus, chips, pills and the wheel's setpoint bubble turn see-through with a blur.
- **Quick Preset Templates:** nine starting points, each with its own setpoint control, button style and layout: Signature, Mission Control, Tap & Go, Slim Strip, Side Rail, Wall Tablet, Minimal Glass, Neon and Pocket.
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

<!-- gallery:start (generated from screenshots/index.json by the publish step; do not edit by hand) -->
## Quick Preset Templates

<table>
<tr><td align="center" width="33%"><img src="screenshots/template-signature.png" width="260" alt="Signature" /><br /><sub><b>Signature</b>: Big light number with the status under it, a pill-centred wheel on the right, tinted mode buttons.</sub></td><td align="center" width="33%"><img src="screenshots/template-mission.png" width="260" alt="Mission Control" /><br /><sub><b>Mission Control</b>: Setpoint bar with flags and ticks under the number. Round icon-only modes up top, preset and fan as menus below.</sub></td><td align="center" width="33%"><img src="screenshots/template-tap.png" width="260" alt="Tap & Go" /><br /><sub><b>Tap & Go</b>: Calm until you need it: tap the temperature or a pill and the wheel takes the number’s place, then folds away after 6 s.</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/template-slim.png" width="260" alt="Slim Strip" /><br /><sub><b>Slim Strip</b>: One short centred row: name and number with a small stepper beside them, every set as a menu.</sub></td><td align="center" width="33%"><img src="screenshots/template-rail.png" width="260" alt="Side Rail" /><br /><sub><b>Side Rail</b>: Modes stacked down the left as outlined circles, a vertical setpoint bar on the right, preset and fan menus below.</sub></td><td align="center" width="33%"><img src="screenshots/template-wall.png" width="260" alt="Wall Tablet" /><br /><sub><b>Wall Tablet</b>: Big and finger-friendly: huge number, large wheel under it with three next values, chunky filled mode tiles.</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/template-glass.png" width="260" alt="Minimal Glass" /><br /><sub><b>Minimal Glass</b>: No card background or border, no labels: just the number, a stepper and text-only mode buttons.</sub></td><td align="center" width="33%"><img src="screenshots/template-neon.png" width="260" alt="Neon" /><br /><sub><b>Neon</b>: A cyan-to-pink gradient bar above the number with diamond handles, square filled buttons and an accent border.</sub></td><td align="center" width="33%"><img src="screenshots/template-pocket.png" width="260" alt="Pocket" /><br /><sub><b>Pocket</b>: Phone-sized: small number, tiny stepper on the left, everything else behind round toggles along the top.</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/template-lava.png" width="260" alt="Lava Lamp" /><br /><sub><b>Lava Lamp</b>: Molten blobs rise while heating and sink while cooling, behind frosted menus and a big light number.</sub></td><td align="center" width="33%"><img src="screenshots/template-aurora.png" width="260" alt="Northern Lights" /><br /><sub><b>Northern Lights</b>: Aurora ribbons that drift with the system, a gradient bar under the number, and ghost buttons.</sub></td><td align="center" width="33%"><img src="screenshots/template-frost.png" width="260" alt="Frosted Glass" /><br /><sub><b>Frosted Glass</b>: A soft light beam behind frosted glass controls, with a vignette and fine grain.</sub></td></tr>
</table>

## Features

<table>
<tr><td align="center" width="33%"><img src="screenshots/feature-menu-open.png" width="260" alt="Expandable menu, open" /><br /><sub><b>Expandable menu, open</b></sub></td><td align="center" width="33%"><img src="screenshots/feature-reveal-closed.png" width="260" alt="Tap to reveal" /><br /><sub><b>Tap to reveal</b>: closed</sub></td><td align="center" width="33%"><img src="screenshots/feature-reveal-open.png" width="260" alt="Tap to reveal" /><br /><sub><b>Tap to reveal</b>: open in place of the temperature</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/feature-bar.png" width="260" alt="Setpoint bar with flags, ticks and current marker" /><br /><sub><b>Setpoint bar with flags, ticks and current marker</b></sub></td><td align="center" width="33%"><img src="screenshots/feature-vertical-bar.png" width="260" alt="Vertical setpoint bar" /><br /><sub><b>Vertical setpoint bar</b></sub></td><td align="center" width="33%"><img src="screenshots/feature-effects.png" width="260" alt="Effects while heating" /><br /><sub><b>Effects while heating</b>: card, setpoint value, pill, mode button and icon glow</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/feature-vertical-gradient.png" width="260" alt="Vertical gradient bar, flags on the right, no handle border" /><br /><sub><b>Vertical gradient bar, flags on the right, no handle border</b></sub></td><td align="center" width="33%"><img src="screenshots/feature-fan-chips.png" width="260" alt="RF fan chips" /><br /><sub><b>RF fan chips</b>: Breeze level, light, timer, speed 4/10</sub></td></tr>
</table>

## Moving backgrounds

<table>
<tr><td align="center" width="33%"><img src="screenshots/background-plasma.png" width="260" alt="Liquid Plasma" /><br /><sub><b>Liquid Plasma</b>: heating</sub></td><td align="center" width="33%"><img src="screenshots/background-lava.png" width="260" alt="Lava Lamp" /><br /><sub><b>Lava Lamp</b>: heating, blobs rising from the pool</sub></td><td align="center" width="33%"><img src="screenshots/background-aurora.png" width="260" alt="Aurora" /><br /><sub><b>Aurora</b>: cooling</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/background-flow.png" width="260" alt="Thermal Flow" /><br /><sub><b>Thermal Flow</b>: heating, streaming up</sub></td><td align="center" width="33%"><img src="screenshots/background-shimmer.png" width="260" alt="Heat Shimmer" /><br /><sub><b>Heat Shimmer</b>: heating</sub></td><td align="center" width="33%"><img src="screenshots/background-shimmer-frost.png" width="260" alt="Frost" /><br /><sub><b>Frost</b>: cooling, mist and sparkles</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/background-particles.png" width="260" alt="Embers" /><br /><sub><b>Embers</b>: heating</sub></td><td align="center" width="33%"><img src="screenshots/background-particles-snow.png" width="260" alt="Snow" /><br /><sub><b>Snow</b>: cooling</sub></td><td align="center" width="33%"><img src="screenshots/background-core.png" width="260" alt="Breathing Core" /><br /><sub><b>Breathing Core</b>: heating</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/background-mesh.png" width="260" alt="Mesh Gradient" /><br /><sub><b>Mesh Gradient</b>: cooling</sub></td><td align="center" width="33%"><img src="screenshots/background-beam.png" width="260" alt="Glow Beam" /><br /><sub><b>Glow Beam</b>: cooling, with vignette and grain</sub></td><td align="center" width="33%"><img src="screenshots/background-plasma-fan.png" width="260" alt="Fan Only" /><br /><sub><b>Fan Only</b>: swirling blades at the fan speed</sub></td></tr>
<tr><td align="center" width="33%"><img src="screenshots/background-aurora-idle.png" width="260" alt="Idle" /><br /><sub><b>Idle</b>: a very slow drift</sub></td></tr>
</table>
<!-- gallery:end -->

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
