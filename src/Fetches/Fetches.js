import firebase from 'firebase';
import { generate } from 'shortid';
import { addBill } from './Queries';

var firebaseConfig = {
  apiKey: 'AIzaSyAMXvz4AD4bx1NvJchOugf1uYvPhf8xBiA',
  authDomain: 'test-1528871171306.firebaseapp.com',
  databaseURL: 'https://test-1528871171306.firebaseio.com',
  projectId: 'test-1528871171306',
  storageBucket: 'test-1528871171306.appspot.com',
  messagingSenderId: '791882157170',
  appId: '1:791882157170:web:093a1485e8da828a'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();
const docRef = firestore.collection('Products');

const fetch = async () => {
  return await docRef
    .get()
    .then(async querySnapshot => {
      return await querySnapshot;
    })
    .catch(err => {
      console.error('Error Occured', err);
      return err;
    });
};

const addnew = async (state, push) => {
  let data = {
    Avail: state.Avail,
    DetailAvail_ltd: { [new Date().toDateString().slice(4)]: state.Avail },
    Name: state.Name,
    Price: state.Price,
    Wnt_ltd: state.wanted,
    pcs_per_Box: state.perBox,
    MRP: state.MRP
  };
  await docRef.doc(generate()).set(data);
  await push('/');
};
const remove = async (state, date) => {
  let b = await docRef
    .doc(state.id)
    .get()
    .then(async querySnapshot => {
      return await querySnapshot.data();
    });
  let q = await Object.assign({}, b, {
    ...b,
    Avail: b.Avail - b.DetailAvail_ltd[date]
  });
  Object.keys(q.DetailAvail_ltd)
    .filter(i => i === state.date)
    .map(i => delete q.DetailAvail_ltd[i]);
  await docRef.doc(state.id).update('Avail', q.Avail);
  await docRef.doc(state.id).update('DetailAvail_ltd', q.DetailAvail_ltd);
  return await Object.assign({}, state, {
    ...state,
    num: 0,
    Price: await q.Price,
    DetailAvail_ltd: await q.DetailAvail_ltd,
    Avail: await q.Avail
  });
};

const fetchDetailAvail = async id => {
  return await docRef
    .doc(id)
    .get()
    .then(async querySnapshot => {
      return await querySnapshot.data();
    });
};

const add = async state => {
  if (state.num !== '') {
    let data = { [state.date]: +state.num };
    let b = await docRef
      .doc(state.id)
      .get()
      .then(async querySnapshot => {
        return await querySnapshot.data();
      });
    let bDetailAvail_ltd = b.DetailAvail_ltd;
    if (Object.keys(bDetailAvail_ltd).length === 5) {
      let ele = Object.keys(bDetailAvail_ltd)[4];
      delete bDetailAvail_ltd[ele];
    }
    bDetailAvail_ltd = Object.assign({}, bDetailAvail_ltd, {
      ...bDetailAvail_ltd,
      ...data
    });
    await docRef.doc(state.id).update('DetailAvail_ltd', bDetailAvail_ltd);
    await docRef.doc(state.id).update('Avail', b.Avail + +state.num);
  }
  await docRef.doc(state.id).update('Wnt_ltd', +state.wanted);
  await docRef.doc(state.id).update('perBox', +state.perBox);
  await docRef.doc(state.id).update('MRP', +state.MRP);
  let new1 = await docRef
    .doc(state.id)
    .get()
    .then(async querySnapshot => {
      return await querySnapshot.data();
    });
  return await Object.assign({}, state, {
    Price: new1.Price,
    num: 0,
    Avail: new1.Avail,
    DetailAvail_ltd: new1.DetailAvail_ltd,
    MRP: new1.MRP
  });
};

const update = async (state, push) => {
  let data = [];
  for (let i = 0; i < state.items.length; i++) {
    data.push({
      name: state.items[i],
      sold: state.selected_items[state.items[i]].req
    });
  }
  await state.items.map(async i => {
    return await docRef
      .doc(state.selected_items[i].id)
      .update(
        'Avail',
        state.selected_items[i].totavail - state.selected_items[i].req
      );
  });
  let status = await addBill(data);
  if (status.status === 201) {
    window.print();
    push('/');
  } else {
    alert('try again later');
  }
};

export { fetch, update, add, fetchDetailAvail, addnew, remove };
