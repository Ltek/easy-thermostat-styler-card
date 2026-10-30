# Changelog

## v2026.10.30.25

- **Button rows wrap much later.**
  - Expandable-menu buttons are tighter by default: icon-to-text gap 6px (was 12px) and 8px side padding (was 16px). They're no longer forced to at least 120px wide.
  - Top and bottom button rows reach closer to the card's sides (6px from the edge).
  - **Fixed**: a row of menu buttons ignored the Button Style **Spacing** setting and always used 8px. It now uses your setting.
  - Example: three menus (Home, Heat/Cool, Circulate) used to wrap on cards narrower than about 500px. They now stay on one line from about 360px.
- Every one of these can still be changed under Button Style (Icon to Text Spacing, Min Width, Spacing).

## v2026.10.29.24

- **Moving background speed** now goes up to **800%** (was 300%), for the styles that were still slow at full speed.
- **Angle** (Background → Moving Background, −180° to 180°): tilts the motion. 0° goes straight up while heating and down while cooling; 30° leans it to the right. The tilted layer always covers the whole card, whatever its shape.
- **Color variation** (0–100%): each shape's color strays from the state colors by its own amount. While heating, some shapes turn redder and some more amber, like a real flame. Thermal Flow and Liquid Plasma keep their shapes distinct so the variation shows. It needs a current browser (relative colors); older ones keep the plain state colors.
- New README screenshot: Thermal Flow at 30° with color variation.

## v2026.10.25.23

- **Fixed**: with Frosted Glass on, a button whose Border was set to None still showed a thin edge. That was Frosted Glass's own glass rim, not the border. Border: None now removes the rim too (inactive and active separately).
- **Editor**: an opened set, and an opened button inside it, get the theme accent border like every other open section, with only a small inset so the contents don't step in further.

## v2026.10.25.22

- **Transparent and None everywhere they belong.** Every background or fill color offers **Transparent**, and every border offers **None**:
  - Button Style and each set's Button Style: Background (inactive and active) → Transparent; Border (inactive and active) → None.
  - Card Shape: Border → None.
  - Setpoint bar: heat, comfort and cool zones, handle fill and flag color → Transparent; **Handle Border → None**. This replaces the separate "Handle border" checkbox; existing cards keep their setting.
  - Background: base color, gradient colors, and the main / second colors for each state → Transparent.
  - Text, icon and glow colors don't offer it, since transparent would just hide them.

## v2026.10.25.21

- **Editor (Button Sets)**: an opened set, and an opened button inside it, no longer draws its own bordered, indented box. Its sections and fields now sit exactly where every other panel's do: one box deep and the same distance from the panel edge as in Background or Text. Before, they were two or three boxes deep.

## v2026.10.25.20

- **US English** throughout the card, editor and docs: color, center, centered, centering.
- **Title Case** for every panel title, section title, subtitle, field label, checkbox and dropdown choice in the editor. Hints stay as sentences; names you type stay as written.
- **Button colors**: every button **Background** (inactive and active) now offers **Transparent**, and every **Border** offers **None**.
- **Device / sensor buttons: Hide When Off, 0 or None.** The button hides while its value is off, 0, none, idle, closed or unavailable, and comes back when there's something to show.
- **Centered temperature**: with Align set to Center, the number itself is now centered and the unit (°F) hangs to its right, instead of the number and unit being centered together, which left the number slightly to the left. Turn **Keep the Main Area Centered** on (Button Sets → Layout & Spacing) when there are buttons on one side, so the main area stays on the card's center.

## v2026.10.25.19

- **Editor**: each button set, and each button inside a set, is now a collapsible section like every other section in the editor. Its row (icon, name, details, then the move / duplicate / hide / delete buttons and the chevron) is the heading, and its settings open directly under it instead of in a separate indented box. Only one set opens at a time, and the row's buttons act without opening or closing it.

## v2026.10.25.18

