# Notifications Library

This is a simple, lightweight JavaScript library for generating and managing notifications on your webpage. It allows you to add notification cards with title, description, and type (Error, Warning, or Info). The library also provides an option to clear all notifications.

## Usage

### Add To Your Webpage
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/christianAral/notifications.js@v1.1.0/notifications.min.css">
```
```html
<script src="https://cdn.jsdelivr.net/gh/christianAral/notifications.js@v1.1.0/notifications.min.js"></script>
```

### Use the Notifications() class
```javascript
const notifications = new Notifications();
```

You can then use the `addCard` method to add a new notification:

```javascript
notifications.addCard(title, description, type, href);
```

- `title`: String - The title of the notification.
- `description`: String - The body text of the notification.
- `type`: String - The type of the notification. Can be "Error", or "Warning". Case insensitive.
- `href`: String - If specified, description will be a link instead of text.

## Styles

The CSS provided styles the notifications and their container. Notifications have different colors based on their type. There's also a "Clear All Notifications" button that appears when there are notifications and disappears when there are none.

### Class Definitions

- `.notifications`: The container for all notifications.
- `.notification`: A single notification card.
- `#notifClearAll`: The "Clear All Notifications" button.
- `.notifStatusINFO`, `.notifStatusERROR`, `.notifStatusWARNING`: Specify coloring of different notification types.


To modify the appearance of the notifications, you can adjust the CSS to fit your needs.
