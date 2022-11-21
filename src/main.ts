import produce from 'immer';
import { default as Redis } from 'ioredis';

const redis = new Redis();

type User = {
	id: number;
	name: string;
};

const basicUser: User = {
	id: 0,
	name: ''
};
const main = async () => {
	const user = produce(basicUser, (draft) => {
		draft.id = 1;
		draft.name = 'named';
	});
};
main();
