export const linksByRole = {
  citizen: [
    { name: "View Alerts", path: "/citizen/view-alerts" },
    { name: "Submitted Reports", path: "/citizen/reports" },
    { name: "Notifications", path: "/citizen/notifications" },
    { name: "Queries", path: "/citizen/queries" },
    { name: "Profile", path: "/citizen/dashboard" },
  ],
  police: [
    { name: "Manage Alerts", path: "/police/manage-alerts" },
    { name: "View Reports", path: "/police/reports" },
    { name: "Broadcast Alert", path: "/police/alerts" },
    { name: "Notifications", path: "/police/notifications" },
    { name: "Queries", path: "/police/queries" },
    { name: "Profile", path: "/police/dashboard" },
  ],
  admin: [
    { name: "Manage Users", path: "/admin/users" },
    { name: "View Queries", path: "/admin/queries" },
  ],
};

export const getLinksByRole = (role) => linksByRole[role] || [];
