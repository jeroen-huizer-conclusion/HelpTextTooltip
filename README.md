HelpTextTooltip
=============

## Description
Add a runtime configurable, lazily loaded title-text (i.e. a mouseover text) to various page elements.

## Features
* Runtime configurable help texts, stored in an entity of your choosing
* Optional 'help' icon
* Icon is not rendered if no help-text is found.
* Help-texts are loaded in background (i.e. page does not wait for all results)
* Three flavours:
  * Standalone helptext: define your own label
  * Helptext for Label: attach a helptext to a (default) mendix label.
  * Helptext for Tabs: attach a helptext to a tabheader a given index.
  * Helptext for Buttons: attach a helptext to a button element.

## Limitations
* does not support HTML (I think)
* Helptext for label:  Widget must be included right after the field.
* Helptext for Tabs: Widget must be in the same container as the tab-container.

## Dependencies

- [Mendix 6.x or higher](https://appstore.mendix.com/)

## Configuration

1. Add the .mpk in dist to your project.
2. Add the widget at the appropriate place.
3. Configure the widget.

## Attribution
* Icon by [GlyphLab](https://www.iconfinder.com/glyphlab), free for commercial use.
