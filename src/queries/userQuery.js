import { db } from "../initializers/firebase";

const userQuery = (id) => {
  const query = db.collection("users").doc(id);
  const promise = new Promise((resolve, reject) => {
    query
      .get()
      .then(doc => resolve(doc.data()))
      .catch(err => reject('There was an error getting the user data'));
  });

  return promise;
};

export default userQuery;

