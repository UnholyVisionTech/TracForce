/* constants.js — Role definitions, permissions, and configuration */

export const ROLE_ORDER = ["Master", "Admin", "Manager", "Asst. Manager", "Specialist", "Client"];
export const roleIdx = (r) => ROLE_ORDER.indexOf(r);
export const isAbove = (a, b) => roleIdx(a) < roleIdx(b);
export const canAssignKeys = (r) => roleIdx(r) <= 3;
export const canDeleteBelow = (a, t) => {
  if (a === "Master") return true;
  if (a === "Admin") return isAbove(a, t);
  return false;
};
export const canEditDeleteNote = (ar, nr) => {
  if (ar === "Master") return true;
  if (ar === "Admin" || ar === "Manager") return isAbove(ar, nr) || ar === nr;
  if (ar === "Asst. Manager") return isAbove(ar, nr);
  return false;
};

export const ROLE_INFO = {
  Master: { desc: "Full system access. Can override all permissions, manage billing, view audit logs, and delete any content.", perms: ["Full system access", "Delete any profile", "Manage billing", "View audit logs", "Override all permissions", "Approve changes to Master content"] },
  Admin: { desc: "High-level management access. Can delete profiles below their level, assign roles, and manage team operations.", perms: ["Delete profiles below own level", "Assign key access below own level", "Edit/delete notes below own level", "View all profiles & metrics", "Use dial-in", "View call recordings"] },
  Manager: { desc: "Team management access. Can assign roles and manage notes for team members below their level.", perms: ["Assign key access below own level", "Edit/delete notes below own level", "View all profiles & metrics", "Use dial-in", "View call recordings"] },
  "Asst. Manager": { desc: "Supervisory access with ability to assign roles to Specialists.", perms: ["Assign key access below own level", "Edit/delete notes below own level", "View all profiles & metrics", "Use dial-in", "View call recordings"] },
  Specialist: { desc: "Standard team member access. Can add notes, use dial-in, and view profiles.", perms: ["Add notes (edit own only)", "View all profiles & metrics", "Use dial-in", "View call recordings"] },
  Client: { desc: "External client — no platform access. Data is stored about them, not for them.", perms: ["No platform access"] }
};

export const DESTINATIONS = ["Main Database", "Outbound Leads", "Inbound Leads", "Partner Referrals", "Event Contacts"];

export const DB_LISTS = [
  { id: "db1", name: "Database 1", dests: ["Main Database"], color: "#3b5bdb", icon: "db" },
  { id: "db2", name: "Database 2", dests: ["Inbound Leads", "Partner Referrals"], color: "#7c3aed", icon: "signal" },
  { id: "db3", name: "Database 3", dests: ["Outbound Leads", "Event Contacts"], color: "#0891b2", icon: "users" },
];

export const RANGE_OPTS = [
  { k: "1d", l: "Last 1 Day" }, { k: "5d", l: "Last 5 Days" }, { k: "15d", l: "Last 15 Days" },
  { k: "1m", l: "Last 1 Month" }, { k: "3m", l: "Last 3 Months" }, { k: "6m", l: "Last 6 Months" },
  { k: "1y", l: "Last 1 Year" }, { k: "5y", l: "Last 5 Years" }, { k: "all", l: "All Time" },
  { k: "custom", l: "Choose Dates..." }
];
