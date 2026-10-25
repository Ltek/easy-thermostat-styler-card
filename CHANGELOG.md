# Changelog

## v2026.10.25.15

- **Hide the setpoint pill while the controls are open** (Setpoint control → Show controls, with "Shown when tapped"). The pill shows while the controls are closed and hides while the wheel, stepper or bar is open, since the control already shows the setpoint. In Heat / Cool, a small heat/cool switch appears on the control so you can still pick which setpoint to change.
- In tap mode, a **plain tap on the wheel** (without dragging) now closes the controls.

## v2026.10.25.14

- **Button scale** (Button style → Size): scale every button in every set, or override it for one set under "Button style for this set". The size, padding, corners, icon, text and spacing all scale together.
- **Icon to text spacing** (Button style → Content): the gap between a button's icon and its label. It works for tiles, icon-left buttons, menu buttons and chips.
- **Fixed**: button contents weren't centred. The icon and text in expandable-menu buttons sat to the left, and chips were slightly off-centre. Every button type now centres its icon and text.
- **Test mode switches off when the editor closes.** It's no longer saved with the card; it lives only in the open editor. A test mode saved by v2026.10.24.13 is removed the next time the card is saved.

## v2026.10.24.13

- **Test mode** (top of the editor): Off, Heating, Cooling, Idle, Fan / air movement, System off, or Cycle through all (6 s each).
  - The card acts as if it were in that state: effects, moving background, status and colours. The temperature and setpoints shown stay real.
  - A small **TEST** badge shows which state is being simulated.
  - Like the AlertTicker card's, it only runs while you edit the dashboard. The live card ignores it, so saving with it on is harmless.
- **Editor**: opening a panel now closes the others (sub-panels keep their own state).
- Panels renamed: **Effects** → **Heating & Cooling Effects**, **Card** → **Card Shape**.

## v2026.10.24.12

- **Hide the setpoint once the room reaches it** (Setpoint control → Show controls → "Shown when tapped").
  - While the controls are closed, the setpoint (pill, bubble, value or bar) shows beside the current temperature until the room reaches it. Then only the current temperature shows.
  - Tapping the temperature opens the controls at any time, and the setpoint shows again while they're open.
  - It works with every control and status position. In Heat / Cool, anywhere inside the band counts as reached.
- **− / + buttons** now offer **Right**, **Left**, **Both above**, **Both below**, **+ above, − below**, **− left, + right** and **Hidden**, for both the wheel and the stepper. The old "Beside" is now Right; existing cards are unchanged.
- **Fixed**: Setpoint control → Size also scaled the big current temperature. It now scales only the controls; the current temperature has its own size under Text.

## v2026.10.24.11

- **Sync to Air Movement** (Background) replaces the fan picker and accepts **any entity**:
  - a fan (its %)
  - a number or input_number (its own range)
  - a sensor in %
  - whole-number speed levels
  - an airflow sensor, such as `sensor.hvac_airflow` (set **Full speed at**, e.g. 1200 CFM)
  - on/off entities
  - low / medium / high names
  - a select (its position in the list)

  While it shows air moving, the background swirls at that speed. Cards set up with the earlier fan picker keep working.
- **Frosted glass** moved to the **Button style** panel, since it styles controls, not the background. It now also covers the wheel's **setpoint bubble**, which becomes tinted glass in the heat or cool colour. Existing frosted cards keep working.
- **Effects**: the When and Look settings are always shown. Before, they were hidden while every part was Off, which the background templates set, so the panel looked empty.

## v2026.10.24.10

- **Background** panel.
  - **Fill:** theme card colour, transparent, theme / custom / CSS colour, a gradient (2–4 colours, linear or radial, any angle), or an image (fill, fit or tile, with blur and darken).
  - **Moving background**, nine styles: Liquid Plasma, Lava Lamp, Aurora, Thermal Flow, Heat Shimmer / Frost, Embers / Snow, Breathing Core, Mesh Gradient, Glow Beam.
    - **It follows the system:** heating rises, cooling sinks, idle drifts very slowly, off is near-still (or none).
    - **Fan:** Fan Only, or a chosen ceiling fan while it runs, swirls with soft rotating blades at the fan's speed.
    - **Colours by state:** two colours each for heating, cooling, idle (heat), idle (cool), fan and off. They default to your theme's heat, cool and fan colours and cross-fade when the state changes.
    - **Follow the work:** faster and stronger the further the room is from the setpoint.
    - **Strength**, **speed**, and **quality** (a lighter setting for older tablets).
    - It pauses when the card is off screen or the tab is hidden, and stops when the device asks for reduced motion.
  - **Finish:** lighten / darken scrim, vignette, grain.
  - **Frosted controls:** buttons, pills, chips, toggles and menus become see-through glass, with an adjustable blur.
