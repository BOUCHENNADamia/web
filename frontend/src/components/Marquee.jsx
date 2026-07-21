const TRACK_TEXT = 'Kuala Lumpur ● Singapore ● Bangkok ● Perhentian Islands ● Melaka ● Putrajaya ● Penang ● Cameron Highlands ● Hong Kong ● Shenzhen ● ';

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <span>{TRACK_TEXT}</span><span>{TRACK_TEXT}</span>
      </div>
    </div>
  );
}
