import { GuildMember } from "discord.js";
import { Playlist, Track } from "./Interfaces";

export class Utils {
	/**
	 * Make a new track
	 * @param {*} data - The track data from LavaLink.
	 * @param {GuildMember} user - The user to requested the track.
	 * @return {Track}
	 */
	public static newTrack(data: any, user: GuildMember): Track {
		const trackData: any = {};
		if (!data.info || !data.track)
			throw new Error(`newTrack() The "data" must be a LavaLink track.`);

		Object.assign(trackData, data.info);
		trackData.trackString = data.track;
		trackData.thumbnail = trackData.uri.includes("youtube")
			? {
					default: `https://img.youtube.com/vi/${data.info.identifier}/default.jpg`,
					medium: `https://img.youtube.com/vi/${data.info.identifier}/mqdefault.jpg`,
					high: `https://img.youtube.com/vi/${data.info.identifier}/hqdefault.jpg`,
					standard: `https://img.youtube.com/vi/${data.info.identifier}/sddefault.jpg`,
					max: `https://img.youtube.com/vi/${data.info.identifier}/maxresdefault.jpg`,
			  }
			: {};
		trackData.user = user;
		return trackData;
	}

	/**
	 * Make a new playlist
	 * @param {*} data - The playlist data from LavaLink.
	 * @param {GuildMember} user - The user to requested the playlist.
	 * @return {Playlist}
	 */
	public static newPlaylist(data: any, user: GuildMember): Playlist {
		const { name, trackCount, tracks: trackArray } = data;
		if (!(name || trackCount || trackArray || Array.isArray(trackArray)))
			throw new Error(`newPlaylist() The "data" must be LavaLink playlist.`);

		const playlistData: any = {
			name: name,
			trackCount: trackCount,
			duration: trackArray
				.map((t: any) => t.info.length)
				.reduce((acc: number, val: number) => acc + val, 0),
			tracks: [],
		};

		for (let i: number = 0; i < trackCount; i++)
			playlistData.tracks.push(this.newTrack(trackArray[i], user));

		return playlistData;
	}

	/**
	 * Format the track or playlist duration
	 * @param {Number} ms - The duration in milliseconds
	 * @return {String} time - The formatted timestamp
	 */
	public static formatTime(ms: number): string {
		const time = {
			d: 0,
			h: 0,
			m: 0,
			s: 0,
		};
		time.s = Math.floor(ms / 1000);
		time.m = Math.floor(time.s / 60);
		time.s = time.s % 60;
		time.h = Math.floor(time.m / 60);
		time.m = time.m % 60;
		time.d = Math.floor(time.h / 24);
		time.h = time.h % 24;

		const res = [];
		for (const [k, v] of Object.entries(time)) {
			let first = false;
			if (v < 1 && !first) continue;

			res.push(v < 10 ? `0${v}` : `${v}`);
			first = true;
		}
		return res.join(":");
	}
}