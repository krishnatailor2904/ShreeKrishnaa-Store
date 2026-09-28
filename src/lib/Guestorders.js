const KEY = "sk_guest_orders";

export function getGuestOrders() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveGuestOrder(id, token) {
  if (!id || !token) return;
  try {
    const list = getGuestOrders().filter((o) => o.id !== id);
    list.push({ id, token });
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // localStorage unavailable - ignore
  }
}