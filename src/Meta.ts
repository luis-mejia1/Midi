import { Header } from "./Header";
import { MidiTextEvent } from "midi-file";
const privateHeaderMap = new WeakMap<Meta, Header>();

/**
 * Represents a text event.
 */
export class Meta implements MetaInterface {
	/**
	 * The text value.
	 */
	text: string;

	/**
	 * The tick time of the event.
	 */
	ticks: number;

	/**
	 * @param event
	 * @param header
	 */
	constructor(
		event: Partial<MidiTextEvent & { absoluteTime: number }>,
		header: Header
	) {
		privateHeaderMap.set(this, header);

		this.ticks = event.absoluteTime;
		this.text = event.text;
	}

	/**
	 * The time of the event in seconds
	 */
	get time(): number {
		const header = privateHeaderMap.get(this);
		return header.ticksToSeconds(this.ticks);
	}

	set time(t: number) {
		const header = privateHeaderMap.get(this);
		this.ticks = header.secondsToTicks(t);
	}

	toJSON(): MetaJSON {
		return {
			ticks: this.ticks,
			time: this.time,
			text: this.text,
		};
	}
}

export interface MetaJSON {
	ticks: number;
	time: number;
	text: string;
}

export interface MetaInterface {
	ticks: number;
	time: number;
	text: string;
}
