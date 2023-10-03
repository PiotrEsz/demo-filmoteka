import { ref, onValue } from 'firebase/database';
import { db } from '../service/db-manipulations';
export let watch = null;
export let queue = null;

export function getDataFromFirebase(ev) {
  const watched = ref(db, `${ev}` + '/watched');
  const queued = ref(db, `${ev}` + '/queue');
   onValue(watched, snapshot => {
     const dataDb = snapshot.val();
    dataDb ? (watch = Object.values(dataDb)) : (watch = false);
  });
  onValue(queued, snapshot => {
    const dataDb = snapshot.val();
    dataDb ? (queue =  Object.values(dataDb)) : (queue = false);
  });
}
