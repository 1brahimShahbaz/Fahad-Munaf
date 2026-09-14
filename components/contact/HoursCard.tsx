import { SITE } from "@/lib/constants";

function formatTime(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return minute === 0
    ? `${hour12}:00 ${period}`
    : `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function HoursCard() {
  const { monThu, friSat } = SITE.openHours;

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-navy-900/5 shadow-card-rest lg:p-8">
      <h3 className="font-display text-[22px] font-semibold text-navy-900">
        Class & Office Hours
      </h3>
      <dl className="mt-4 grid grid-cols-1 gap-x-12 gap-y-2 text-[14px] sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-navy-900">Monday – Thursday</dt>
          <dd className="text-gray-500">
            {formatTime(monThu.startHour, monThu.startMinute)} –{" "}
            {formatTime(monThu.endHour, monThu.endMinute)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-navy-900">Friday – Saturday</dt>
          <dd className="text-gray-500">
            {formatTime(friSat.startHour, friSat.startMinute)} –{" "}
            {formatTime(friSat.endHour, friSat.endMinute)}
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-navy-900">Sunday</dt>
          <dd className="text-gray-500">Closed</dd>
        </div>
      </dl>
    </div>
  );
}
