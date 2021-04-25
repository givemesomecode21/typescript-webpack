import { BehaviorSubject, Subject } from 'rxjs';

const orderChanged$ = new Subject();
const connectionEstablished$ = new BehaviorSubject(false);

export const hubService = {
    orderChanged$,
    connectionEstablished$
}