- The card colour moved from the Card panel to Background. Existing cards look the same.
- New templates: **Lava Lamp**, **Northern Lights** and **Frosted Glass**. Templates keep your own background image.
- README: a "Moving backgrounds" gallery with 13 screenshots, frozen mid-motion.

## v2026.10.24.9

- **Fixed**: the gradient didn't show on a vertical setpoint bar.
- **Handle border**: on or off. When on, it has a colour (four-mode; unset follows the heat / cool colour).
- **Value flags**: flag colour and flag text colour, plus **flag placement**: above or below a horizontal bar, left or right of a vertical one.
- **Ticks & labels placement**: below or above a horizontal bar, right or left of a vertical one. This is independent of the flags. If both are on the same side, the flags sit outside the labels so nothing overlaps.
- New README screenshot: vertical gradient bar with the flags on the right.

## v2026.10.24.8

- **Effects** panel: choose Off, Glow, Pulse or Glow + pulse for each of:
  - the **entire card**
  - the **setpoint value** (wheel centre, stepper number or bar handle)
  - the **setpoint pill**
  - the **mode button**
  - the **mode icon**

  They use the heat colour while heating and the cool colour while cooling.
  - **Active**: only while the system is actually heating or cooling, or whenever the mode is Heat or Cool, including while idle.
  - **Glow size**, **pulse speed**, and **heating / cooling colours** (four-mode).
  - Animations stop when the device asks for reduced motion.
- The old "Glow while heating or cooling" switch (Card panel) moved into Effects as "Entire card". Existing cards look the same.
- Templates use effects now: Mission Control glows the setpoint and mode button, Tap & Go pulses the pill and mode icon, Wall Tablet pulses the card, and Neon glows and pulses everything.
- New README screenshot: effects while heating.

## v2026.10.24.7

- **Signature**: the status now sits under the current temperature, in place of the setpoint pills, which are hidden because the wheel's pill already shows the setpoint.
- With the setpoint pills hidden in Heat / Cool, the wheel or stepper gets a small heat/cool switch showing both values, so you can still choose which setpoint you're changing.

## v2026.10.24.6

- **Screenshots in the README**: every Quick Preset Template plus six feature shots (open menu, tap to reveal closed and open, setpoint bar, vertical bar, fan chips). They're rendered from the built card in a real browser on every publish (`npm run screenshots`), so the gallery always matches the current build.
- **New template "Signature"** replaces "Ecosee" so the name doesn't clash with another card. The thermostat name is hidden, the status (Idle / Heating / Cooling) sits beside the current temperature, and the wheel's centre value is a pill like the setpoint pills.
- **Slim Strip** is now centred.
- New option **Status** (Thermostat → Layout): above, beside or below the current temperature.
- New option **Centre value** for the wheel (Setpoint control): bubble or pill.

## v2026.10.24.5

- **Centering fixed**: with Align set to Center, the temperature and the wheel or stepper beside it are now centred together as one group. Before, the temperature block stretched and pushed the control to the edge.
- **Tap to reveal** (Setpoint control → Show controls → "Shown when tapped"):
  - **Open by tapping:** the setpoint pill, the current temperature, or either one.
  - **While closed show:** the control's own value (the wheel bubble, the stepper number, or a read-only bar, any of which you can also tap), or nothing at all.
  - **Opens:** in its own place, or *in place of the current temperature*. The big number turns into the controls.
  - **Close after:** 0–60 seconds without use, or stay open. Using the controls restarts the countdown, and tapping the same pill again closes it.
- **Quick Preset Templates** replace "Look". There are nine templates, each a different combination of setpoint control (wheel, stepper, bar, vertical bar, gradient bar, tap-to-reveal), button style (tonal, filled, outlined, ghost, icon-only, label-only) and layout (modes on top, down the side, as menus, behind toggles). They keep your device chips, button order, names and icons, and temperature range.
- **Button sets editor**:
  - "Default location" and "Compact" moved to the top of the panel, each with a short description.
  - "Default location" (formerly "Toggle buttons") is where sets without their own Side go, and where toggle buttons sit. A set's Side now offers "Default (…)".
  - Compact leaves expandable-menu sets alone. The description now says so, and the list shows each set as full time, toggle or menu.

## v2026.10.24.4

- **RF fan chips detect the fan's speeds** from the fan entity: 10 speeds, 6, 3 and so on. Speed 4 of 10 reads as 4 rather than a rounded guess, and 100% is speed 10.
- **Breeze / natural levels**: in a numbered Breeze level (ha-rf-fan's `natural 1`–`natural 3`), the chip shows a green leaf with the level instead of the fan speed. A single natural mode shows just the leaf.
- New per-chip option **Speed shows as**: number (`4`), fraction (`4/10`) or percent (`40%`).
- The chip editor shows what it detected, e.g. "Detected: 10 speeds · Breeze 3 levels · light light.bedroom_fan".

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
