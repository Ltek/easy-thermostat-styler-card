# Changelog

## v2026.10.24.3

- **Expandable menus**: a new "Expandable menu" display for mode, preset and fan sets.
  - The set collapses to one button showing the set name and current value.
  - Tapping it opens the full list up, down, left or right. By default it opens away from the edge the set sits on.
  - The list floats above the card, so it's never clipped, and it flips to stay on screen.
  - Tap outside or press Escape to close it; arrow keys move through the items.
  - Menu sets on the same side share one row.
- README: lists the vertical bar, Looks and menus.

## v2026.10.24.2

- **Vertical setpoint bar**: the bar can now sit to the left or right of the temperature as well as above or below it. It has an adjustable height, flags beside the handles, and ticks and labels down the side. Drag, tap and arrow keys work in both directions.
- **Looks**: a new Look panel with five built-in starting points: Modern (the default), Solid, Outline, Compact and Minimal. Applying one replaces the card's button, text and card styling and keeps your button sets and setpoint control. You're asked first if the card already has custom styling.
- Outlined buttons have a lighter border, ghost buttons get a soft background on hover, and buttons with the icon on the left are tighter.

## v2026.10.24.1

First build.

- Core display: name, heating/cooling status, humidity, a big current temperature and heat/cool setpoint pills. The card glows while heating or cooling.
- Setpoint controls:
  - **wheel:** placement, size, 0–3 next values, ± position
  - **stepper**
  - **setpoint bar:** zones or gradient, heat and cool handles, value flags, ticks and labels, current marker, handle shapes, custom range
  - **none**
- Heat / Cool keeps a minimum gap between the setpoints and pushes the other one along. Edits are debounced and held optimistically so the display doesn't jump back.
- Button sets (modes, presets, fan modes, chips) can go on any side of the card. Each has an orientation, column count and alignment, and its buttons can be reordered, hidden, renamed and re-iconed.
- Compact mode: any set (or all of them) can sit behind a toggle button. Open/closed is remembered per browser.
- Built-in ceiling fan chip for ha-rf-fan:
  - It finds the fan's light and sleep timer by itself.
  - It shows speed, direction, natural mode, light and time left.
  - Tap opens the RF Fan card in a pop-up; hold toggles the fan or its light.
- Entity chips for any entity.
- Styling:
  - a card-wide button style, overridable per set with the same options
  - nine text elements
  - card surface settings
  - four-mode colours everywhere
- Visual editor in the Ltek panel style. Only the settings you change are saved.