- **Editor layout follows the design guide everywhere**, like the Text panel: each panel has a short hint and its main fields, then flat collapsible sections, with group subtitles only inside a section.
  - **Thermostat**: Show · Layout.
  - **Setpoint control**: the control's own section (Wheel / Stepper: placement & size, buttons, wheel; Bar: placement, colors, handles), Value flags, Ticks markers & range, Show controls, Heat / Cool.
  - **Button sets**: the add buttons and set list come first. Layout & spacing (default location, centering, distance for all sides or per side) and Compact move below the list as sections. An opened set has Name, then Buttons in this set · Placement · Display · Button style for this set.
  - **Button style**: Look & size · Shape · Content · Colors: inactive · Colors: active · Frosted glass.
  - **Background**: Base fill · Moving background (motion, Sync to Air Movement) · Colors by state · Finish.
  - **Heating & Cooling Effects**: Parts · When · Look.
- No settings changed; existing cards are unaffected.

## v2026.10.25.17

- **Buttons are their own items now**, and any set can hold any mix:
  - **Mode buttons**: any HVAC mode, preset or fan mode. A mode button hides itself if the thermostat stops offering that mode.
  - **Device / sensor buttons**: show the value; RF fans keep everything they had.
  - **Action buttons** (new): run a script, a scene, or any service (with an optional target and data).
