
// Utility functions to track database installation status

const DB_INSTALLED_KEY = 'modernmobile_db_installed';

export const isDatabaseInstalled = (): boolean => {
  return localStorage.getItem(DB_INSTALLED_KEY) === 'true';
};

export const markDatabaseAsInstalled = (): void => {
  localStorage.setItem(DB_INSTALLED_KEY, 'true');
};

export const resetDatabaseStatus = (): void => {
  localStorage.removeItem(DB_INSTALLED_KEY);
};
