import { type IVs } from "./interface";

export function ivsEqual(a: IVs, b: IVs) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function getIVsString(ivs: IVs): string {
  return `${ivs[0]}/${ivs[1]}/${ivs[2]}/${ivs[3]}/${ivs[4]}/${ivs[5]}`;
}

export function getInheritanceString(ivs: IVs, inheritance: IVs){
    const strs = ivs.map((iv) => Number(iv).toString(10));
    for (let i=0; i<6; i++){
        if (inheritance[i] === 1){
            strs[i] = 'A'
        }else if (inheritance[i] === 2){
            strs[i] = 'B'
        }
    }
    return strs.join("/");
}

export function getGenderString(gender: number, genderThreshold: number){
    if (genderThreshold < -1){ return "N/A"; }
    return (gender <= genderThreshold) ? '\u2640' : '\u2641';
}