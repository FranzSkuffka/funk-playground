

const define = hash => customElements.define(`scalab-dropdown-${hash}`, Dropdown);

export default
    { supportsChildren : true // defer
    , attributes : {name: 'type'} // types are funk types (even image reference)
    , events : {name : 'type'}
    , define
    , description : "Test 8"
    , name : "dropdown"
    }
