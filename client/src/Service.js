import axios from "axios";

const url = "api/schedule/";

class Service {
  // we can use Service.getExercises() without instantiating new PostService because we use the static keyword!

  // Get Exercises
  static getExercises() {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          const data = res.data;
          resolve(
            data.map((exercise) => ({
              ...exercise
            }))
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // Create Exercise
  static insertExercise(newExercise) {
    console.log("newExercise", newExercise);
    return axios.post(url, { ...newExercise });
    // the error goes to the neares catch, so we can catch it here or let it go back directly to the vue component
    // .then((response) => console.log("response from axios", response))
    // .catch((err) => console.log("error from axios", err));
  }

  // Delete Exercise
  static deleteExercise(id) {
    return axios.delete(`${url}${id}`);
  }

  // Update Exercise
  static updateExercise(id, update) {
    console.log("axios updateExercise");
    return axios.post(`${url}${id}`, { ...update });
    // .then((response) => console.log("response from axios", response))
    // .catch((err) => console.log("error from axios", err.message));
  }
}

export default Service;
