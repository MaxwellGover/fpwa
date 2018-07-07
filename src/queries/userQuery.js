import { db } from "../initializers/firebase";

const basicUserQuery = (id) => {
  const query = db.collection("users").doc(id);
  const promise = new Promise((resolve, reject) => {
    query
      .get()
      .then(doc => resolve(doc.data()))
      .catch(err => reject('There was an error getting the user data'));
  });

  return promise;
};

const userUploadsQuery = id => {
  const uploadedSongs = [];
  const promise = new Promise((resolve, reject) => {
    const query = db
      .collection("users")
      .doc(id)
      .collection("uploadedSongs");

    query
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          uploadedSongs.push(doc.data());
        });
        resolve(uploadedSongs);
      })
      .catch(err => {
        reject("There was an error fetching the users uploads");
      });
  });

  return promise;
};

const userQuery = (id) => {
  const user = {};

  const promise = new Promise((resolve, reject) => {
    userUploadsQuery(id)
      .then((userUploads) => {
        basicUserQuery(id)
          .then((user) => {
            console.log(user);
            user = { ...user, userUploads: [ ...userUploads ] };
            resolve(user);
          })
          .catch(err => reject('There was an error getting the users data'))
      })
      .catch(err => reject('There was an error getting the users uploads'));
  })

  return promise;
}

export default userQuery;
