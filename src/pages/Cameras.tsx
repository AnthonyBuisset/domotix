import { useFetch } from "usehooks-ts";
import config from "../config.ts";

type Camera = {
  id: string;
  name: string;
}

type Response = {
  cameras: Camera[]
}

export default function Cameras() {
  const { data } = useFetch<Response>(`${config.MOTION_BASE_URL}/cameras.json`);

  return (
    <div className="m-4 rounded-xl overflow-hidden">
      {data?.cameras.map(camera => (
        <img key={camera.id} alt={camera.name} src={`${config.MOTION_BASE_URL}/${camera.id}/stream`} />))}
    </div>
  );
}
