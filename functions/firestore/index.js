const functions = require("firebase-functions");

exports.updateViews = functions.firestore
  .document("breed/{breedId}")
  .onWrite((change, context) => {
    console.log(`Do i come here?`);
    // If we set `/users/marie` to {name: "Marie"} then
    // context.params.userId == "marie"
    // ... and ...
    // change.after.data() == {name: "Marie"}
    return change.after.ref.set(
      { views: FieldValue.increment(1) },
      { merge: true }
    );
  });
