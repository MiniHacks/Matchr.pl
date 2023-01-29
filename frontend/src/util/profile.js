function generateID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter++;
  }
  return result;
}

const Profile = (function() {
  const id = generateID(34);
  let election = undefined;

  const getID = () => id;
  const getElection = () => election;
  const setElection = choice => election = choice;

  return {
    getID: getID,
    getElection: getElection,
    setElection: setElection
  }

})();

export default Profile;
