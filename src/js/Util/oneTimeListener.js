function oneTimeListener(evt, fn) {
    const newFunc = function() {
        fn();
        document.removeEventListener(evt, newFunc);
    }

    document.addEventListener(evt, newFunc);
}

export default oneTimeListener;