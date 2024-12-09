export const timePattern = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

export const staffRoles = ['waiter-100', 'waiter-80', 'bartender', 'trainee'];

export const shifts = ['AM', 'PM'];

export function validateStaffRole(role) {
  return staffRoles.includes(role);
}

export function validateShift(shift) {
  return shifts.includes(shift);
}