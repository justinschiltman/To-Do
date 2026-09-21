# To-Do

A personal to-do list — one page, no accounts, no server, no tracking. Installs
onto an Android phone as a real app.

## Install it on your phone

The app needs to be reachable over `https://` before Android will install it.
Once it is, on your OnePlus:

1. Open the URL in Chrome.
2. Tap **⋮ → Add to Home screen** (Chrome may offer **Install app** by itself).
3. Confirm.

Android builds a real app package from it. It lands in your app drawer with its
own icon, opens in its own window with no address bar, shows up in the recents
switcher, and works with no signal at all. The back gesture closes whatever
you have open rather than quitting.

### Publishing it

Anything that serves static files over https works. Two free routes:

This repo publishes to **GitHub Pages**. Pages has to be switched on once, by
hand, at *Settings → Pages → Source → **GitHub Actions*** — a workflow cannot
do it for you, because creating a Pages site needs admin rights that the
built-in Actions token does not have. After that `.github/workflows/pages.yml`
redeploys on every push to the default branch.

The site lands at **https://justinschiltman.github.io/To-Do/** — note the
capitals, the path is case-sensitive.

## On a computer

Open `index.html` straight from disk — it works with no server at all. For an
app-like window, use Chrome's **⋮ → Cast, save and share → Install page as app**,
or Safari's **File → Add to Dock**.

## What it does

- **Tasks and sub-tasks**, one level deep.
- **Progress bar.** A task with sub-tasks shows a bar and a count underneath it,
  green once everything below it is ticked. Ticking every sub-task does *not*
  auto-complete the parent — that stays your call.
- **Optional dates.** Shown as `Today`, `Tomorrow`, `Friday`, `3 Oct`, coloured
  red when overdue, green today, amber tomorrow.
- **Priority flags** P1–P4, shown as the colour of the checkbox ring.
- **Order tasks** manually, by date or by priority — your pick, under ⋮.
  Sub-tasks always stay in the order you put them. See *Ordering* below.
- **Dark mode**, following the system until you pick a side. The phone's status
  bar follows it too.
- **Hide completed**, and **undo** on anything destructive.

Tap a task to edit it; that panel is also where **Delete** lives. On a computer,
hover a row for its buttons.

## Ordering

**⋮ → Order tasks** offers three choices, and the app remembers which one you
picked:

| | |
|---|---|
| **Manually** | Nothing moves on its own. Every row gets a drag handle. |
| **By date** | Soonest first; undated tasks sit below dated ones. |
| **By priority** | P1 down to P4. |

The two automatic orders share the same two extra rules: finished tasks sink to
the bottom, and whichever key you did *not* pick settles ties — so under **By
date**, two things due today are split by priority, and under **By priority**,
two P1s are split by date. Equal items keep the order you entered them in, so
nothing shuffles on its own.

### Sub-tasks are different

Sub-tasks are usually steps in a sequence, so they ignore the setting above and
**stay in the order you put them** — you can always drag them, whatever the
tasks around them are doing, and ticking one does not move it. Sub-tasks can be
dragged from one task to another.

The one exception is a **date**: give a sub-task one and it rises to the top of
its group in date order, since a date is a firmer statement than a position.
Those rows lose their drag handle, because their place is already decided.
Remove the date to move it by hand again.

## Where your data lives

In the browser's `localStorage` on the device you use it on, saved on every
change. There is no sync — the phone and a laptop would keep separate lists.

The app makes no network requests of its own, so nothing ever leaves your
device. Use **⋮ → Export backup** now and then; **Import backup** restores it.

One catch worth knowing: storage is tied to the exact origin. A list built up
at `file://` on a laptop will not appear at your `https://` URL — export from
one and import into the other.

## Files

| | |
|---|---|
| `index.html` | the whole app — markup, styles and logic |
| `manifest.webmanifest` | name, icons and colours used when installing |
| `sw.js` | service worker; makes it work offline |
| `icons/` | launcher icons |
