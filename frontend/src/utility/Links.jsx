export const linksByRole = {
  citizen: [
    { name: "Home", path: "/" },
    { name: "View Alerts", path: "/citizen/alerts" },
    { name: "Submit Report", path: "/citizen/report" },
    { name: "Notifications", path: "/citizen/notifications" },
  ],
  police: [
    { name: "Dashboard", path: "/police/dashboard" },
    { name: "Broadcast Alert", path: "/police/alerts" },
    { name: "View Reports", path: "/police/reports" },
    { name: "Analyze Reports", path: "/police/analyze" },
  ],
  admin: [
    { name: "Manage Users", path: "/admin/users" },
    { name: "Notifications", path: "/admin/notifications" },
  ],
};

export const getLinksByRole = (role) => linksByRole[role] || [];
