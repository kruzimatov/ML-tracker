import { PLAN_START, WEEKS } from "@/components/tabs/roadmapData";

const pad = (n) => String(n).padStart(2, "0");
const local = (d, h, m) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(h)}${pad(m)}00`;

export function downloadDailyReminder(time, url) {
  const [h, m] = time.split(":").map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = today > PLAN_START ? today : new Date(PLAN_START);
  const end = new Date(PLAN_START);
  end.setDate(end.getDate() + WEEKS.length * 7);
  const count = Math.max(1, Math.round((end - start) / 86400000));
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mission Control//EN",
    "BEGIN:VEVENT",
    `UID:mc-daily-${Date.now()}@mission-control`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${local(start, h, m)}`,
    "DURATION:PT15M",
    `RRULE:FREQ=DAILY;COUNT=${count}`,
    "SUMMARY:Mission Control: daily check-in",
    `DESCRIPTION:Do today's work, tick D-box, write one note. ${url}`,
    "BEGIN:VALARM",
    "TRIGGER:PT0M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Mission Control check-in",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "mission-control-daily.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}
