export const linksByRole = {
  citizen: [
    { name: "Dashboard", path: "/citizen/dashboard" },
    { name: "View Alerts", path: "/citizen/view-alerts" },
    { name: "Submitted Reports", path: "/citizen/reports" },
    { name: "Notifications", path: "/citizen/notifications" },
    { name: "Queries", path: "/citizen/queries" },
  ],
  police: [
    { name: "Dashboard", path: "/police/dashboard" },
    { name: "Broadcast Alert", path: "/police/alerts" },
    { name: "Manage Alerts", path: "/police/manage-alerts" },
    { name: "View Reports", path: "/police/reports" },
    { name: "Notifications", path: "/police/notifications" },
    { name: "Queries", path: "/police/queries" },
  ],
  admin: [
    { name: "Manage Users", path: "/admin/users" },
    { name: "View Queries", path: "/admin/queries" },
  ],
};

export const getLinksByRole = (role) => linksByRole[role] || [];
