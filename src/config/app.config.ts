interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Health Centre Owner'],
  customerRoles: [],
  tenantRoles: ['Health Centre Owner', 'Health Centre Manager', 'Health Centre Staff', 'Health Centre Supplier'],
  tenantName: 'University',
  applicationName: 'Health Centre Managment Application',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
