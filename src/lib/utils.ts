// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (func: Function, wait: number, leading = false) => {
	let timeout: NodeJS.Timeout | undefined;

	return (...args: unknown[]) => {
		const callNow = leading && !timeout;

		clearTimeout(timeout);

		timeout = setTimeout(() => {
			timeout = undefined;
			if (!leading) func(...args);
		}, wait);

		if (callNow) {
			func(...args);
		}
	};
};
