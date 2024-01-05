import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IForm {
  id: number;
  singer: string;
  title: string;
}
interface IFormState {
  [key: string]: IForm;
}
const { persistAtom } = recoilPersist({
  key: "songs",
  storage: localStorage,
});

export const songs = atom({
  key: "songs",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
export const AddSongBoolean = atom({
  key: "AddSongBoolean",
  default: false,
});
export const EditSongBoolean = atom({
  key: "EditSongBoolean",
  default: false,
});
