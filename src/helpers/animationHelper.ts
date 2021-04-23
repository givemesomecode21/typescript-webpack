

import { timer } from 'rxjs';

export class AnimationHelper {

  static scrollToHtmlElement(tagName: string) {
    timer(150).subscribe(
        () => {
            const elementFirst: HTMLElement = document.querySelector(tagName) as HTMLElement;
            if (elementFirst) {
                elementFirst.focus();
                elementFirst.scrollIntoView({ behavior: 'smooth' });
            }
        }
    );
}
}
