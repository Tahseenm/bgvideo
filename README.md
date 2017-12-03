<!-- BANNER -->
<p align="center">
  <img
    width="100%"
    src="https://s17.postimg.org/ak1drabhb/ezgif.com-crop.gif"
    alt="BgVideo" >
</p>
<!-- ./BANNER -->

<p>&nbsp;</p><!-- Spacing -->



## BgVideo
> NOTE: In Beta. Coming Soon :hatching_chick:

- :white_check_mark: Zero dependencies
- :white_check_mark: Lightweight
- :white_check_mark: Customizable
- :white_check_mark: Mobile support
- :white_check_mark: Accessibility
- :white_check_mark: ES6+

<p>&nbsp;</p><!-- Spacing -->

```javascript
import BgVideo from 'bgvideo'

/**
 * Basic example
 */
BgVideo('#banner', 'https://example.com/assets/timelapse.mp4')


/**
 * Recommended minimum
 */
const src = {
  mp4:  'https://example.com/assets/timelapse.mp4',
  webm: 'https://example.com/assets/timelapse.webm',
}

const options = {
  backgroundColor: '#00012b',
  backgroundImage: 'https://example.com/assets/timelapse-poster.jpg',
}

BgVideo('#banner', src, options)
```

<p>&nbsp;</p><!-- Spacing -->


## Browser Support
| Chrome | Safari | IE / Edge | Firefox | Opera |
| ------ | ------ | --------- | ------- | ----- |
| Yes    | Yes    | 9+        | Yes     | Yes   |

<p>&nbsp;</p><!-- Spacing -->


## Contributors
[Tahseen Malik](https://tahseenmalik.com)


## License
MIT
