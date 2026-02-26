'use client';
import { useCallback, useMemo, useRef, useState, type RefObject } from 'react';

/**
 *
 * @param items
 * @param slotCount
 * @returns
 * activeItems, getNextItem, getNextSlot, replaceItemInSlot, reset
 *
 * This hook is designed to manage a set of items that are displayed in a fixed number of slots, allowing
 * for random replacement of items in those slots without immediate repetition. It is useful for features
 * like rotating logos, testimonials, or any scenario where you want to cycle through a list of items in
 * a visually dynamic way while ensuring variety and fairness in the display of items.
 */
export const useShuffle = <T>(
	items: T[],
	slotCount: number,
	options?: {
		initialShuffle?: boolean;
	},
): UseShuffleResult<T> => {
	// Initialize the state with a random selection of active items and slots, and set up refs to manage state and active items.
	const initialShuffle = options?.initialShuffle ?? true;
	const initialState = useMemo(
		() => buildInitialState(items, slotCount, initialShuffle),
		[items, slotCount, initialShuffle],
	);
	// stateRef holds the current state of items and slots, while activeItemsRef provides a reference to the currently active items for easy access and updates.
	const stateRef = useRef<ShuffleState<T>>(initialState);
	const activeItemsRef = useRef<T[]>(initialState.items.active);
	const [activeItemsState, setActiveItemsState] = useState<T[]>(
		initialState.items.active,
	);

	// The reset function allows for reinitializing the state to a new random configuration, which can be useful for scenarios where you want to restart the shuffle process or respond to changes in the items or slot count.
	const reset = useCallback(() => {
		const nextState = buildInitialState(items, slotCount, true);
		stateRef.current = nextState;
		activeItemsRef.current = nextState.items.active;
		setActiveItemsState(nextState.items.active);
	}, [items, slotCount]);

	// Returns the next item to be used in a slot, ensuring all items are used before repeats
	const getNextItem = useCallback(() => {
		const state = stateRef.current;
		if (state.items.queue.length === 0) {
			const refill = state.items.completed.length
				? shuffle(state.items.completed)
				: shuffle(items.filter((item) => !state.items.active.includes(item)));
			state.items.queue = refill;
			state.items.completed = [];
		}
		return state.items.queue.shift();
	}, [items]);

	// Returns the next slot index to be replaced, ensuring all slots are used before repeats
	const getNextSlot = useCallback(() => {
		const state = stateRef.current;
		if (state.slots.queue.length === 0) {
			const refill = state.slots.completed.length
				? shuffle(state.slots.completed)
				: shuffle(
						Array.from({ length: slotCount }, (_, i) => i).filter(
							(slot) => slot !== state.slots.active,
						),
					);
			state.slots.queue = refill;
			state.slots.completed = [];
		}
		return state.slots.queue.shift();
	}, [slotCount]);

	// Updates the state to reflect replacing the item in a given slot index
	const replaceItemInSlotRef = useCallback((slotIndex: number, item: T) => {
		const prevItem = activeItemsRef.current[slotIndex];
		const next = [...activeItemsRef.current];
		next[slotIndex] = item;
		activeItemsRef.current = next;
		stateRef.current.items.active = next;
		if (prevItem !== undefined) {
			stateRef.current.items.completed.push(prevItem);
		}
		if (stateRef.current.slots.active !== slotIndex) {
			stateRef.current.slots.completed.push(stateRef.current.slots.active);
		}
		stateRef.current.slots.active = slotIndex;
	}, []);

	// Similar to replaceItemInSlot but also updates the activeItemsState to trigger re-renders in React components that depend on the active items, ensuring that the UI reflects the changes immediately.
	const replaceItemInSlotState = useCallback(
		(slotIndex: number, item: T) => {
			replaceItemInSlotRef(slotIndex, item);
			setActiveItemsState([...activeItemsRef.current]);
		},
		[replaceItemInSlotRef],
	);

	return {
		activeItemsState,
		activeItemsRef,
		stateRef,
		getNextItem,
		getNextSlot,
		replaceItemInSlotRef,
		replaceItemInSlotState,
		reset,
	};
};

// Fisher-Yates shuffle algorithm takes a list of all the elements of the sequence, and continually determines the next element in the shuffled sequence by randomly drawing an element from the list until no elements remain.
const shuffle = <T>(array: T[]): T[] => {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

// Builds the initial state for the shuffle hook, ensuring that the active items and slots are randomly selected and that the queue is properly initialized.
const buildInitialState = <T>(
	items: T[],
	numSlots: number,
	shuffleInitial: boolean,
): ShuffleState<T> => {
	const slotCount = Math.max(1, numSlots);
	const orderedSlots = Array.from({ length: slotCount }, (_, i) => i);
	const shuffledItems = shuffleInitial ? shuffle(items) : [...items];
	const shuffledSlots = shuffleInitial ? shuffle(orderedSlots) : orderedSlots;

	return {
		items: {
			active: shuffledItems.slice(0, slotCount),
			queue: shuffledItems.slice(slotCount),
			completed: [],
		},
		slots: {
			active: shuffledSlots[0] ?? 0,
			queue: shuffledSlots.filter((slot) => slot !== shuffledSlots[0]),
			completed: [],
		},
	};
};

type ShuffleState<T> = {
	items: {
		active: T[];
		queue: T[];
		completed: T[];
	};
	slots: {
		active: number;
		queue: number[];
		completed: number[];
	};
};

type UseShuffleResult<T> = {
	activeItemsState: T[];
	activeItemsRef: RefObject<T[]>;
	stateRef: RefObject<ShuffleState<T>>;
	getNextItem: () => T | undefined;
	getNextSlot: () => number | undefined;
	replaceItemInSlotRef: (slotIndex: number, item: T) => void;
	replaceItemInSlotState: (slotIndex: number, item: T) => void;
	reset: () => void;
};
