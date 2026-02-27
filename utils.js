/* utils.js — Color helpers, formatters, and pure utility functions */

export const roleBg = (r) => ({ Master: "#1a1a2e", Admin: "#3b5bdb", Manager: "#7c3aed", "Asst. Manager": "#0891b2", Specialist: "#059669", Client: "#94a3b8" })[r] || "#94a3b8";
export const stColor = (s) => s === "Active" ? "#22c55e" : s === "Pending" ? "#f59e0b" : "#94a3b8";
export const leadColor = (l) => l === "Hot" ? "#ef4444" : l === "Warm" ? "#f59e0b" : "#64748b";
export const leadBg = (l) => l === "Hot" ? "#fef2f2" : l === "Warm" ? "#fffbeb" : "#f8fafc";
export const tBg = (t) => t === "Enterprise" ? "#f0f4ff" : t === "Pro" ? "#f0fdf4" : "#fffbeb";
export const tC = (t) => t === "Enterprise" ? "#3b5bdb" : t === "Pro" ? "#16a34a" : "#d97706";
export const ini = (n) => n.split(" ").map((x) => x[0]).join("");
export const fmtSec = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export const daysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
export const fmtD = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const parseD = (s) => { const p = s.split("-"); return p.length === 3 ? new Date(+p[0], +p[1] - 1, +p[2]) : null; };

/* ── CSV helpers ── */
export const parseCSV = (text) => {
  const lines = text.trim().split("\n").map((l) => l.split(",").map((c) => c.trim().replace(/^"|"$/g, "")));
  if (lines.length < 2) return [];
  const hdr = lines[0].map((h) => h.toLowerCase());
  const ni = hdr.findIndex((h) => h.includes("name"));
  const ci = hdr.findIndex((h) => h.includes("company") || h.includes("co"));
  const ei = hdr.findIndex((h) => h.includes("email") || h.includes("mail"));
  const pi = hdr.findIndex((h) => h.includes("phone") || h.includes("ph"));
  const si = hdr.findIndex((h) => h.includes("status") || h.includes("st"));
  const ti = hdr.findIndex((h) => h.includes("tier") || h.includes("ti"));
  const li = hdr.findIndex((h) => h.includes("lead"));
  return lines.slice(1).filter((r) => r[ni >= 0 ? ni : 0]?.trim()).map((r) => ({
    name: r[ni >= 0 ? ni : 0] || "Unknown", co: r[ci >= 0 ? ci : 1] || "",
    em: r[ei >= 0 ? ei : 2] || "", ph: r[pi >= 0 ? pi : 3] || "",
    st: r[si >= 0 ? si : 4] || "Active", ti: r[ti >= 0 ? ti : 5] || "Pro",
    lead: r[li >= 0 ? li : 6] || "Warm"
  }));
};

export const handleFileUpload = (file, cb) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => { const rows = parseCSV(e.target.result); cb(rows); };
  reader.readAsText(file);
};

export const exportCSV = (clients, team) => {
  const hdr = "Name,Company,Email,Phone,Status,Tier,Lead,Database,Last Contact,Assigned To\n";
  const rows = clients.map((c) => {
    const assigned = team.find((m) => m.id === c.assignedTo);
    return [c.name, c.co, c.em, c.ph, c.st, c.ti, c.lead, c.dest, c.lc, assigned ? assigned.name : "Unassigned"]
      .map((v) => '"' + String(v || "").replace(/"/g, '""') + '"').join(",");
  }).join("\n");
  const blob = new Blob([hdr + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  a.download = "tracforce_clients_" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click(); URL.revokeObjectURL(url);
};

export const exportAuditCSV = (logs) => {
  const hdr = "Timestamp,User,Action,Category\n";
  const rows = logs.map((l) => [l.t, l.u, l.a, l.cat].map((v) => '"' + String(v || "").replace(/"/g, '""') + '"').join(",")).join("\n");
  const blob = new Blob([hdr + rows], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url;
  a.download = "tracforce_audit_" + new Date().toISOString().slice(0, 10) + ".csv";
  a.click(); URL.revokeObjectURL(url);
};

export const doImport = (rows, dest, assignTo, setClients) => {
  const newClients = rows.map((r, i) => ({
    id: Date.now() + i, name: r.name, co: r.co, em: r.em, ph: r.ph,
    st: r.st, lc: new Date().toISOString().slice(0, 10), ti: r.ti,
    photo: null, lead: r.lead, dest: dest, assignedTo: assignTo || null
  }));
  setClients((p) => [...p, ...newClients]);
  return newClients.length;
};
