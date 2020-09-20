
class MapboxMap extends HTMLElement {
    connectedCallback() {
        console.log(this)
        mount(this)
    }
    disconnectedCallback() {
        console.log('disconnected', this)
    }
}
const refresh = (el) => debounce(() => {
    el.resizeObserver.unobserve(el)
    el.map.resize()
    // el.resizeObserver.observe(el)
}, 200)
const mount = async el => {
    el.style.height = "100%"
    el.style.width = "100%"
    console.log('mounting', el)
    await import('https://cdnjs.cloudflare.com/ajax/libs/mapbox-gl/1.12.0/mapbox-gl.js')
    console.log('loaded')
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbnpza3VmZmthIiwiYSI6ImNqcmkxbDZkZjIzeTQ0M21yaXlrcWNibjEifQ.XrU4Au1M00lygKwdtQhNVw';
    console.log(mapboxgl)
    console.log(el)
    const settings = {
        container: el
        , style: 'mapbox://styles/mapbox/streets-v9' // stylesheet location
        , center: [-0.1404545, 51.5220163] // starting position [lng, lat]
        , zoom: 16
    }
    el.map = new mapboxgl.Map(settings)
    el.resizeObserver = new ResizeObserver(refresh(el));
    el.resizeObserver.observe(el)
    el.map.on('load', () => refresh(el));
}


const name = "mapbox-map"

const define = hash => customElements.define(`${name}-${hash}`, MapboxMap);

export default
    { supportsChildren : true // defer
    , attributes : {name: 'type'} // types are funk types (even image reference)
    , events : {name : 'type'}
    , define
    , description : "Display a mapbox map"
    , name
    }

const debounce = (func, delay) => {
  let inDebounce
  return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}
