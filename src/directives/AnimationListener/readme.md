This directive indicates that the element has animations attached to it. The directive adds listeners for animation start and end, and emit events when they fire respectively.

### Animation Listener Selector
`.animated` - `<some-element class="animated"></some-element>`

### Animation Listener Settings

  * `(animation-start)` _- function_ -
    A function to fire when any animation starts
  * `(animation-end)` _- function_ -
    A function to fire when any animation ends

### Animation Listener Example
```javascript
fired($event:any){
    console.log('Event fired: ', $event);
}
```

```html
<div class="animated"
    (animation-start)="fired($event)"
    (animation-end)="fired($event)">
</div>
```