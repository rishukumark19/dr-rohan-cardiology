import { doctor } from "@/config/doctor";

export default function EmergencyBanner() {
  return (
    <aside
      role="alert"
      aria-label="Cardiac emergency notice"
      className="w-full bg-error-container/80 text-on-error-container"
    >
      <div className="max-w-7xl mx-auto px-margin py-space-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
        <div className="flex items-start gap-space-sm">
          <span
            className="material-symbols-outlined text-error text-[20px] shrink-0 mt-0.5 material-symbols-filled"
            aria-hidden="true"
          >
            emergency
          </span>
          <p className="text-body-sm">
            <strong className="font-display font-bold text-label-sm uppercase tracking-wider block">
              Chest Pain or Sudden Breathlessness?
            </strong>
            Do not wait for OPD. Call{" "}
            <a href={`tel:${doctor.emergency.number}`} className="font-bold underline">
              {doctor.emergency.number}
            </a>
            /
            <a href={`tel:${doctor.emergency.alternateNumber}`} className="font-bold underline">
              {doctor.emergency.alternateNumber}
            </a>{" "}
            or go to{" "}
            <a href={`tel:${doctor.emergency.hospitalPhone}`} className="font-bold underline">
              {doctor.emergency.hospital} 24/7 ER
            </a>{" "}
            immediately.
          </p>
        </div>
        <a
          href={`tel:${doctor.emergency.number}`}
          className="shrink-0 flex items-center gap-1 px-space-md py-1.5 rounded-full bg-error text-on-error text-label-sm font-display font-bold hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          Call {doctor.emergency.number}
        </a>
      </div>
    </aside>
  );
}