- **Built-in sets** (Mode, Preset, Fan) still fill themselves from the thermostat, and you can **add your own buttons** after the built-in ones. Built-in buttons can be hidden, reordered, renamed and re-iconed but not deleted, and the only set of a built-in type can be hidden but not deleted.
- **+ Buttons** adds a custom set ("Buttons 1", "Buttons 2", …) that holds only what you put in it. It replaces "+ Devices".
- **Duplicate** a set or a button. **Copy to set** puts a copy of a button (built-in ones too) into another set.
- **Copy this style to** (a set's Button style): give one set, or all other sets, the same style.
- **Expandable menus** can hold mixed buttons. The menu button shows the active mode, or the first device's value. The **set name is no longer shown** on menu buttons by default; switch it back on per set.
- Older device-only sets keep working. The first time you edit one, it becomes a Buttons set with the same chip look, so nothing changes on the card.

## v2026.10.25.16

- **Look: Button / Chip** for every set (Button style, and per set). Mode, preset and fan buttons, and expandable-menu buttons, can be chips. Device sets can be full buttons in any variant, with each item's icon and "name · value" as the label. Turn off **Show name** on an item for value only.
- **Share a row with** (every set): Own row, or any other set by name. The set then sits in that set's row and on its side of the card. Removing the link also tidies away the internal id.
- **Keep the main area centered** (on by default): with buttons on only one side, the temperature and controls no longer shift off-center. On a card too narrow to balance both sides, it falls back to the old layout instead of squeezing the middle.
- **Distance from the main area**: a card-wide slider, plus **Distance per side** for top, bottom, left and right.

## v2026.10.25.15

- **Hide the setpoint pill while the controls are open** (Setpoint control → Show controls, with "Shown when tapped"). The pill shows while the controls are closed and hides while the wheel, stepper or bar is open, since the control already shows the setpoint. In Heat / Cool, a small heat/cool switch appears on the control so you can still pick which setpoint to change.
- In tap mode, a **plain tap on the wheel** (without dragging) now closes the controls.

## v2026.10.25.14

- **Button scale** (Button style → Size): scale every button in every set, or override it for one set under "Button style for this set". The size, padding, corners, icon, text and spacing all scale together.
- **Icon to text spacing** (Button style → Content): the gap between a button's icon and its label. It works for tiles, icon-left buttons, menu buttons and chips.
- **Fixed**: button contents weren't centered. The icon and text in expandable-menu buttons sat to the left, and chips were slightly off-center. Every button type now centers its icon and text.
- **Test mode switches off when the editor closes.** It's no longer saved with the card; it lives only in the open editor. A test mode saved by v2026.10.24.13 is removed the next time the card is saved.

## v2026.10.24.13

- **Test mode** (top of the editor): Off, Heating, Cooling, Idle, Fan / air movement, System off, or Cycle through all (6 s each).
  - The card acts as if it were in that state: effects, moving background, status and colors. The temperature and setpoints shown stay real.
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
- **Frosted glass** moved to the **Button style** panel, since it styles controls, not the background. It now also covers the wheel's **setpoint bubble**, which becomes tinted glass in the heat or cool color. Existing frosted cards keep working.
- **Effects**: the When and Look settings are always shown. Before, they were hidden while every part was Off, which the background templates set, so the panel looked empty.

## v2026.10.24.10

- **Background** panel.
  - **Fill:** theme card color, transparent, theme / custom / CSS color, a gradient (2–4 colors, linear or radial, any angle), or an image (fill, fit or tile, with blur and darken).
  - **Moving background**, nine styles: Liquid Plasma, Lava Lamp, Aurora, Thermal Flow, Heat Shimmer / Frost, Embers / Snow, Breathing Core, Mesh Gradient, Glow Beam.
    - **It follows the system:** heating rises, cooling sinks, idle drifts very slowly, off is near-still (or none).
    - **Fan:** Fan Only, or a chosen ceiling fan while it runs, swirls with soft rotating blades at the fan's speed.
    - **Colors by state:** two colors each for heating, cooling, idle (heat), idle (cool), fan and off. They default to your theme's heat, cool and fan colors and cross-fade when the state changes.
    - **Follow the work:** faster and stronger the further the room is from the setpoint.
    - **Strength**, **speed**, and **quality** (a lighter setting for older tablets).
    - It pauses when the card is off screen or the tab is hidden, and stops when the device asks for reduced motion.
  - **Finish:** lighten / darken scrim, vignette, grain.
  - **Frosted controls:** buttons, pills, chips, toggles and menus become see-through glass, with an adjustable blur.
- The card color moved from the Card panel to Background. Existing cards look the same.
- New templates: **Lava Lamp**, **Northern Lights** and **Frosted Glass**. Templates keep your own background image.
- README: a "Moving backgrounds" gallery with 13 screenshots, frozen mid-motion.

## v2026.10.24.9

- **Fixed**: the gradient didn't show on a vertical setpoint bar.
- **Handle border**: on or off. When on, it has a color (four-mode; unset follows the heat / cool color).
- **Value flags**: flag color and flag text color, plus **flag placement**: above or below a horizontal bar, left or right of a vertical one.
- **Ticks & labels placement**: below or above a horizontal bar, right or left of a vertical one. This is independent of the flags. If both are on the same side, the flags sit outside the labels so nothing overlaps.
- New README screenshot: vertical gradient bar with the flags on the right.

## v2026.10.24.8

- **Effects** panel: choose Off, Glow, Pulse or Glow + pulse for each of:
  - the **entire card**
  - the **setpoint value** (wheel center, stepper number or bar handle)
  - the **setpoint pill**
  - the **mode button**
  - the **mode icon**

  They use the heat color while heating and the cool color while cooling.
  - **Active**: only while the system is actually heating or cooling, or whenever the mode is Heat or Cool, including while idle.
  - **Glow size**, **pulse speed**, and **heating / cooling colors** (four-mode).
  - Animations stop when the device asks for reduced motion.
- The old "Glow while heating or cooling" switch (Card panel) moved into Effects as "Entire card". Existing cards look the same.
- Templates use effects now: Mission Control glows the setpoint and mode button, Tap & Go pulses the pill and mode icon, Wall Tablet pulses the card, and Neon glows and pulses everything.
- New README screenshot: effects while heating.

## v2026.10.24.7

- **Signature**: the status now sits under the current temperature, in place of the setpoint pills, which are hidden because the wheel's pill already shows the setpoint.
- With the setpoint pills hidden in Heat / Cool, the wheel or stepper gets a small heat/cool switch showing both values, so you can still choose which setpoint you're changing.

## v2026.10.24.6

- **Screenshots in the README**: every Quick Preset Template plus six feature shots (open menu, tap to reveal closed and open, setpoint bar, vertical bar, fan chips). They're rendered from the built card in a real browser on every publish (`npm run screenshots`), so the gallery always matches the current build.
- **New template "Signature"** replaces "Ecosee" so the name doesn't clash with another card. The thermostat name is hidden, the status (Idle / Heating / Cooling) sits beside the current temperature, and the wheel's center value is a pill like the setpoint pills.
- **Slim Strip** is now centered.
- New option **Status** (Thermostat → Layout): above, beside or below the current temperature.
- New option **Center value** for the wheel (Setpoint control): bubble or pill.

## v2026.10.24.5

- **Centering fixed**: with Align set to Center, the temperature and the wheel or stepper beside it are now centered together as one group. Before, the temperature block stretched and pushed the control to the edge.
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
  - four-mode colors everywhere
- Visual editor in the Ltek panel style. Only the settings you change are saved.
