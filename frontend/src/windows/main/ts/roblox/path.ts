// Get the most recent opened g.app path
import { os } from '@neutralinojs/lib';
import path from 'path-browserify';
import shellFS from '../tools/shellfs';

export let robloxPath: string = '/Applications/g.app';

async function getMostRecentRoblox() {
	const knownPaths = ['/Applications/g.app/', path.join(await os.getEnv('HOME'), 'Applications/g.app/')];
	let mostRecentPath = '';
	let date = 0;
	for (const path of knownPaths) {
		const info = await shellFS.getInfo(path);
		if (!info) continue;
		const lastOpened = info.modTime;
		if (Number.parseInt(lastOpened) === Math.max(date, Number.parseInt(lastOpened))) {
			date = Math.max(date, Number.parseInt(lastOpened));
			mostRecentPath = info.name;
		}
	}
	robloxPath = mostRecentPath;
	console.info(`[g.Path] Most recently opened g.app is at: "${robloxPath}"`);
}

getMostRecentRoblox();
