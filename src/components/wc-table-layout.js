import scrollBarWidth from '@/util/scrollbar-width';

class WCTableLayout {
  constructor(options) {
    //TODO
    this.gutterWidth = scrollBarWidth();

    for (let name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }
  }

}

export default WCTableLayout;
