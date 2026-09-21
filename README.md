# To-Do

A personal to-do list in a single HTML file, styled after Todoist.

## Using it

Open `index.html` in any browser — double-click it, or drag it onto a browser
window. There is nothing to install and no server to run. Bookmark the tab (or
on a Mac, drag the address bar icon to the Dock) and it opens like an app.

## What it does

- **Tasks and sub-tasks.** Every task can hold sub-points, one level deep.
- **Progress bar.** A task with sub-tasks shows a bar and a count underneath it
  in the list. The bar turns green when everything below it is ticked. Ticking
  every sub-task does *not* auto-complete the parent — that stays your call.
- **Optional dates.** Add a due date if you want one, leave it off if you
  don't. Dates read as `Today`, `Tomorrow`, `Friday`, `3 Oct`, and are colour
  coded: red when overdue, green today, amber tomorrow.
- **Priority flags** P1–P4, shown as the colour of the checkbox ring.
- **Drag to reorder** by the grip handle on the left of a row. Sub-tasks can be
  dragged between tasks. Works with a mouse and with touch.
- **Dark mode** — follows your system until you pick a side with the moon/sun
  button.
- **Hide completed** with the eye button.
- **Undo** — deleting anything offers an undo for a few seconds.

### Keyboard

| Key | |
|---|---|
| `Enter` | save, and stay open to type the next one |
| `Esc` | close the composer |

## Where your data lives

In this browser's `localStorage`, saved on every change. That means it is tied
to this one browser on this one machine, and clearing site data will wipe it.

Use **⋮ → Export backup** now and then; **Import backup** restores a file.
Nothing is ever sent anywhere — the app makes no network requests at all.
