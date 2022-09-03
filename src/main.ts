import { User } from './types/type';

const main = () => {
	const user: User = {
		id: 1,
		name: 'Takeda'
	};
	console.log({ user });
	console.log('main');
};

main();
