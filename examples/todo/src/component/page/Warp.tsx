import { Warp } from "../../lib/warp/warp";
export const ContainerWarp = Warp(props => {
  return { style: props };
});
export const TextAreaWarp = Warp(({ opacity, scale }) => {
  return { style: { opacity, transform: `scale(1,${scale})` } };
});
