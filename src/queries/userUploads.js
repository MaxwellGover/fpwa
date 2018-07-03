import { db } from "../initializers/firebase";

const uploadedSongs = [];

const userUploadsQuery = (id) => {
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
        })
        resolve(uploadedSongs);
      })
      .catch((err) => {
        reject('There was an error fetching the users uploads');
      });
  });

  return promise;
}

export default userUploadsQuery;

