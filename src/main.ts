import produce from 'immer';

type User = {
  id: number;
  name: string;
};

const basicUser: User = {
  id: 0,
  name: ''
};
const main = async () => {
  const user2 = produce(basicUser, (draft) => {
    draft.id = 1;
    draft.name = 'tanaka';
  });
  console.log(user2);
};
main();
