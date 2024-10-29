export const linksByRole = {
  citizen: [
    { name: "Dashboard", path: "/citizen/dashboard" },
    { name: "View Alerts", path: "/citizen/alerts" },
    { name: "Submit Report", path: "/citizen/report" },
    { name: "Notifications", path: "/citizen/notifications" },
  ],
  police: [
    { name: "Dashboard", path: "/police/dashboard" },
    { name: "Broadcast Alert", path: "/police/alerts" },
    { name: "View Reports", path: "/police/reports" },
    { name: "Notifications", path: "/police/notification" },
  ],
  admin: [
    { name: "Manage Users", path: "/admin/users" },
    { name: "View Queries", path: "/admin/queries" },
  ],
};

export const getLinksByRole = (role) => linksByRole[role] || [];
